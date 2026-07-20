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

  const darkGradientRef = useRef<HTMLDivElement>(null);
  const serverBacklightRef = useRef<HTMLDivElement>(null);

  // Окремі рефи для 6 характеристик
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const feature3Ref = useRef<HTMLDivElement>(null);
  const feature4Ref = useRef<HTMLDivElement>(null);
  const feature5Ref = useRef<HTMLDivElement>(null);
  const feature6Ref = useRef<HTMLDivElement>(null);

  const frameCount = 180;
  const currentFrame = useRef({ frame: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedFrame = useRef(-1);

  const allFramesLoadedRef = useRef(false);

  const currentFrameImage = (index: number) =>
    `/server-sequence/${(index + 1).toString().padStart(4, "0")}.png`;

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const images: HTMLImageElement[] = [];

    const loadFirstFrame = () => {
      const img = new Image();
      img.src = currentFrameImage(0);
      img.onload = () => {
        images[0] = img;
        imagesRef.current = images;

        renderFrame(0);
        lastRenderedFrame.current = 0;

        loadRestOfFrames();
      };
    };

    const loadRestOfFrames = () => {
      let loadedCount = 1;

      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrameImage(i);

        img.onload = () => {
          images[i] = img;
          loadedCount++;

          if (loadedCount === frameCount) {
            allFramesLoadedRef.current = true;
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            allFramesLoadedRef.current = true;
          }
        };
      }
    };

    loadFirstFrame();

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
          end: "+=6000", // Трохи збільшили дистанцію скролу, бо додали більше фішок
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
      tl.to(
        [darkGradientRef.current, serverBacklightRef.current],
        { opacity: 1, duration: 1.5, ease: "power1.inOut" },
        2,
      )
        .to(
          serverBacklightRef.current,
          { scale: 1.2, duration: 5, ease: "none" },
          2,
        )

        // Секвенція сервера (розтягнуто на 5 секунд, щоб всі фішки встигли показатись)
        .to(
          currentFrame.current,
          {
            frame: frameCount - 1,
            ease: "none",
            duration: 5,
            onUpdate: () => {
              if (!allFramesLoadedRef.current) return;

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

      // --- ФАЗА 3: Послідовна поява 6 характеристик зі скролом ---
      // Вони будуть чергуватися вліво-вправо і плавно зникати.

      // 1 (Лівий верх)
      tl.fromTo(
        feature1Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        2.2,
      ).to(
        feature1Ref.current,
        { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" },
        3.0,
      );

      // 2 (Правий верх)
      tl.fromTo(
        feature2Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        2.8,
      ).to(
        feature2Ref.current,
        { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" },
        3.6,
      );

      // 3 (Ліва середина)
      tl.fromTo(
        feature3Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        3.4,
      ).to(
        feature3Ref.current,
        { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" },
        4.2,
      );

      // 4 (Права середина)
      tl.fromTo(
        feature4Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        4.0,
      ).to(
        feature4Ref.current,
        { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" },
        4.8,
      );

      // 5 (Лівий низ)
      tl.fromTo(
        feature5Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        4.6,
      ).to(
        feature5Ref.current,
        { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" },
        5.4,
      );

      // 6 (Правий низ)
      tl.fromTo(
        feature6Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        5.2,
      ).to(
        feature6Ref.current,
        { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" },
        6.0,
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

      {/* Canvas сервера */}
      <canvas ref={canvasRef} className={styles.canvasContainer} />

      {/* Контейнер з характеристиками */}
      <div className={styles.featuresContainer}>
        {/* 1 */}
        <div
          ref={feature1Ref}
          className={`${styles.featureItem} ${styles.featureLeft} ${styles.featureTop}`}
        >
          <div className={styles.featureContent}>
            <h4>Надійність 99.9%</h4>
            <p>Безперебійна робота бізнесу</p>
          </div>
          <div className={styles.featureLine}></div>
        </div>

        {/* 2 */}
        <div
          ref={feature2Ref}
          className={`${styles.featureItem} ${styles.featureRight} ${styles.featureTop}`}
        >
          <div className={styles.featureContent}>
            <h4>DDoS Захист</h4>
            <p>Ваша інформація в безпеці</p>
          </div>
          <div className={styles.featureLine}></div>
        </div>

        {/* 3 */}
        <div
          ref={feature3Ref}
          className={`${styles.featureItem} ${styles.featureLeft} ${styles.featureMiddle}`}
        >
          <div className={styles.featureContent}>
            <h4>NVMe Сховище</h4>
            <p>Блискавична швидкість даних</p>
          </div>
          <div className={styles.featureLine}></div>
        </div>

        {/* 4 */}
        <div
          ref={feature4Ref}
          className={`${styles.featureItem} ${styles.featureRight} ${styles.featureMiddle}`}
        >
          <div className={styles.featureContent}>
            <h4>Масштабованість</h4>
            <p>Ресурси ростуть разом з вами</p>
          </div>
          <div className={styles.featureLine}></div>
        </div>

        {/* 5 */}
        <div
          ref={feature5Ref}
          className={`${styles.featureItem} ${styles.featureLeft} ${styles.featureBottom}`}
        >
          <div className={styles.featureContent}>
            <h4>Резервне копіювання</h4>
            <p>Щоденні бекапи важливого</p>
          </div>
          <div className={styles.featureLine}></div>
        </div>

        {/* 6 */}
        <div
          ref={feature6Ref}
          className={`${styles.featureItem} ${styles.featureRight} ${styles.featureBottom}`}
        >
          <div className={styles.featureContent}>
            <h4>Апаратний RAID</h4>
            <p>Максимальна відмовостійкість</p>
          </div>
          <div className={styles.featureLine}></div>
        </div>
      </div>

      <div className={styles.overlayContent}></div>
    </section>
  );
}
