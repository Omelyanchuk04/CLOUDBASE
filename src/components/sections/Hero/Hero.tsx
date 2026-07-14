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
    let imagesLoadedCount = 0;
    const isMobileRef = { current: false };

    const iconPaths = [
      "/icons/backup-icon.png",
      "/icons/finance-report-icon.png",
      "/icons/secure-doc-img.png",
      "/icons/xls-icon.png",
      "/icons/xml-icon.png",
    ];
    const loadedImages: HTMLImageElement[] = [];

    const drawStatic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      files.forEach((file) => {
        file.draw(ctx, canvas.width, canvas.height);
      });
    };

    iconPaths.forEach((path) => {
      const img = new window.Image();
      img.src = path;
      img.onload = () => {
        imagesLoadedCount++;
        if (isMobileRef.current && imagesLoadedCount === iconPaths.length) {
          drawStatic();
        }
      };
      loadedImages.push(img);
    });

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

    const initFiles = () => {
      files = [];
      const numFiles = isMobileRef.current ? 15 : 60;
      for (let i = 0; i < numFiles; i++) {
        files.push(new FileParticle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (isMobileRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      files.forEach((file) => {
        file.update(speed, canvas.width, canvas.height);
        file.draw(ctx, canvas.width, canvas.height);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const wasMobile = isMobileRef.current;
      isMobileRef.current = window.innerWidth < 768;

      initFiles();

      if (isMobileRef.current) {
        cancelAnimationFrame(animationFrameId);
        if (imagesLoadedCount === iconPaths.length) drawStatic();
      } else if (wasMobile && !isMobileRef.current) {
        animate();
      }
    };

    window.addEventListener("resize", resize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    isMobileRef.current = window.innerWidth < 768;
    initFiles();

    if (!isMobileRef.current) {
      animate();
    } else if (imagesLoadedCount === iconPaths.length) {
      drawStatic();
    }

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const imacRef = useRef<HTMLDivElement>(null);
  const laptopLeftRef = useRef<HTMLDivElement>(null);
  const laptopRightRef = useRef<HTMLDivElement>(null);
  const textInitialRef = useRef<HTMLDivElement>(null);
  const textSecondRef = useRef<HTMLDivElement>(null);
  const textThirdRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => {
        const conditions = context.conditions as {
          isMobile: boolean;
          isDesktop: boolean;
        };
        const { isMobile } = conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: containerRef.current,
            start: "top top",
            end: "+=3500",
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.to(
          textInitialRef.current,
          { opacity: 0, y: -40, duration: 1, force3D: true },
          0,
        )
          .to(
            textSecondRef.current,
            { opacity: 1, y: 0, duration: 1, force3D: true },
            1,
          )
          .to(
            textSecondRef.current,
            { opacity: 0, y: -40, duration: 1, force3D: true },
            2,
          )
          .to(
            textThirdRef.current,
            { opacity: 1, y: 0, duration: 1, force3D: true },
            3,
          )
          .fromTo(
            imacRef.current,
            { scale: 1.15, xPercent: -50 },
            {
              scale: 1,
              xPercent: -50,
              duration: 2,
              ease: "power2.out",
              force3D: true,
            },
            0.5,
          )
          .fromTo(
            laptopLeftRef.current,
            // Стартують з-за меж екрана
            { xPercent: isMobile ? -80 : -50, opacity: 0, scale: 0.8 },
            {
              xPercent: 0, // Повертаємо кінцеву точку в 0 для всіх
              opacity: 1,
              scale: 1,
              duration: 2,
              ease: "power2.out",
              force3D: true,
            },
            0.5,
          )
          .fromTo(
            laptopRightRef.current,
            { xPercent: isMobile ? 80 : 50, opacity: 0, scale: 0.8 },
            {
              xPercent: 0, // Повертаємо кінцеву точку в 0 для всіх
              opacity: 1,
              scale: 1,
              duration: 2,
              ease: "power2.out",
              force3D: true,
            },
            0.5,
          );
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div className={styles.hero__wrapper} ref={wrapperRef}>
      <section className={styles.hero} ref={containerRef}>
        <div className={styles.hero__glow} aria-hidden="true">
          <div className={styles.hero__glowGreen} />
          <div className={styles.hero__glowBlue} />
          <div className={styles.hero__glowPurple} />
          <div className={styles.hero__lightBeamContainer}>
            <div className={styles.hero__lightBeam} />
          </div>
        </div>

        <DataFlowBackground />

        <div className={styles.hero__inner}>
          {/* === КОНТЕЙНЕР ТЕКСТУ === */}
          <div className={styles.hero__textContent}>
            <div className={styles.hero__textInitial} ref={textInitialRef}>
              <h1 className={styles.hero__heading}>{HERO.step1.heading}</h1>
              <p className={styles.hero__sub}>{HERO.step1.subheading}</p>

              <div className={styles.hero__ctas}>
                <button className={styles.btnYellowGlass}>
                  {HERO.step1.cta}
                </button>
              </div>
            </div>

            <div className={styles.hero__textSecond} ref={textSecondRef}>
              <h2 className={styles.hero__headingAlt}>
                <p>{HERO.step2.headingLine1}</p>
                <p>{HERO.step2.headingLine2}</p>
              </h2>
              <p className={styles.hero__subAlt}>{HERO.step2.subheading}</p>
            </div>

            <div className={styles.hero__textThird} ref={textThirdRef}>
              <h2 className={styles.hero__headingAlt}>{HERO.step3.heading}</h2>
              <p className={styles.hero__subAlt}>{HERO.step3.subheading}</p>
              <div className={styles.hero__logos}>
                <Image
                  src="/main/1s-logo.svg"
                  alt="1C"
                  width={30}
                  height={30}
                />
                <Image
                  src="/main/BAS-logo.png"
                  alt="BAS"
                  width={55}
                  height={25}
                />
                <Image
                  src="/main/KBS-logo.png"
                  alt="KBS"
                  width={55}
                  height={25}
                />
                <Image
                  src="/main/MEDOC-logo.png"
                  alt="MEDOC"
                  width={60}
                  height={30}
                />
              </div>
            </div>
          </div>

          {/* === КОНТЕЙНЕР ПРИСТРОЇВ === */}
          <div className={styles.hero__visual}>
            <div
              className={`${styles.device} ${styles.device__laptopLeft}`}
              ref={laptopLeftRef}
            >
              <Image
                src="/main/MacBook%20Pro%20img.png"
                alt="Left"
                width={800}
                height={500}
                priority
              />
            </div>

            <div
              className={`${styles.device} ${styles.device__imac}`}
              ref={imacRef}
            >
              <Image
                src="/main/PC-REMOTE-img1.png"
                alt="Center"
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
                alt="Right"
                width={800}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
