"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HERO } from "@/lib/constants";
import styles from "./Hero.module.scss";

function WarpSpeedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const numStars = 150;
    const speed = 15;

    class Star {
      x: number = 0;
      y: number = 0;
      z: number = 0;

      constructor(w: number, h: number) {
        this.reset(w, h);
        this.z = Math.random() * w;
      }

      reset(w: number, h: number) {
        this.x = (Math.random() - 0.5) * w * 2;
        this.y = (Math.random() - 0.5) * h * 2;
        this.z = w;
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
        const fov = w;

        const sx = (this.x / this.z) * fov + cx;
        const sy = (this.y / this.z) * fov + cy;

        const tailLength = 120;
        const tailZ = this.z + tailLength;
        const px = (this.x / tailZ) * fov + cx;
        const py = (this.y / tailZ) * fov + cy;

        const distanceFactor = Math.max(0.1, 1 - this.z / w);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);

        const gradient = ctx.createLinearGradient(px, py, sx, sy);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(1, `rgba(255, 255, 255, ${distanceFactor})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = distanceFactor * 5 + 1.5;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update(speed, canvas.width, canvas.height);
        star.draw(ctx, canvas.width, canvas.height);
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
  return (
    <section className={styles.hero}>
      {/* Яскравий кольоровий фон */}
      <div className={styles.hero__glow} aria-hidden="true">
        <div className={styles.hero__glowGreen} />
        <div className={styles.hero__glowBlue} />
        <div className={styles.hero__glowPurple} />
      </div>

      <WarpSpeedBackground />

      <div className={`container ${styles.hero__inner}`}>
        {/* Контент (Ліва частина) */}
        <div className={styles.hero__content}>
          <div className={styles.hero__badge}>
            <span className={styles.hero__badgeDot} aria-hidden="true" />
            {HERO.badge}
          </div>

          <h1 className={styles.hero__heading}>{HERO.heading}</h1>

          <p className={styles.hero__sub}>{HERO.subheading}</p>

          <div className={styles.hero__ctas}>
            <a
              href={HERO.ctas.primary.href}
              className="btn btn--primary btn--lg"
            >
              {HERO.ctas.primary.label}
            </a>
            <a
              href={HERO.ctas.secondary.href}
              className="btn btn--outline btn--lg"
            >
              {HERO.ctas.secondary.label}
            </a>
          </div>
        </div>

        {/* Зображення (Права частина) */}
        <div className={styles.hero__visualContainer}>
          <Image
            src="/main/PC-img.png"
            alt="PC Interface"
            width={1200}
            height={800}
            className={styles.hero__image}
            priority
          />
        </div>
      </div>
    </section>
  );
}
