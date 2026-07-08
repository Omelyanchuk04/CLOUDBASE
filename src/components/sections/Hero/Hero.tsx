"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO } from "@/lib/constants";
import styles from "./Hero.module.scss";

gsap.registerPlugin(ScrollTrigger);

function DataFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let files: FileParticle[] = [];

    const iconPaths = [
      "/icons/backup-icon.png",
      "/icons/finance-report-icon.png",
      "/icons/secure-doc-img.png",
      "/icons/xls-icon.png",
      "/icons/xml-icon.png",
    ];
    const loadedImages: HTMLImageElement[] = [];

    iconPaths.forEach((path) => {
      const img = new window.Image();
      img.src = path;
      loadedImages.push(img);
    });

    const numFiles = 60;
    const speed = 6;

    class FileParticle {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      imgIndex: number = 0;

      constructor(w: number, h: number) {
        this.reset(w, h);
        this.z = Math.random() * w;
      }

      reset(w: number, h: number) {
        this.x = (Math.random() - 0.5) * w * 1.5;
        this.y = (Math.random() - 0.5) * h * 1.5;
        this.z = w;
        this.imgIndex = Math.floor(Math.random() * loadedImages.length);
      }

      update(speed: number, w: number, h: number) {
        this.z -= speed;
        if (this.z < 1) {
          this.reset(w, h);
        }
      }

      draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const cx = w / 2;
        const cy = h / 2;
        const fov = w * 0.8;

        const px = (this.x / this.z) * fov + cx;
        const py = (this.y / this.z) * fov + cy;

        let opacity = 1;
        if (this.z > w * 0.7) {
          opacity = 1 - (this.z - w * 0.7) / (w * 0.3);
        }
        opacity = Math.max(0.05, opacity);

        const scale = (fov / this.z) * 0.8;

        const tailZ = this.z + 100;
        const tailPx = (this.x / tailZ) * fov + cx;
        const tailPy = (this.y / tailZ) * fov + cy;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(tailPx, tailPy);
        const gradient = ctx.createLinearGradient(px, py, tailPx, tailPy);
        gradient.addColorStop(0, `rgba(165, 180, 252, ${opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(165, 180, 252, 0)");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = scale * 1.5;
        ctx.stroke();

        const img = loadedImages[this.imgIndex];

        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.translate(px, py);
          ctx.globalAlpha = opacity;
          const size = 20 * scale;
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
          ctx.restore();
        }
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initFiles();
    };

    const initFiles = () => {
      files = [];
      for (let i = 0; i < numFiles; i++) {
        files.push(new FileParticle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      files.forEach((file) => {
        file.update(speed, canvas.width, canvas.height);
        file.draw(ctx, canvas.width, canvas.height);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={styles.hero__warp} aria-hidden="true" />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const laptopLeftRef = useRef<HTMLDivElement>(null);
  const laptopRightRef = useRef<HTMLDivElement>(null);
  const textInitialRef = useRef<HTMLDivElement>(null);
  const textSecondRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        textInitialRef.current,
        { opacity: 0, y: -30, duration: 1, ease: "power2.inOut" },
        0,
      )
        .to(
          textSecondRef.current,
          { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" },
          0,
        )
        .to(
          laptopLeftRef.current,
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.2,
        )
        .to(
          laptopRightRef.current,
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0.2,
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.hero__glow} aria-hidden="true">
        <div className={styles.hero__glowGreen} />
        <div className={styles.hero__glowBlue} />
        <div className={styles.hero__glowPurple} />
      </div>

      <DataFlowBackground />

      <div className={styles.hero__inner}>
        {/* === КОНТЕЙНЕР ТЕКСТУ === */}
        <div className={styles.hero__textContent}>
          <div className={styles.hero__textInitial} ref={textInitialRef}>
            {/* Бейдж видалено */}
            <h1 className={styles.hero__heading}>{HERO.heading}</h1>
            <p className={styles.hero__sub}>{HERO.subheading}</p>

            <div className={styles.hero__ctas}>
              <button className={styles.btnYellowGlass}>
                {HERO.ctas.primary.label}
              </button>
            </div>

            <div className={styles.hero__logos}>
              <Image src="/main/1s-logo.svg" alt="1C" width={24} height={24} />
              <Image
                src="/main/BAS-logo.png"
                alt="BAS"
                width={45}
                height={20}
              />
              <Image
                src="/main/KBS-logo.png"
                alt="KBS"
                width={45}
                height={20}
              />
              <Image
                src="/main/MEDOC-logo.png"
                alt="MEDOC"
                width={50}
                height={25}
              />
            </div>
          </div>

          <div className={styles.hero__textSecond} ref={textSecondRef}>
            <h2 className={styles.hero__headingAlt}>
              Один сервер — доступ для всіх
            </h2>
            <p className={styles.hero__subAlt}>
              Працюйте з будь-якого пристрою, з дому чи офісу, без затримок. Ми
              об'єднуємо ваші пристрої у єдину захищену мережу.
            </p>
          </div>
        </div>

        {/* === КОНТЕЙНЕР ПРИСТРОЇВ === */}
        <div className={styles.hero__visual}>
          <div
            className={`${styles.device} ${styles.device__laptopLeft}`}
            ref={laptopLeftRef}
          >
            <Image
              src="/main/MacBook%20Air%20img.png"
              alt="MacBook Air"
              width={800}
              height={500}
              priority
            />
          </div>

          <div className={`${styles.device} ${styles.device__imac}`}>
            <Image
              src="/main/iMac%20img.png"
              alt="iMac"
              width={1000}
              height={750}
              priority
            />
          </div>

          <div
            className={`${styles.device} ${styles.device__laptopRight}`}
            ref={laptopRightRef}
          >
            <Image
              src="/main/MacBook%20Pro%20img.png"
              alt="MacBook Pro"
              width={800}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
