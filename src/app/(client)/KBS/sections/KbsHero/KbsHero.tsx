"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { IconBolt, IconCloud } from "@tabler/icons-react";
// Вікно з нахилом за курсором і стилі — ті самі, що на сторінці BAS
import { TiltWindow } from "./TiltWindow";
import { easedFade } from "@/lib/utils/gradients";
import styles from "../../../BAS/sections/BasHero/BasHero.module.scss";

const handleGlassMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--gx", `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
  el.style.setProperty("--gy", `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
};

const handleGlassLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.removeProperty("--gx");
  e.currentTarget.style.removeProperty("--gy");
};

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const chips = [
  { id: "power", icon: IconBolt, color: "#84fab0", title: "Автономне живлення", sub: "8–10 годин", pos: "left-[0%] top-[-2%] md:left-[2%]" },
  { id: "access", icon: IconCloud, color: "#8fd3f4", title: "Доступ до бази", sub: "24/7", pos: "right-[0%] bottom-[8%] md:right-[2%]" },
];

const KbsHero = () => (
  <section className={styles.section} data-theme="dark">
    {/* Плями в зелено-блакитних кольорах KBS */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -left-[8%] top-[2%] h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(closest-side,rgba(52,199,120,0.22),transparent)]" />
      <div className="absolute -right-[12%] top-[20%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,170,200,0.22),transparent)]" />
      <div className="absolute left-[15%] top-[45%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgba(0,122,255,0.2),transparent)]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-[220px] pt-36 md:pb-[260px] md:pt-44">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start text-left md:items-center md:text-center"
      >
        <motion.span variants={fadeUp} className="mb-6 flex h-9 items-center rounded-full bg-white px-3.5">
          <img src="/main/KBS-logo.png" alt="KBS" className="h-[20px] w-auto" />
        </motion.span>

        <motion.h1 variants={fadeUp} className="text-[36px] md:text-[56px] xl:text-[64px] bg-gradient-to-b from-white to-white/40 bg-clip-text pb-[0.08em] font-semibold leading-[1.05] tracking-[-0.03em] text-transparent">
          Супровід{" "}
          <span className="bg-gradient-to-b from-[#c8ffe0] to-[#3fcf8e] bg-clip-text text-transparent">
            KBS
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-4 text-[15px] text-white/55 md:text-lg">
          Облік бюджетної установи: встановлення, супровід і хмара.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 md:justify-center">
          <a
            href="#application"
            onClick={scrollTo("application")}
            className={styles.glassBtn}
            onPointerMove={handleGlassMove}
            onPointerLeave={handleGlassLeave}
          >
            <span>Отримати консультацію</span>
            <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#product"
            onClick={scrollTo("product")}
            className="group inline-flex items-center text-[15px] font-semibold text-white/75 transition-colors hover:text-white"
          >
            Про програму
            <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Скриншот програми «Облік бюджетної установи» */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-14 aspect-[16/11] w-full max-w-[1000px] md:mt-16 md:aspect-[16/10]"
      >
        <TiltWindow
          className="left-[4%] top-[6%] w-[92%] md:left-[6%] md:w-[88%]"
          style={{ transformPerspective: 1400 }}
          z={10}
          src="/main/BAS-img2.jpg"
          title="Облік бюджетної установи, версія 1.2"
          alt="Програма KBS. Облік бюджетної установи"
        />
        {chips.map((c) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.id}
              className={`${styles.chip} pointer-events-none ${c.pos}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, delay: c.id === "access" ? 1.4 : 0, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className={styles.chipIcon} style={{ background: c.color }}>
                <Icon size={18} stroke={2.4} />
              </span>
              <span className="flex flex-col text-left">
                <span className="text-[13px] font-semibold text-white">{c.title}</span>
                <span className="text-[12px] text-white/50">{c.sub}</span>
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>

    <div className={styles.fadeBottom} style={{ background: easedFade("#ffffff") }} aria-hidden="true" />
    <div data-theme="light" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[170px]" />
  </section>
);

export default KbsHero;
