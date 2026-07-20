"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServerSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export function ServerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const smoke1Ref = useRef<HTMLDivElement>(null);
  const smoke2Ref = useRef<HTMLDivElement>(null);
  const smoke3Ref = useRef<HTMLDivElement>(null);
  const smoke4Ref = useRef<HTMLDivElement>(null);

  const glowGreenRef = useRef<HTMLDivElement>(null);
  const glowBlueRef = useRef<HTMLDivElement>(null);
  const glowPurpleRef = useRef<HTMLDivElement>(null);
  const glowOrangeRef = useRef<HTMLDivElement>(null);
  const glowCyanRef = useRef<HTMLDivElement>(null);

  // Рефи для нового чистого фону
  const darkGradientRef = useRef<HTMLDivElement>(null);
  const serverBacklightRef = useRef<HTMLDivElement>(null);

  const frameCount = 180;
  const currentFrame = useRef({ frame: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedFrame = useRef(-1);

  const currentFrameImage = (index: number) =>
    `/server-sequence/${(index + 1).toString().padStart(4, "0")}.png`;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrameImage(i);

      img
        .decode()
        .then(() => {
          if (i === 0 && lastRenderedFrame.current === -1) {
            renderFrame(0);
            lastRenderedFrame.current = 0;
          }
        })
        .catch(() => {
          img.onload = () => {
            if (i === 0 && lastRenderedFrame.current === -1) {
              renderFrame(0);
              lastRenderedFrame.current = 0;
            }
          };
        });
      images.push(img);
    }
    imagesRef.current = images;

    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;

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

    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: "+=5000",
          scrub: 0.15,
        },
      });

      // --- ФАЗА 1: Вибух диму + Виїзд сервера ---

      tl.fromTo(
        glowGreenRef.current,
        { xPercent: -15, yPercent: 10, scale: 0.9 },
        {
          xPercent: 10,
          yPercent: -10,
          scale: 1.1,
          duration: 2,
          ease: "sine.inOut",
        },
        0,
      )
        .fromTo(
          glowBlueRef.current,
          { xPercent: 15, yPercent: -10, scale: 1 },
          {
            xPercent: -10,
            yPercent: 10,
            scale: 1.2,
            duration: 2,
            ease: "sine.inOut",
          },
          0,
        )
        .fromTo(
          glowOrangeRef.current,
          { xPercent: 20, yPercent: 20, scale: 0.8 },
          {
            xPercent: -20,
            yPercent: -20,
            scale: 1,
            duration: 2,
            ease: "sine.inOut",
          },
          0,
        )
        .fromTo(
          glowCyanRef.current,
          { xPercent: -20, yPercent: -20, scale: 1 },
          {
            xPercent: 20,
            yPercent: 20,
            scale: 1.1,
            duration: 2,
            ease: "sine.inOut",
          },
          0,
        )
        .fromTo(
          glowPurpleRef.current,
          { scale: 1.1, opacity: 0.8 },
          { scale: 1.3, opacity: 1, duration: 2, ease: "sine.inOut" },
          0,
        )

        .fromTo(
          smoke1Ref.current,
          { x: "0%", y: "0%", scale: 0.8, opacity: 1, rotation: 0 },
          {
            x: "-50%",
            y: "-40%",
            scale: 3.5,
            opacity: 0,
            rotation: -15,
            duration: 4.5,
            ease: "power1.inOut",
          },
          0,
        )
        .fromTo(
          smoke2Ref.current,
          { x: "0%", y: "0%", scale: 1, opacity: 1, rotation: 0 },
          {
            x: "50%",
            y: "30%",
            scale: 4,
            opacity: 0,
            rotation: 15,
            duration: 4.5,
            ease: "power1.inOut",
          },
          0,
        )
        .fromTo(
          smoke3Ref.current,
          { x: "0%", y: "0%", scale: 0.9, opacity: 1, rotation: 0 },
          {
            x: "-40%",
            y: "50%",
            scale: 3.5,
            opacity: 0,
            rotation: 25,
            duration: 4.5,
            ease: "power1.inOut",
          },
          0,
        )
        .fromTo(
          smoke4Ref.current,
          { x: "0%", y: "0%", scale: 1.2, opacity: 1, rotation: 0 },
          {
            x: "40%",
            y: "-50%",
            scale: 4.5,
            opacity: 0,
            rotation: -20,
            duration: 4.5,
            ease: "power1.inOut",
          },
          0,
        )

        .fromTo(
          canvasRef.current,
          { y: "100vh" },
          { y: "0vh", duration: 2, ease: "power1.inOut" },
          0,
        );

      // --- ФАЗА 2: Чистий фон та наближення ---

      // Плавно проявляємо глибокий фон та м'яку ауру
      tl.to(
        [darkGradientRef.current, serverBacklightRef.current],
        { opacity: 1, duration: 1.5, ease: "power1.inOut" },
        2,
      )
        // Аура злегка "дихає", розширюючись разом із наближенням сервера
        .to(
          serverBacklightRef.current,
          { scale: 1.2, duration: 4, ease: "none" },
          2,
        )

        .to(
          currentFrame.current,
          {
            frame: frameCount - 1,
            ease: "none",
            duration: 4,
            onUpdate: () => {
              const frameIndex = Math.round(currentFrame.current.frame);
              if (
                frameIndex !== lastRenderedFrame.current &&
                imagesRef.current[frameIndex]
              ) {
                requestAnimationFrame(() => {
                  renderFrame(frameIndex);
                  lastRenderedFrame.current = frameIndex;
                });
              }
            },
          },
          2,
        );
    }, sectionRef);

    const handleResize = () => {
      const frameIndex = Math.round(currentFrame.current.frame);
      if (imagesRef.current[frameIndex]) {
        renderFrame(frameIndex);
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
      <div className={styles.server__glow} aria-hidden="true">
        <div ref={glowGreenRef} className={styles.server__glowGreen} />
        <div ref={glowBlueRef} className={styles.server__glowBlue} />
        <div ref={glowPurpleRef} className={styles.server__glowPurple} />
        <div ref={glowOrangeRef} className={styles.server__glowOrange} />
        <div ref={glowCyanRef} className={styles.server__glowCyan} />
      </div>

      <div className={styles.smokeContainer} aria-hidden="true">
        <div
          ref={smoke1Ref}
          className={`${styles.smokeLayer} ${styles.smoke1}`}
        />
        <div
          ref={smoke2Ref}
          className={`${styles.smokeLayer} ${styles.smoke2}`}
        />
        <div
          ref={smoke3Ref}
          className={`${styles.smokeLayer} ${styles.smoke3}`}
        />
        <div
          ref={smoke4Ref}
          className={`${styles.smokeLayer} ${styles.smoke4}`}
        />
      </div>

      {/* НОВИЙ ЧИСТИЙ ФОН: Глибокий градієнт та м'яка аура */}
      <div
        ref={darkGradientRef}
        className={styles.darkGradientBg}
        aria-hidden="true"
      />
      <div
        ref={serverBacklightRef}
        className={styles.serverBacklight}
        aria-hidden="true"
      />

      <canvas ref={canvasRef} className={styles.canvasContainer} />

      <div className={styles.overlayContent}></div>
    </section>
  );
}
