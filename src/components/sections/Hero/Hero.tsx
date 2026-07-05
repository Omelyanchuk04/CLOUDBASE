"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HERO } from "@/lib/constants";
import styles from "./Hero.module.scss";

function DataFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let files: FileParticle[] = [];

    // === 1. ЗАВАНТАЖЕННЯ ТВОЇХ ІКОНОК ===
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

    // === НАЛАШТУВАННЯ ПОТОКУ ===
    const numFiles = 100; // Оптимальна кількість для картинок, щоб не було "каші"
    const speed = 6; // Плавна швидкість

    class FileParticle {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      imgIndex: number = 0; // Індекс вибраної картинки

      constructor(w: number, h: number) {
        this.reset(w, h);
        this.z = Math.random() * w;
      }

      reset(w: number, h: number) {
        this.x = (Math.random() - 0.5) * w * 1.5;
        this.y = (Math.random() - 0.5) * h * 1.5;
        this.z = w;
        // Випадково вибираємо одну з 5 завантажених картинок
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

        // Плавно з'являються вдалині
        let opacity = 1;
        if (this.z > w * 0.7) {
          opacity = 1 - (this.z - w * 0.7) / (w * 0.3);
        }
        opacity = Math.max(0.05, opacity);

        // Масштаб картинки залежно від наближення
        const scale = (fov / this.z) * 0.8;

        // 1. МАЛЮЄМО "ХВІСТ" ВІД ШВИДКОСТІ
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

        // 2. МАЛЮЄМО САМУ PNG ІКОНКУ
        const img = loadedImages[this.imgIndex];

        // Перевіряємо, чи картинка вже встигла завантажитися браузером
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.translate(px, py);

          // Задаємо прозорість для картинки
          ctx.globalAlpha = opacity;

          // Базовий розмір іконки (наприклад, 40x40 пікселів), який множиться на масштаб
          const size = 20 * scale;

          // Малюємо картинку по центру координат
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

const replaceTextWithLogos = (text: string) => {
  const parts = text.split(/(BAS\/1[СCсc]|1[СCсc]\/BAS)/i);

  return parts.map((part, i) => {
    if (part.match(/BAS\/1[СCсc]|1[СCсc]\/BAS/i)) {
      return (
        <span key={i} className={styles.inlineLogos}>
          <Image
            src="/main/1s-logo.svg"
            alt="1C"
            width={50}
            height={40}
            className={styles.inlineLogo}
            style={{ width: "auto", height: "50px" }}
            priority
          />
          <span className={styles.logoSeparator}>/</span>

          <Image
            src="/main/BAS-logo.png"
            alt="BAS"
            width={90}
            height={40}
            className={styles.inlineLogo}
            style={{ width: "auto", height: "40px" }}
            priority
          />
          <span className={styles.logoSeparator}>/</span>
          <Image
            src="/main/KBS-logo.png"
            alt="KBS"
            width={90}
            height={40}
            className={styles.inlineLogo}
            style={{ width: "auto", height: "40px" }}
            priority
          />
          <span className={styles.logoSeparator}>/</span>
          <Image
            src="/main/MEDOC-logo.png"
            alt="MEDOC"
            width={90}
            height={40}
            className={styles.inlineLogo}
            style={{ width: "auto", height: "45px" }}
            priority
          />
        </span>
      );
    }
    // Якщо це текст ПІСЛЯ логотипів, просто переносимо його на новий рядок
    else if (i > 1 && part.trim().length > 0) {
      return (
        <span key={i} className={styles.newLineText}>
          {part.trim()}
        </span>
      );
    } else {
      return part;
    }
  });
};

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__glow} aria-hidden="true">
        <div className={styles.hero__glowGreen} />
        <div className={styles.hero__glowBlue} />
        <div className={styles.hero__glowPurple} />
      </div>

      <DataFlowBackground />

      <div className={`container ${styles.hero__inner}`}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__heading}>
            {replaceTextWithLogos(HERO.heading)}
          </h1>

          <p className={styles.hero__sub}>{HERO.subheading}</p>

          <div className={styles.hero__ctas}>
            <a
              href={HERO.ctas.secondary.href}
              className="btn btn--outline btn--lg"
            >
              {HERO.ctas.secondary.label}
            </a>
          </div>
        </div>

        <div className={styles.hero__visualContainer}>
          <Image
            src="/main/PC-REMOTE-img.png"
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
