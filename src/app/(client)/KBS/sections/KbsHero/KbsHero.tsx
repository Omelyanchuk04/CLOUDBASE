"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easedFade } from "@/lib/utils/gradients";
import styles from "../../../BAS/sections/BasHero/BasHero.module.scss";
import { scrollToSection } from "@/lib/utils/scrollToSection";

// Hero KBS: той самий темний стиль, що й у BAS, але інша подача.
// Заголовок піднімається по словах, головний скриншот «встає» зі столу,
// а вікно віддаленого робочого столу виїжджає з-за нього праворуч.
// Рухаються лише transform і opacity

const ease = [0.16, 1, 0.3, 1] as const;
const rise = [0.65, 0, 0.25, 1] as const;

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
  scrollToSection(id);
};

const WORDS = ["Встановлення", "і", "супровід"];
const TEXT_END = 0.75; // коли заголовок вже прочитується

const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

// Слово виїжджає знизу з-під маски
const Word = ({ children, i, still, className = "" }: { children: React.ReactNode; i: number; still: boolean; className?: string }) => (
  <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      initial={still ? false : { y: "105%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay: 0.1 + i * 0.09, ease }}
    >
      {children}
    </motion.span>
  </span>
);

const useLoaded = (onLoad: () => void) => {
  const ref = useRef<HTMLImageElement>(null);
  // Картинка з кешу може бути завантажена ще до підписки на onLoad
  useEffect(() => {
    if (ref.current?.complete) onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
};

const Shot = ({ src, alt, onLoad, className }: { src: string; alt: string; onLoad: () => void; className: string }) => {
  const ref = useLoaded(onLoad);
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onLoad={onLoad}
      className={`block w-full ${className}`}
      decoding="async"
      draggable={false}
    />
  );
};

const KbsHero = () => {
  const reduce = !!useReducedMotion();
  const [loaded, setLoaded] = useState(0);
  const [timeoutPassed, setTimeoutPassed] = useState(false);

  // Якщо мережа повільна, не чекаємо картинки довше 1.5 с
  useEffect(() => {
    const t = setTimeout(() => setTimeoutPassed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const ready = loaded >= 2 || timeoutPassed || reduce;
  const onLoad = () => setLoaded((n) => n + 1);

  return (
    <section className={styles.section} data-theme="dark">
      {/* Плями: смарагдова зліва вгорі, блакитна праворуч, синьо-зелена під скриншотами.
          Лише радіальні градієнти без розмиття, тож без різких країв */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[18%] -top-[12%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.3),rgba(16,185,129,0.08)_55%,transparent)]" />
        <div className="absolute -right-[18%] top-[22%] h-[60vw] max-h-[780px] w-[60vw] max-w-[780px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.24),rgba(56,189,248,0.06)_55%,transparent)]" />
        <div className="absolute bottom-[-6%] left-[38%] h-[55vw] max-h-[700px] w-[85vw] max-w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(13,148,136,0.32),rgba(13,148,136,0.08)_55%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-[90px] pt-36 md:pb-[130px] md:pt-44">
        {/* Текст */}
        <div className="flex flex-col items-start text-left md:items-center md:text-center">
          <h1 className="max-w-[920px] text-[36px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px] xl:text-[64px]">
            {WORDS.map((w, i) => (
              <React.Fragment key={w}>
                <Word i={i} still={reduce} className="bg-gradient-to-b from-white to-white/40">
                  {w}
                </Word>{" "}
              </React.Fragment>
            ))}
            <Word i={WORDS.length} still={reduce} className="bg-gradient-to-b from-[#c8ffe0] to-[#3fcf8e]">
              KBS
            </Word>
          </h1>

          <motion.p {...appear(TEXT_END)} className="mt-4 max-w-[620px] text-[15px] text-white/60 md:text-lg">
            Облік бюджетної установи і Бухгалтерія комунального підприємства. Робота в нашій хмарі.
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
              Програми KBS
              <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Два вікна: програма спереду, віддалений робочий стіл у хмарі позаду праворуч */}
        <div className="relative mx-auto mt-16 h-[250px] w-full max-w-[1040px] sm:h-[400px] md:mt-20 md:h-[540px]">
          {/* М'яке світло під вікнами */}
          <div aria-hidden="true" className="absolute inset-x-[10%] bottom-[-4%] h-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(63,207,142,0.28),transparent)]" />

          {/* Хмара: виїжджає з-за головного вікна */}
          <motion.div
            className="absolute right-0 top-0 w-[54%] overflow-hidden rounded-xl ring-1 ring-white/15"
            style={{
              transformPerspective: 2000,
              willChange: "transform, opacity",
              boxShadow: "0 40px 80px -24px rgba(0,0,0,0.7)",
            }}
            initial={reduce ? false : { opacity: 0, x: "-35%", z: -220, rotateY: 0 }}
            animate={ready ? { opacity: 1, x: "0%", z: -120, rotateY: -22 } : undefined}
            transition={{ duration: 1.5, delay: 1.35, ease }}
          >
            <Shot src="/main/BAS-img4.jpg" alt="KBS у хмарі: віддалений робочий стіл" onLoad={onLoad} className="aspect-[16/9] object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-[#0d0e15]/20" />
          </motion.div>

          {/* Програма: «встає» з горизонталі */}
          <motion.div
            className="absolute bottom-[4%] left-0 w-[74%] overflow-hidden rounded-xl bg-white ring-1 ring-white/20 md:left-[3%]"
            style={{
              transformPerspective: 2000,
              transformOrigin: "50% 100%",
              willChange: "transform, opacity",
              boxShadow: "0 50px 90px -24px rgba(0,0,0,0.75)",
            }}
            initial={reduce ? false : { opacity: 0, rotateX: 72, rotateY: 0, y: 40 }}
            animate={ready ? { opacity: 1, rotateX: 6, rotateY: 12, y: 0 } : undefined}
            transition={{
              opacity: { duration: 0.6, delay: 0.45 },
              default: { duration: 1.7, delay: 0.45, ease: rise },
            }}
          >
            <Shot src="/main/BAS-img2.jpg" alt="Програма KBS. Облік бюджетної установи" onLoad={onLoad} className="aspect-[1234/711] object-cover object-left-top" />
          </motion.div>
        </div>
      </div>

      {/* Плавний перехід у білу секцію програм */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[180px] md:h-[240px]"
        style={{ background: easedFade("#ffffff") }}
      />
      <div data-theme="light" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[100px]" />
    </section>
  );
};

export default KbsHero;
