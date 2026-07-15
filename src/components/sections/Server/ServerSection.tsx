"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServerSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export function ServerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef({ val: 0 });

  // === GSAP Залипання ===
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(scrollProgress.current, {
        val: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: "+=3500",
          scrub: 2,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // === Three.js Логіка ===
  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5);
    camera.lookAt(0, 0, 0);

    // ОПТИМІЗАЦІЯ 1: Базові налаштування рендера для максимальної продуктивності
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Вимикаємо згладжування на мобільних
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);

    // ОПТИМІЗАЦІЯ 2: Жорстко фіксуємо Pixel Ratio = 1. Це рятує 4K/Retina монітори від лагів.
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = false;

    currentMount.appendChild(renderer.domElement);
    const preventContextMenu = (event: Event) => event.stopPropagation();
    renderer.domElement.addEventListener(
      "contextmenu",
      preventContextMenu,
      true,
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa5b4fc, 0.8);
    fillLight.position.set(-5, 3, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    let airGeometry: THREE.BufferGeometry;
    let airFlow: THREE.LineSegments;
    const velocities: any[] = [];
    const lineCount = isMobile ? 80 : 150; // Ще трохи зменшили кількість частинок

    const blueColor = new THREE.Color("#00d2ff");
    const redColor = new THREE.Color("#ff0000");
    const bR = blueColor.r,
      bG = blueColor.g,
      bB = blueColor.b;
    const rR = redColor.r,
      rG = redColor.g,
      rB = redColor.b;

    let serverGroup: THREE.Group | null = null;
    const fans: THREE.Group[] = [];
    const loader = new GLTFLoader();

    loader.load(
      "/Models/Server3D_new.glb",
      (gltf) => {
        const model = gltf.scene;
        const fansFound: THREE.Mesh[] = [];

        // Оптимізація матеріалів: робимо їх простішими для рендеру
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const materials = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];

            materials.forEach((material) => {
              material.side = THREE.FrontSide;
              if (material instanceof THREE.MeshStandardMaterial) {
                material.metalness = 0.5;
                material.roughness = 0.5; // Трохи збільшили roughness для легшого прорахунку світла
              }
            });

            if (mesh.name.includes("Fan")) {
              fansFound.push(mesh);
            }
          }
        });

        model.updateMatrixWorld(true);

        fansFound.forEach((child) => {
          const box = new THREE.Box3().setFromObject(child);
          const worldCenter = new THREE.Vector3();
          box.getCenter(worldCenter);

          const localCenter = child.parent!.worldToLocal(worldCenter.clone());
          child.geometry.center();

          const pivot = new THREE.Group();
          pivot.name = child.name;
          pivot.position.copy(localCenter);

          child.parent!.add(pivot);
          pivot.add(child);
          child.position.set(0, 0, 0);

          fans.push(pivot);
        });

        const mainBox = new THREE.Box3().setFromObject(model);
        const size = mainBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredSize = 5.5;
        const scale = desiredSize / maxDim;

        model.scale.set(scale, scale, scale);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const center = scaledBox.getCenter(new THREE.Vector3());

        model.position.set(-center.x, -center.y, -center.z);

        model.updateMatrixWorld(true);
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && !child.name.includes("Fan")) {
            child.matrixAutoUpdate = false;
          }
        });

        const frontFanPositions: THREE.Vector3[] = [];
        fans.forEach((pivot) => {
          if (!pivot.name.includes("6")) {
            const wp = new THREE.Vector3();
            pivot.getWorldPosition(wp);
            frontFanPositions.push(wp);
          }
        });

        airGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(lineCount * 6);
        const colors = new Float32Array(lineCount * 6);

        for (let i = 0; i < lineCount; i++) {
          const targetFan = frontFanPositions[i % frontFanPositions.length];
          const x = targetFan.x + (Math.random() - 0.5) * 0.4;
          const z = targetFan.z + (Math.random() - 0.5) * 0.4;
          const spawnY = -2.5 - Math.random() * 1.5;
          const length = 0.5 + Math.random() * 0.6;

          positions[i * 6] = x;
          positions[i * 6 + 1] = spawnY + length;
          positions[i * 6 + 2] = z;
          positions[i * 6 + 3] = x;
          positions[i * 6 + 4] = spawnY;
          positions[i * 6 + 5] = z;

          velocities.push({
            speed: 0.04 + Math.random() * 0.05,
            length: length,
            originX: targetFan.x,
            originZ: targetFan.z,
            originY: -2.5,
          });
        }

        airGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3),
        );
        airGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const airMaterial = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        airFlow = new THREE.LineSegments(airGeometry, airMaterial);

        serverGroup = new THREE.Group();
        serverGroup.add(model);
        serverGroup.add(airFlow);

        serverGroup.rotation.x = -Math.PI / 2 + 0.3;
        const scaleMult = window.innerWidth < 768 ? 0.6 : 1;
        serverGroup.scale.set(scaleMult, scaleMult, scaleMult);

        scene.add(serverGroup);
        serverGroup.updateMatrixWorld(true);

        // ОПТИМІЗАЦІЯ 3: ПРОГРІВ ШЕЙДЕРІВ
        // Ми примусово компілюємо та рендеримо сцену один раз прямо зараз (у фоні),
        // щоб GPU не робив це в момент, коли користувач доскролить сюди.
        if (renderer.compile) {
          renderer.compile(scene, camera);
        }
        renderer.render(scene, camera);
      },
      undefined,
      (error) => console.error("Помилка завантаження моделі:", error),
    );

    // ОПТИМІЗАЦІЯ 4: Debounce для Resize (уникаємо лагів при зміні орієнтації екрана)
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);

        if (serverGroup) {
          const scaleMult = width < 768 ? 0.6 : 1;
          serverGroup.scale.set(scaleMult, scaleMult, scaleMult);
        }
      }, 150); // Чекаємо 150мс після закінчення ресайзу
    };
    window.addEventListener("resize", handleResize);

    let isVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }, // Реагуємо одразу, як тільки секція торкається екрана
    );
    observer.observe(currentMount);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Якщо секцію не видно - процесор відпочиває
      if (!isVisible) return;

      const progress = scrollProgress.current.val;
      camera.position.z = 5 - progress * 1.5;

      if (serverGroup) {
        serverGroup.rotation.x = -Math.PI / 2 + 0.3 + progress * 0.2;
      }

      fans.forEach((fan) => {
        if (fan.name.includes("6")) {
          fan.rotation.z += 0.3;
        } else {
          fan.rotation.y -= 0.3;
        }
      });

      if (
        airGeometry &&
        airGeometry.attributes.position &&
        airGeometry.attributes.color
      ) {
        const posArray = airGeometry.attributes.position.array as Float32Array;
        const colArray = airGeometry.attributes.color.array as Float32Array;

        for (let i = 0; i < lineCount; i++) {
          const headX = i * 6;
          const headY = i * 6 + 1;
          const headZ = i * 6 + 2;
          const tailX = i * 6 + 3;
          const tailY = i * 6 + 4;
          const tailZ = i * 6 + 5;

          posArray[headY] += velocities[i].speed;
          posArray[tailY] += velocities[i].speed;
          const currentY = posArray[headY];

          let heatRatio = (currentY + 2.0) / 4.0;
          heatRatio = Math.max(0, Math.min(1, heatRatio));

          const r = bR + (rR - bR) * heatRatio;
          const g = bG + (rG - bG) * heatRatio;
          const b = bB + (rB - bB) * heatRatio;

          colArray[headX] = r;
          colArray[headY] = g;
          colArray[headZ] = b;
          colArray[tailX] = r;
          colArray[tailY] = g;
          colArray[tailZ] = b;

          if (currentY > -2.0 && currentY < 1.0) {
            const turbulenceX = (Math.random() - 0.5) * 0.015;
            const turbulenceZ = (Math.random() - 0.5) * 0.015;
            posArray[headX] += turbulenceX;
            posArray[tailX] += turbulenceX;
            posArray[headZ] += turbulenceZ;
            posArray[tailZ] += turbulenceZ;
          }

          if (posArray[tailY] > 2.5) {
            const newX = velocities[i].originX + (Math.random() - 0.5) * 0.4;
            const newZ = velocities[i].originZ + (Math.random() - 0.5) * 0.4;
            const newY = velocities[i].originY - Math.random() * 1.5;

            posArray[headX] = newX;
            posArray[tailX] = newX;
            posArray[headZ] = newZ;
            posArray[tailZ] = newZ;
            posArray[headY] = newY + velocities[i].length;
            posArray[tailY] = newY;
          }
        }
        airGeometry.attributes.position.needsUpdate = true;
        airGeometry.attributes.color.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      renderer.domElement.removeEventListener(
        "contextmenu",
        preventContextMenu,
        true,
      );
      cancelAnimationFrame(animationFrameId);

      if (currentMount && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
      if (airGeometry) airGeometry.dispose();
    };
  }, []);

  return (
    <section className={styles.serverSectionWrapper} ref={sectionRef}>
      <div className={styles.server__glow} aria-hidden="true">
        <div className={styles.server__glowGreen} />
        <div className={styles.server__glowBlue} />
        <div className={styles.server__glowPurple} />
      </div>
      <div ref={mountRef} className={styles.canvasContainer} />
      <div className={styles.overlayContent} />
    </section>
  );
}
