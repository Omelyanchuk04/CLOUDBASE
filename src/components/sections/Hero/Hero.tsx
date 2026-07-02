"use client";

import { useEffect, useRef } from "react";
import { HERO } from "@/lib/constants";
import styles from "./Hero.module.scss";

// Ефект Warp Speed (лінії назустріч у космосі)
function WarpSpeedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const numStars = 300; // Кількість ліній
    const speed = 15; // Швидкість польоту

    class Star {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      pz: number = 0;

      constructor(w: number, h: number) {
        this.reset(w, h);
        // Розкидаємо початкові координати Z щоб не було різкого старту
        this.z = Math.random() * w;
        this.pz = this.z;
      }

      reset(w: number, h: number) {
        this.x = (Math.random() - 0.5) * w * 2;
        this.y = (Math.random() - 0.5) * h * 2;
        this.z = w;
        this.pz = this.z;
      }

      update(speed: number, w: number, h: number) {
        this.pz = this.z;
        this.z -= speed;
        if (this.z < 1) {
          this.reset(w, h);
          this.pz = this.z;
        }
      }

      draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const cx = w / 2;
        const cy = h / 2;
        const fov = w; // Поле зору

        // Поточні координати з урахуванням перспективи
        const sx = (this.x / this.z) * fov + cx;
        const sy = (this.y / this.z) * fov + cy;

        // Попередні координати для малювання лінії (шлейфу)
        const px = (this.x / this.pz) * fov + cx;
        const py = (this.y / this.pz) * fov + cy;

        // Яскравість та товщина залежать від близькості до екрану
        const distanceFactor = 1 - this.z / w;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(255, 255, 255, ${distanceFactor})`; // Білі напівпрозорі лінії
        ctx.lineWidth = distanceFactor * 3;
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
      // Використовуємо напівпрозорий фон для ефекту розмиття руху (motion blur)
      ctx.fillStyle = "rgba(10, 10, 10, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      {/* Динамічний фон */}
      <WarpSpeedBackground />

      {/* Затемнення для кращої читабельності тексту */}
      <div className={styles.hero__overlay} aria-hidden="true" />

      <div className={`container ${styles.hero__inner}`}>
        {/* ЛІВА ЧАСТИНА: Контент */}
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

        {/* ПРАВА ЧАСТИНА: Glassmorphism Візуал */}
        <div className={styles.hero__visual}>
          <div className={styles.hero__card}>
            <div className={styles.hero__cardHeader}>
              <span className={styles.hero__cardPulse} />
              {HERO.card.title}
            </div>

            <div className={styles.hero__cardBody}>
              {HERO.card.stats.map((stat, idx) => (
                <div key={idx} className={styles.hero__statRow}>
                  <span className={styles.hero__statLabel}>{stat.label}</span>
                  <span
                    className={
                      stat.highlight
                        ? styles.hero__statHighlight
                        : styles.hero__statValue
                    }
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
