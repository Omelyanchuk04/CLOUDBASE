"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styles from "./ServerSection.module.scss";

export function ServerSection() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Використовуємо window.innerWidth для 100% ширини екрана
    const width = window.innerWidth;
    const height = window.innerHeight;

    // ------------------- 1. СЦЕНА -------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#252525");

    // ------------------- 2. КАМЕРА (Зближена) -------------------
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    // Підсунули камеру ближче
    camera.position.set(0, 1.2, 5);
    // Обов'язково вказуємо куди дивитися, бо контролери видалені
    camera.lookAt(0, 0, 0);

    // ------------------- 3. СВІТЛО -------------------
    const ambientLight = new THREE.AmbientLight("white", 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight("white", 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight("white", 0.7);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    // ------------------- 4. РЕНДЕР -------------------
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Вимикаємо контекстне меню на канвасі
    const preventContextMenu = (event: Event) => event.stopPropagation();
    renderer.domElement.addEventListener(
      "contextmenu",
      preventContextMenu,
      true,
    );

    // ------------------- ГЛОБАЛЬНІ ЗМІННІ ДЛЯ ПОВІТРЯ -------------------
    let airGeometry: THREE.BufferGeometry;
    let airFlow: THREE.LineSegments;
    const velocities: any[] = [];
    const lineCount = 200;
    const blueColor = new THREE.Color("#00d2ff");
    const redColor = new THREE.Color("#ff0000");
    const tempColor = new THREE.Color();

    // ------------------- 5. ЗАВАНТАЖЕННЯ МОДЕЛІ -------------------
    const fans: THREE.Group[] = [];
    const loader = new GLTFLoader();

    loader.load(
      "/Models/Server3D_new.glb",
      (gltf) => {
        const model = gltf.scene;
        const fansFound: THREE.Mesh[] = [];

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material.side = THREE.FrontSide;

            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.metalness = 0.2;
              mesh.material.roughness = 0.6;
            }

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

        // Масштабування
        const mainBox = new THREE.Box3().setFromObject(model);
        const size = mainBox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredSize = 5.5;
        const scale = desiredSize / maxDim;

        model.scale.set(scale, scale, scale);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const center = scaledBox.getCenter(new THREE.Vector3());

        // Центруємо саму модель (поки що без обертання)
        model.position.set(-center.x, -center.y, -center.z);
        model.updateMatrixWorld(true);

        // ------------------- 6. СТВОРЕННЯ ПОТОКІВ ПОВІТРЯ -------------------
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
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        airFlow = new THREE.LineSegments(airGeometry, airMaterial);

        // === ГРУПУВАННЯ ТА ПОВОРОТ ===
        // Створюємо спільну групу для моделі та повітря
        const serverGroup = new THREE.Group();

        // Додаємо обидва елементи в групу
        serverGroup.add(model);
        serverGroup.add(airFlow);

        // Повертаємо всю групу (разом з частинками)
        serverGroup.rotation.x = -Math.PI / 2 + 0.3;

        // Додаємо згрупований об'єкт на сцену
        scene.add(serverGroup);
        serverGroup.updateMatrixWorld(true);
      },
      undefined,
      (error) => console.error("Помилка завантаження моделі:", error),
    );

    // ------------------- 7. АДАПТИВНІСТЬ -------------------
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // ------------------- 8. ЦИКЛ АНІМАЦІЇ -------------------
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

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

          tempColor.lerpColors(blueColor, redColor, heatRatio);

          colArray[headX] = tempColor.r;
          colArray[headY] = tempColor.g;
          colArray[headZ] = tempColor.b;
          colArray[tailX] = tempColor.r;
          colArray[tailY] = tempColor.g;
          colArray[tailZ] = tempColor.b;

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

    // ------------------- 9. ОЧИЩЕННЯ (CLEANUP) -------------------
    return () => {
      window.removeEventListener("resize", handleResize);
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
    <section className={styles.serverSectionWrapper}>
      {/* Контейнер на всю ширину та висоту */}
      <div
        ref={mountRef}
        className={styles.canvasContainer}
        style={{
          width: "100vw",
          maxWidth: "100%",
          height: "100vh",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
        }}
      />

      <div
        className={styles.overlayContent}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Твій текст для секції */}
      </div>
    </section>
  );
}
