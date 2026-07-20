"use client";

import { useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServerSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export function ServerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const smokeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const darkGradientRef = useRef<HTMLDivElement>(null);
  const serverBacklightRef = useRef<HTMLDivElement>(null);

  const frameCount = 100;
  const currentFrame = useRef({ frame: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedFrame = useRef(-1);

  // Реф для перевірки чи всі кадри завантажені
  const allLoadedRef = useRef(false);

  const currentFrameImage = useCallback(
    (index: number) =>
      `/server-sequence-webp/${(index + 1).toString().padStart(4, "0")}.webp`,
    [],
  );

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // --- Функція рендеру (малювання) з адаптацією під мобільні ---
    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;

      const isMobile = window.innerWidth <= 768;

      let ratio = Math.min(
        canvas.width / img.width,
        canvas.height / img.height,
      );

      // Збільшуємо модель сервера на мобільних пристроях
      if (isMobile) {
        ratio *= 1.8;
      }

      const centerShift_x = (canvas.width - img.width * ratio) / 2;

      // На телефонах піднімаємо модель трохи вище, щоб звільнити місце для тексту знизу
      const centerShift_y = isMobile
        ? (canvas.height - img.height * ratio) / 2 - canvas.height * 0.15
        : (canvas.height - img.height * ratio) / 2;

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

    // Фіксуємо час початку завантаження
    const startTime = performance.now();

    // --- 1. Надійне завантаження першого кадру ---
    const loadFirstFrame = () => {
      const img = new Image();

      const onReady = () => {
        imagesRef.current[0] = img;
        renderFrame(0);
        lastRenderedFrame.current = 0;
        console.log(
          `[Sequence] Перший кадр (0) готовий. Починаємо фонове завантаження...`,
        );
        loadRestOfFrames();
      };

      img.onload = () => {
        if (img.decode) {
          img.decode().then(onReady).catch(onReady);
        } else {
          onReady();
        }
      };

      img.onerror = () => {
        console.error("[Sequence] Помилка завантаження першого кадру");
        loadRestOfFrames(); // Запускаємо інші навіть якщо перший впав
      };

      img.src = currentFrameImage(0);
    };

    // --- 2. Надійне фонове завантаження інших кадрів ---
    const loadRestOfFrames = async () => {
      let loadedCount = 1;
      const promises: Promise<void>[] = [];

      for (let i = 1; i < frameCount; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();

          const onReady = () => {
            if (!imagesRef.current[i]) {
              imagesRef.current[i] = img;
              loadedCount++;
              if (i % 10 === 0 || i === frameCount - 1) {
                console.log(
                  `[Sequence] Завантажено: ${loadedCount}/${frameCount}`,
                );
              }
            }
            resolve();
          };

          img.onload = () => {
            if (img.decode) {
              img.decode().then(onReady).catch(onReady);
            } else {
              onReady();
            }
          };

          img.onerror = () => {
            console.warn(`[Sequence] Помилка завантаження кадру ${i}`);
            resolve();
          };

          img.src = currentFrameImage(i);
        });

        promises.push(promise);
      }

      await Promise.all(promises);

      allLoadedRef.current = true;

      const endTime = performance.now();
      const loadTimeSeconds = ((endTime - startTime) / 1000).toFixed(2);

      console.log(
        `✅ [Sequence] Всі кадри успішно завантажено за ${loadTimeSeconds} сек! Секвенція розблокована.`,
      );

      const currentScrollFrame = Math.round(currentFrame.current.frame);
      if (currentScrollFrame > 0 && imagesRef.current[currentScrollFrame]) {
        renderFrame(currentScrollFrame);
        lastRenderedFrame.current = currentScrollFrame;
      }
    };

    loadFirstFrame();

    const ctxGsap = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: "+=6000",
          scrub: 0.8,
        },
      });

      // --- ФАЗА 1: Фон та Дим ---
      const [glow1, glow2, glow3, glow4, glow5] = glowRefs.current;
      tl.fromTo(
        glow1,
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
          glow2,
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
          glow3,
          { scale: 1.1, opacity: 0.8 },
          { scale: 1.3, opacity: 1, duration: 2, ease: "sine.inOut" },
          0,
        )
        .fromTo(
          glow4,
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
          glow5,
          { xPercent: -20, yPercent: -20, scale: 1 },
          {
            xPercent: 20,
            yPercent: 20,
            scale: 1.1,
            duration: 2,
            ease: "sine.inOut",
          },
          0,
        );

      const [smoke1, smoke2, smoke3, smoke4] = smokeRefs.current;
      tl.fromTo(
        smoke1,
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
          smoke2,
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
          smoke3,
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
          smoke4,
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
        );

      tl.fromTo(
        canvasRef.current,
        { y: "100vh" },
        { y: "0vh", duration: 2, ease: "power1.inOut" },
        0,
      );

      // --- ФАЗА 2: Чистий фон, наближення та АНІМАЦІЯ КАДРІВ ---
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
        .to(
          currentFrame.current,
          {
            frame: frameCount - 1,
            ease: "none",
            duration: 5,
            onUpdate: () => {
              let frameIndex = Math.round(currentFrame.current.frame);

              // ПОКИ ФОТКИ ВАНТАЖАТЬСЯ — ТРИМАЄМО ПЕРШИЙ КАДР
              if (!allLoadedRef.current) {
                frameIndex = 0;
              }

              if (
                frameIndex !== lastRenderedFrame.current &&
                imagesRef.current[frameIndex]
              ) {
                renderFrame(frameIndex);
                lastRenderedFrame.current = frameIndex;
              }
            },
          },
          2,
        );

      // --- ФАЗА 3: Динамічна поява характеристик ---
      featureRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const startTime = 2.2 + index * 0.6;

        if (isMobile) {
          // НА МОБІЛЬНОМУ: Сувора черговість, щоб текст не накладався один на одного
          tl.fromTo(
            ref,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
            startTime,
          ).to(
            ref,
            { opacity: 0, y: -10, duration: 0.2, ease: "power2.in" },
            startTime + 0.35, // Зникає до того, як з'явиться наступний блок
          );
        } else {
          // НА ДЕСКТОПІ: Плавне перекриття
          tl.fromTo(
            ref,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            startTime,
          ).to(
            ref,
            { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" },
            startTime + 0.8,
          );
        }
      });
    }, sectionRef);

    // --- Оптимізація Ресайзу ---
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        let frameIndex = Math.round(currentFrame.current.frame);
        if (!allLoadedRef.current) frameIndex = 0;

        if (imagesRef.current[frameIndex]) {
          renderFrame(frameIndex);
        }
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctxGsap.revert();
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [currentFrameImage]);

  const featuresData = [
    {
      title: "Надійність 99.9%",
      desc: "Безперебійна робота бізнесу",
      pos: "featureLeft",
      top: "featureTop",
    },
    {
      title: "DDoS Захист",
      desc: "Ваша інформація в безпеці",
      pos: "featureRight",
      top: "featureTop",
    },
    {
      title: "NVMe Сховище",
      desc: "Блискавична швидкість даних",
      pos: "featureLeft",
      top: "featureMiddle",
    },
    {
      title: "Масштабованість",
      desc: "Ресурси ростуть разом з вами",
      pos: "featureRight",
      top: "featureMiddle",
    },
    {
      title: "Резервне копіювання",
      desc: "Щоденні бекапи важливого",
      pos: "featureLeft",
      top: "featureBottom",
    },
    {
      title: "Апаратний RAID",
      desc: "Максимальна відмовостійкість",
      pos: "featureRight",
      top: "featureBottom",
    },
  ];

  return (
    <section className={styles.serverSectionWrapper} ref={sectionRef}>
      <div className={styles.server__glow} aria-hidden="true">
        <div
          ref={(el) => {
            glowRefs.current[0] = el;
          }}
          className={styles.server__glowGreen}
        />
        <div
          ref={(el) => {
            glowRefs.current[1] = el;
          }}
          className={styles.server__glowBlue}
        />
        <div
          ref={(el) => {
            glowRefs.current[2] = el;
          }}
          className={styles.server__glowPurple}
        />
        <div
          ref={(el) => {
            glowRefs.current[3] = el;
          }}
          className={styles.server__glowOrange}
        />
        <div
          ref={(el) => {
            glowRefs.current[4] = el;
          }}
          className={styles.server__glowCyan}
        />
      </div>

      <div className={styles.smokeContainer} aria-hidden="true">
        <div
          ref={(el) => {
            smokeRefs.current[0] = el;
          }}
          className={`${styles.smokeLayer} ${styles.smoke1}`}
        />
        <div
          ref={(el) => {
            smokeRefs.current[1] = el;
          }}
          className={`${styles.smokeLayer} ${styles.smoke2}`}
        />
        <div
          ref={(el) => {
            smokeRefs.current[2] = el;
          }}
          className={`${styles.smokeLayer} ${styles.smoke3}`}
        />
        <div
          ref={(el) => {
            smokeRefs.current[3] = el;
          }}
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

      <canvas ref={canvasRef} className={styles.canvasContainer} />

      <div className={styles.featuresContainer}>
        {featuresData.map((feature, i) => (
          <div
            key={i}
            ref={(el) => {
              featureRefs.current[i] = el;
            }}
            className={`${styles.featureItem} ${styles[feature.pos]} ${styles[feature.top]}`}
          >
            <div className={styles.featureContent}>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
            <div className={styles.featureLine}></div>
          </div>
        ))}
      </div>

      <div className={styles.overlayContent}></div>
    </section>
  );
}
