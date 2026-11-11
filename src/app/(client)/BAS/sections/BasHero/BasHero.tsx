"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { easedFade } from "@/lib/utils/gradients";
import styles from "./BasHero.module.scss";
import { scrollToSection } from "@/lib/utils/scrollToSection";

// Hero: темний фон з бірюзовою, бурштиновою та індиго плямами і три скриншоти BAS.
// Поява: заголовок проявляється хвилею світла, потім пласкі скриншоти
// нахиляються в ізометрію і шари розходяться. Рухаються лише transform, opacity і маска

const ease = [0.16, 1, 0.3, 1] as const;

const handleGlassMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty(
    "--gx",
    `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`,
  );
  el.style.setProperty(
    "--gy",
    `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`,
  );
};

const handleGlassLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.removeProperty("--gx");
  e.currentTarget.style.removeProperty("--gy");
};

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToSection(id);
};

// Заголовок проявляється «хвилею» світла зліва направо (анімована маска)
const TITLE_END = 1.1; // коли заголовок вже прочитується

const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

// Від нижнього шару до верхнього
const LAYERS = [
  {
    src: "/main/BAS-img3.jpg",
    alt: "Відомість амортизації ОЗ у BAS Бухгалтерія КОРП",
  },
  { src: "/main/BAS-img.jpg", alt: "Оборотно-сальдова відомість у BAS" },
  { src: "/main/BAS-img6.jpg", alt: "Початкова сторінка BAS Бухгалтерія" },
];

const GAP = 110; // відстань між шарами після розкриття, px
const START = 0.7; // скриншот з'являється, коли заголовок майже проявився

const Layer = ({
  src,
  alt,
  index,
  ready,
  still,
  onLoad,
}: {
  src: string;
  alt: string;
  index: number;
  ready: boolean;
  still: boolean;
  onLoad: () => void;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  // Картинка з кешу може бути завантажена ще до підписки на onLoad
  useEffect(() => {
    if (imgRef.current?.complete) onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const final = { opacity: 1, z: index * GAP };
  const top = index === LAYERS.length - 1;

  return (
    <motion.div
      className={`${index === 0 ? "relative" : "absolute inset-0"} overflow-hidden rounded-xl bg-white ring-1 ring-white/20`}
      style={{
        willChange: "transform, opacity",
        boxShadow: "0 40px 80px -20px rgba(0,0,0,0.65)",
      }}
      initial={still ? final : { opacity: 0, z: 0 }}
      animate={ready || still ? final : undefined}
      transition={{
        opacity: { duration: 0.8, ease, delay: START - 0.2 },
        z: { duration: 1.6, ease, delay: START + 1.4 + index * 0.12 },
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={onLoad}
        className="block aspect-[16/10] w-full object-cover object-left-top"
        decoding="async"
        draggable={false}
      />
      {/* Нижні шари трохи притемнені, щоб верхній читався першим */}
      {!top && (
        <div aria-hidden="true" className="absolute inset-0 bg-[#0d0e15]/25" />
      )}
    </motion.div>
  );
};

const BasHero = () => {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(0);
  const [timeoutPassed, setTimeoutPassed] = useState(false);

  // Якщо мережа повільна, не чекаємо картинки довше 1.5 с
  useEffect(() => {
    const t = setTimeout(() => setTimeoutPassed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const ready = loaded >= LAYERS.length || timeoutPassed;

  // Хвиля світла по заголовку: маска їде зі 100% до 0%
  const mask = useMotionValue(reduce ? 0 : 100);
  const maskPos = useMotionTemplate`${mask}% 0%`;
  useEffect(() => {
    if (reduce) return;
    const c = animate(mask, 0, {
      duration: 1.5,
      delay: 0.15,
      ease: [0.45, 0, 0.2, 1],
    });
    return () => c.stop();
  }, [mask, reduce]);

  return (
    <section className={styles.section} data-theme="dark">
      {/* Плями: бірюзова вгорі праворуч, бурштинова зліва, індиго під скриншотами.
          Розміщення і кольори інші, ніж на головній. Лише радіальні градієнти
          без розмиття, тож без різких країв */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[12%] -top-[18%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.34),rgba(20,184,166,0.1)_55%,transparent)]" />
        <div className="absolute -left-[16%] top-[28%] h-[55vw] max-h-[700px] w-[55vw] max-w-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.22),rgba(245,158,11,0.06)_55%,transparent)]" />
        <div className="absolute bottom-[-10%] left-1/2 h-[60vw] max-h-[800px] w-[90vw] max-w-[1300px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(79,70,229,0.36),rgba(79,70,229,0.1)_55%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-[90px] pt-36 md:pb-[130px] md:pt-44">
        {/* Текст */}
        <div className="flex flex-col items-start text-left md:items-center md:text-center">
          <motion.h1
            className="max-w-[920px] text-[36px] md:text-[56px] xl:text-[64px] bg-gradient-to-b from-white to-white/40 bg-clip-text pb-[0.08em] font-semibold leading-[1.05] tracking-[-0.03em] text-transparent"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, #000 40%, rgba(0,0,0,0.15) 50%, transparent 60%)",
              maskImage:
                "linear-gradient(90deg, #000 40%, rgba(0,0,0,0.15) 50%, transparent 60%)",
              WebkitMaskSize: "300% 100%",
              maskSize: "300% 100%",
              WebkitMaskPosition: maskPos,
              maskPosition: maskPos,
            }}
            initial={reduce ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, delay: 0.15, ease: [0.45, 0, 0.2, 1] }}
          >
            Встановлення. Супровід. {"\u00a0"}Доробки{" "}
            <span className="bg-gradient-to-b from-[#9fd0ff] to-[#3b8fe0] bg-clip-text text-transparent">BAS</span>
          </motion.h1>

          <motion.p
            {...appear(TITLE_END)}
            className="mt-4 text-[15px] text-white/60 md:text-lg"
          >
            Та розміщення BAS у нашій хмарі.
          </motion.p>

          <motion.div
            {...appear(TITLE_END + 0.1)}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 md:justify-center"
          >
            <a
              href="#application"
              onClick={scrollTo("application")}
              className={styles.glassBtn}
              onPointerMove={handleGlassMove}
              onPointerLeave={handleGlassLeave}
            >
              <span>Отримати консультацію</span>
              <svg
                className={styles.arrow}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#solutions"
              onClick={scrollTo("solutions")}
              className="group inline-flex items-center text-[15px] font-semibold text-white/75 transition-colors hover:text-white"
            >
              Доробки
              <svg
                className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Три скриншоти шарами в ізометрії */}
        <div className="relative mx-auto mt-24 h-[300px] w-full max-w-[1000px] sm:mt-16 sm:h-[420px] md:mt-20 md:h-[560px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: START - 0.2, ease }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-[60%] w-[78%] -translate-x-1/2 -translate-y-1/2 sm:w-[64%] md:w-[60%]">
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  transformPerspective: 2400,
                }}
                initial={
                  reduce ? false : { rotateX: 0, rotateZ: 0, scale: 0.92 }
                }
                animate={
                  ready || reduce
                    ? { rotateX: 56, rotateZ: -38, scale: 1 }
                    : undefined
                }
                transition={{
                  duration: 1.8,
                  delay: START + 0.35,
                  ease: [0.65, 0, 0.25, 1],
                }}
              >
                {LAYERS.map((l, i) => (
                  <Layer
                    key={l.src}
                    src={l.src}
                    alt={l.alt}
                    index={i}
                    ready={ready}
                    still={!!reduce}
                    onLoad={() => setLoaded((n) => n + 1)}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Плавний перехід у білу секцію конфігурацій */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[180px] md:h-[240px]"
        style={{ background: easedFade("#ffffff") }}
      />
      <div
        data-theme="light"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[100px]"
      />
    </section>
  );
};

export default BasHero;
