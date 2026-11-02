"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easedFade } from "@/lib/utils/gradients";
import styles from "../../../BAS/sections/BasHero/BasHero.module.scss";
import ServerScene from "./ServerScene";

// Hero «Хмара»: темний фон з рожево-фіолетовими і персиковими плямами.
// Заголовок проявляється по словах, під ним сцена: серверна стійка
// і підключені до неї робочі місця. Лише transform, opacity і dashoffset

const ease = [0.16, 1, 0.3, 1] as const;

const handleGlassMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--gx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
  el.style.setProperty("--gy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
};

const handleGlassLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.removeProperty("--gx");
  e.currentTarget.style.removeProperty("--gy");
};

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Слова заголовка: accent — у кольорі акценту
const WORDS = [
  { w: "Хмара", accent: false },
  { w: "для", accent: false },
  { w: "ваших", accent: true },
  { w: "програм", accent: true },
];
const TEXT_END = 0.8;

const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

// Слово проявляється з легкого зсуву і прозорості
const Word = ({ children, i, still, className }: { children: React.ReactNode; i: number; still: boolean; className: string }) => (
  <motion.span
    className={`inline-block bg-clip-text pb-[0.08em] text-transparent ${className}`}
    initial={still ? false : { opacity: 0, y: "0.35em" }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
  >
    {children}
  </motion.span>
);

const CloudHero = () => {
  const reduce = !!useReducedMotion();
  // Сцена стартує після першого кадру, щоб анімація не губилась під час гідратації
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const ready = mounted || reduce;

  return (
    <section className={styles.section} data-theme="dark">
      {/* Плями: рожево-фіолетова праворуч угорі, персикова зліва, синьо-фіолетова під знімком.
          Лише радіальні градієнти без розмиття, тож без різких країв */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[14%] -top-[16%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(213,126,235,0.32),rgba(213,126,235,0.08)_55%,transparent)]" />
        <div className="absolute -left-[18%] top-[18%] h-[55vw] max-h-[720px] w-[55vw] max-w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(252,203,144,0.2),rgba(252,203,144,0.05)_55%,transparent)]" />
        <div className="absolute bottom-[-8%] left-1/2 h-[55vw] max-h-[720px] w-[90vw] max-w-[1300px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(99,102,241,0.3),rgba(99,102,241,0.08)_55%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-[150px] pt-36 md:pb-[130px] md:pt-44">
        {/* Текст */}
        <div className="flex flex-col items-start text-left md:items-center md:text-center">
          <h1 className="max-w-[920px] text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px] xl:text-[64px]">
            {WORDS.map(({ w, accent }, i) => (
              <React.Fragment key={w}>
                <Word
                  i={i}
                  still={reduce}
                  className={accent ? "bg-gradient-to-b from-[#ffe1c4] to-[#d57eeb]" : "bg-gradient-to-b from-white to-white/40"}
                >
                  {w}
                </Word>{" "}
              </React.Fragment>
            ))}
          </h1>

          <motion.p {...appear(TEXT_END)} className="mt-4 max-w-[640px] text-[15px] text-white/60 md:text-lg">
            Доступ 24/7 з будь-якого пристрою і щоденні резервні копії.
          </motion.p>

          <motion.div {...appear(TEXT_END + 0.1)} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 md:justify-center">
            <a
              href="#application"
              onClick={scrollTo("application")}
              className={styles.glassBtn}
              onPointerMove={handleGlassMove}
              onPointerLeave={handleGlassLeave}
            >
              <span>Залишити заявку</span>
              <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#configurations"
              onClick={scrollTo("configurations")}
              className="group inline-flex items-center text-[15px] font-semibold text-white/75 transition-colors hover:text-white"
            >
              Тарифи
              <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Серверна стійка і підключені робочі місця */}
        <div className="relative mx-auto mt-14 w-full max-w-[1000px] md:mt-20">
          <ServerScene reduce={reduce} ready={ready} />
        </div>
      </div>

      {/* Плавний перехід у білу секцію тарифів */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[180px] md:h-[240px]"
        style={{ background: easedFade("#ffffff") }}
      />
      <div data-theme="light" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[100px]" />
    </section>
  );
};

export default CloudHero;
