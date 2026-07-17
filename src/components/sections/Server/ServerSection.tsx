"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServerSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export function ServerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Налаштування секвенції
  const frameCount = 180; // Кількість твоїх кадрів
  const currentFrame = useRef({ frame: 1 }); // Починаємо з 1 (бо перший файл 0001.png)
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Функція генерує правильний шлях: 1 -> "0001.png", 15 -> "0015.png"
  const currentFrameImage = (index: number) =>
    `/server-sequence/${index.toString().padStart(4, "0")}.png`;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- 1. Попереднє завантаження картинок (Preload) ---
    // Це потрібно, щоб картинки не блимали під час скролу
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrameImage(i);
      img.onload = () => {
        // Як тільки завантажилась перша картинка, одразу малюємо її на екрані
        if (i === 1) {
          renderFrame(img);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // --- 2. Функція малювання (аналог object-fit: contain) ---
    const renderFrame = (img: HTMLImageElement) => {
      if (!img.complete || img.naturalWidth === 0) return;

      // Розмір канвасу підлаштовуємо під розмір вікна
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Математика, щоб картинка сервера зберігала пропорції
      // і завжди ідеально вписувалась в екран без розтягування
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio);

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio,
      );
    };

    // --- 3. GSAP Анімація Скролу ---
    const ctxGsap = gsap.context(() => {
      gsap.to(currentFrame.current, {
        frame: frameCount - 1, // Анімуємо до індексу 119 (бо масив починається з 0)
        snap: "frame", // Значення завжди буде цілим числом (кадри не бувають дробовими)
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: "+=3500", // Зберігаємо ту саму дистанцію скролу
          scrub: 1, // Плавність інерції
        },
        onUpdate: () => {
          // При кожному пікселі скролу дістаємо відповідну картинку з масиву
          const frameIndex = Math.round(currentFrame.current.frame);
          if (imagesRef.current[frameIndex]) {
            renderFrame(imagesRef.current[frameIndex]);
          }
        },
      });
    }, sectionRef);

    // --- 4. Адаптивність при зміні розміру вікна ---
    const handleResize = () => {
      const frameIndex = Math.round(currentFrame.current.frame);
      if (imagesRef.current[frameIndex]) {
        renderFrame(imagesRef.current[frameIndex]);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctxGsap.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.serverSectionWrapper} ref={sectionRef}>
      {/* Підсвітка залишається незмінною */}
      <div className={styles.server__glow} aria-hidden="true">
        <div className={styles.server__glowGreen} />
        <div className={styles.server__glowBlue} />
        <div className={styles.server__glowPurple} />
      </div>

      {/* CANVAS замість Three.js */}
      <canvas ref={canvasRef} className={styles.canvasContainer} />

      <div className={styles.overlayContent}>{/* Текст */}</div>
    </section>
  );
}
