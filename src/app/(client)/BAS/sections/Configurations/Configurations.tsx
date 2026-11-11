"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";
import { BAS_CONFIGS, BasConfig, ConfigVisual } from "../../basData";
import { AppWindow, Bar, ease, Fit } from "../shared/Illustration";

import { edgeMask } from "@/lib/utils/gradients";
import { Price } from "../Services/Services";
import { scrollToSection } from "@/lib/utils/scrollToSection";
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const scrollToApplication = (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToSection("application");
};

// Нахил пігулок, як у шапці та формі заявки
const tilts = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg"];

/* ─────────── Ілюстрації конфігурацій (полотно 480×340) ─────────── */

const VisualScreenshot = ({ c }: { c: BasConfig }) => (
  <motion.div
    className="absolute left-[30px] top-[36px] w-[420px]"
    initial={{ y: 24, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease }}
  >
    <AppWindow>
      <img src={c.image} alt={c.imageAlt ?? c.name} className="block w-full" decoding="async" />
    </AppWindow>
  </motion.div>
);

const VisualDashboard = ({ a }: { a: string }) => (
  <AppWindow className="absolute left-[40px] top-[40px] w-[400px]">
    <div className="p-5">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rounded-xl bg-neutral-50 p-3"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
          >
            <Bar w="60%" />
            <div className="mt-3 h-4 w-16 rounded-full" style={{ backgroundColor: i === 0 ? a : `${a}55` }} />
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 360 120" className="mt-4 h-[120px] w-full">
        <motion.path
          d="M0 100 C 40 92, 60 60, 100 70 S 160 30, 200 45 S 280 22, 360 10"
          fill="none"
          stroke={a}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  </AppWindow>
);

const VisualTrade = ({ a }: { a: string }) => (
  <AppWindow className="absolute left-[40px] top-[30px] w-[400px]">
    <div className="space-y-2.5 p-5">
      {[150, 110, 170, 130, 90].map((w, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-2"
          initial={{ x: -14, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease }}
        >
          <span className="h-7 w-7 rounded-lg" style={{ backgroundColor: `${a}40` }} />
          <Bar w={w} />
          <span className="ml-auto h-5 w-14 rounded-full" style={{ backgroundColor: a }} />
        </motion.div>
      ))}
    </div>
  </AppWindow>
);

const VisualFinance = ({ a }: { a: string }) => {
  // Сегменти кільцевої діаграми, сума 100
  const parts = [42, 26, 18, 14];
  const R = 60;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <AppWindow className="absolute left-[40px] top-[40px] w-[400px]">
      <div className="flex items-center gap-8 p-6">
        <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
          <circle cx="75" cy="75" r={R} fill="none" stroke="#f1f1f4" strokeWidth="22" />
          {parts.map((pct, i) => {
            const len = (pct / 100) * C;
            const el = (
              <motion.circle
                key={i}
                cx="75"
                cy="75"
                r={R}
                fill="none"
                stroke={a}
                strokeOpacity={1 - i * 0.22}
                strokeWidth="22"
                strokeDasharray={`${len - 3} ${C}`}
                strokeDashoffset={-offset}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="flex-1 space-y-3">
          {parts.map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: a, opacity: 1 - i * 0.22 }} />
              <Bar w={`${80 - i * 12}%`} />
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
};

const VisualPlanning = ({ a }: { a: string }) => (
  <AppWindow className="absolute left-[40px] top-[40px] w-[400px]">
    <div className="p-5">
      <div className="mb-3 grid grid-cols-6 gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-2 rounded-full bg-neutral-100" />
        ))}
      </div>
      {[
        [0, 40],
        [25, 35],
        [45, 30],
        [15, 50],
        [60, 40],
      ].map(([start, len], i) => (
        <div key={i} className="flex items-center gap-3 py-1.5">
          <Bar w={56} />
          <div className="relative h-6 flex-1">
            <motion.div
              className="absolute top-0 h-full origin-left rounded-md"
              style={{ left: `${start}%`, width: `${len}%`, backgroundColor: i % 2 ? `${a}88` : a }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease }}
            />
          </div>
        </div>
      ))}
    </div>
  </AppWindow>
);

const VisualDocs = ({ a }: { a: string }) => (
  <>
    <motion.div
      className="absolute left-[50px] top-[40px] h-[260px] w-[180px] rounded-lg bg-white p-4 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
      initial={{ y: 20, opacity: 0, rotate: -3 }}
      animate={{ y: 0, opacity: 1, rotate: -3 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="h-6 w-6 rounded-md" style={{ backgroundColor: a }} />
      <Bar w={110} className="mt-4 !h-3 !bg-neutral-300" />
      {[130, 120, 140, 90, 120, 100].map((w, i) => (
        <Bar key={i} w={w} className="mt-3 !h-2" />
      ))}
    </motion.div>
    <div className="absolute left-[270px] top-[50px] flex flex-col items-center">
      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <motion.span
              className="w-[3px] origin-top"
              style={{ height: 34, backgroundColor: `${a}66` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.35 }}
            />
          )}
          <motion.span
            className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_24px_-10px_rgba(0,0,0,0.4)]"
            initial={{ scale: 0.6, backgroundColor: "#d4d4d8" }}
            animate={{ scale: 1, backgroundColor: a }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.35 }}
          >
            <IconCheck size={26} stroke={3} />
          </motion.span>
        </React.Fragment>
      ))}
    </div>
  </>
);

const visuals: Record<ConfigVisual, React.ComponentType<{ a: string }>> = {
  dashboard: VisualDashboard,
  trade: VisualTrade,
  finance: VisualFinance,
  planning: VisualPlanning,
  docs: VisualDocs,
};

const ConfigVisualView = ({ c }: { c: BasConfig }) => {
  if (c.image) return <VisualScreenshot c={c} />;
  const V = c.visual ? visuals[c.visual] : null;
  return V ? <V a={c.gradient[1]} /> : null;
};

/* ─────────────────────────── Секція ─────────────────────────── */

type Props = {
  configs?: BasConfig[];
  product?: string; // назва в заголовку: «Конфігурації BAS»
  accentFrom?: string; // градієнт назви продукту в заголовку
  accentTo?: string;
  title?: React.ReactNode; // власний заголовок замість «Конфігурації …»
  id?: string; // якір секції
};

const Configurations = ({
  configs = BAS_CONFIGS,
  product = "BAS",
  accentFrom = "#3b9ae6",
  accentTo = "#00508c",
  title,
  id = "configurations",
}: Props) => {
  const [activeId, setActiveId] = useState(configs[0].id);
  const active = configs.find((c) => c.id === activeId) ?? configs[0];

  return (
    <section
      id={id}
      data-theme="light"
      className="relative w-full overflow-hidden bg-white pb-10 pt-4 text-neutral-900 md:pb-14 md:pt-6"
    >
      {/* Фон: кольорове світло обраної конфігурації */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={edgeMask()}>
        <motion.div
          className="absolute -left-40 top-24 h-[640px] w-[640px] rounded-full opacity-50 [-webkit-mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)] [mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)]"
          animate={{ backgroundColor: active.gradient[0] }}
          transition={{ duration: 0.9 }}
        />
        <motion.div
          className="absolute -right-40 top-[40%] h-[640px] w-[640px] rounded-full opacity-40 [-webkit-mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)] [mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)]"
          animate={{ backgroundColor: active.gradient[1] }}
          transition={{ duration: 0.9 }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-left text-4xl md:text-6xl bg-gradient-to-b from-[#0b0b10] to-[#0b0b10]/50 bg-clip-text pb-[0.08em] font-semibold leading-[1.05] tracking-[-0.03em] text-transparent"
        >
          {title ?? (<>Конфігурації{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to bottom, ${accentFrom}, ${accentTo})` }}
          >
            {product}
          </span></>)}
        </motion.h2>

        {/* ПК: перемикач стовпчиком зліва, картка праворуч.
            Телефон: перемикач горизонтальною стрічкою над карткою */}
        <div className="mt-8 grid gap-4 md:mt-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-8">
        {/* Перемикач: пігулки з нахилом і кольоровою рамкою, як у шапці */}
        <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-3 pt-2 [scrollbar-width:none] md:mx-0 md:px-0 lg:flex-col lg:items-start lg:gap-3.5 lg:overflow-visible lg:pb-0 lg:pt-3 [&::-webkit-scrollbar]:hidden">
          {configs.map((c, i) => {
            const on = c.id === activeId;
            const color = c.gradient[1];
            return (
              <motion.button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                aria-pressed={on}
                whileTap={{ scale: 0.95 }}
                style={{
                  rotate: tilts[i % tilts.length],
                  // Рамка інлайн: у globals.scss є button { border: none }
                  border: `1.5px solid ${color}`,
                  backgroundColor: on ? color : "rgba(255,255,255,0.75)",
                  boxShadow: on ? `0 12px 24px -10px ${color}` : "none",
                }}
                className="shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-neutral-900 backdrop-blur transition-colors duration-300"
              >
                {c.short ?? c.name.replace(`${product} `, "")}
              </motion.button>
            );
          })}
        </div>

        {/* Картка обраної конфігурації */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
              className="grid overflow-hidden rounded-[32px] bg-white/80 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] ring-1 ring-black/5 backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
            >
              <div className="order-2 flex flex-col justify-center p-7 md:p-9 lg:order-1">
                <h3 className="text-2xl font-semibold tracking-tight md:text-[28px] md:leading-tight">
                  {active.name}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 md:text-base">
                  {active.description}
                </p>
                {active.price && <Price text={active.price} />}
                <a
                  href="#application"
                  onClick={scrollToApplication}
                  className="group mt-8 inline-flex items-center text-[17px] font-semibold tracking-tight text-[#0066cc] transition-opacity hover:opacity-80"
                >
                  Обговорити впровадження
                  <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              {/* Ілюстрація завжди по центру панелі з однаковими відступами */}
              <div
                className="relative order-1 aspect-[16/10] lg:order-2 lg:aspect-auto lg:min-h-[320px] xl:min-h-[360px]"
                style={{
                  background: `linear-gradient(135deg, ${active.gradient[0]} 0%, ${active.gradient[1]} 100%)`,
                }}
              >
                <div className="absolute inset-0 p-5 md:p-8">
                  <Fit>
                    <ConfigVisualView c={active} />
                  </Fit>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Configurations;
