"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Сцена для hero «Хмара»: серверна стійка по центру, до неї підключені
// робочі місця BAS, KBS та інших програм. По лініях біжать імпульси даних,
// індикатори на юнітах повільно мерехтять. Рухаються лише transform, opacity
// і stroke-dashoffset. Малюємо на полотні фіксованого розміру і масштабуємо

const ease = [0.16, 1, 0.3, 1] as const;

const H = 500;
const UNITS = 6;

// Робочі місця: монітор з BAS, ноутбук з KBS, монітор з іншими програмами
type Client = {
  id: string;
  title: string;
  color: string; // колір лінії і імпульсу
  side: "left" | "right";
  y: number;
  device: "monitor" | "laptop";
  logo?: string;
};

const CLIENTS: Client[] = [
  { id: "bas", title: "BAS", color: "#3b8fe0", side: "left", y: 40, device: "monitor", logo: "/main/BAS-logo.png" },
  { id: "kbs", title: "KBS", color: "#3fcf8e", side: "left", y: 290, device: "laptop", logo: "/main/KBS-logo.png" },
  { id: "other", title: "Інші програми", color: "#d57eeb", side: "right", y: 160, device: "monitor" },
];

// Плитки «інших програм» на екрані
const TILES = ["#8ec5fc", "#fccb90", "#d57eeb", "#84fab0", "#fde68a", "#a18cd1"];

const SCREEN_RATIO = 0.62;

// Масштаб полотна під ширину контейнера
const useScale = (w: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return { ref, scale };
};

const Unit = ({ i, play, vents }: { i: number; play: boolean; vents: number }) => (
  <div className="flex h-[52px] items-center gap-3 rounded-[10px] bg-gradient-to-b from-[#252532] to-[#191922] px-3.5 ring-1 ring-white/[0.07]">
    {/* Індикатори */}
    <div className="flex flex-col gap-1.5">
      {["#4ade80", i % 2 ? "#d57eeb" : "#48c6ef"].map((c, k) => (
        <motion.span
          key={k}
          className="block h-[6px] w-[6px] rounded-full"
          style={{ backgroundColor: c, boxShadow: `0 0 8px ${c}` }}
          animate={play ? { opacity: [1, 0.35, 1] } : undefined}
          transition={{ duration: 2.4 + ((i + k) % 3) * 0.7, delay: (i * 0.37 + k * 0.6) % 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
    {/* Вентиляційні прорізи */}
    <div className="flex gap-[5px]">
      {Array.from({ length: vents }).map((_, k) => (
        <span key={k} className="block h-[22px] w-[3px] rounded-full bg-white/[0.08]" />
      ))}
    </div>
    {/* Навантаження */}
    <div className="ml-auto h-[5px] w-[46px] overflow-hidden rounded-full bg-white/[0.08]">
      <motion.span
        className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-[#8ec5fc] to-[#d57eeb]"
        initial={{ scaleX: 0.3 + ((i * 0.23) % 0.5) }}
        animate={play ? { scaleX: [0.3 + ((i * 0.23) % 0.5), 0.85 - ((i * 0.17) % 0.4), 0.3 + ((i * 0.23) % 0.5)] } : undefined}
        transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  </div>
);

// Екран пристрою: логотип програми або плитки інших програм
const Screen = ({ c, w }: { c: Client; w: number }) => (
  <div
    className="rounded-[12px] bg-gradient-to-b from-[#26262f] to-[#17171e] p-[6px] ring-1 ring-white/[0.14]"
    style={{ width: w, height: w * SCREEN_RATIO, boxShadow: "0 30px 60px -28px rgba(0,0,0,0.85)" }}
  >
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[7px] bg-gradient-to-b from-white to-[#eef0f4]">
      {c.logo ? (
        <img src={c.logo} alt={c.title} className="h-auto w-[58%]" draggable={false} />
      ) : (
        <div className="grid grid-cols-3 gap-2.5">
          {TILES.map((t) => (
            <span
              key={t}
              className="block h-[30px] w-[30px] rounded-[9px]"
              style={{ background: `linear-gradient(135deg, ${t}, ${t}99)` }}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

const Device = ({ c, x, w, delay, reduce }: { c: Client; x: number; w: number; delay: number; reduce: boolean }) => (
  <motion.div
    className="absolute flex flex-col items-center"
    style={{ left: x, top: c.y, width: w }}
    initial={reduce ? false : { opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay, ease }}
  >
    {c.device === "monitor" ? (
      <>
        <Screen c={c} w={w} />
        {/* Ніжка і підставка */}
        <span className="block h-[16px] w-[14px] bg-gradient-to-b from-[#2a2a33] to-[#1c1c24]" />
        <span className="block h-[6px] w-[78px] rounded-full bg-[#2a2a33] ring-1 ring-white/[0.08]" />
      </>
    ) : (
      <>
        <Screen c={c} w={w * 0.9} />
        {/* Корпус ноутбука */}
        <span
          className="block h-[9px] rounded-b-[10px] rounded-t-[2px] bg-gradient-to-b from-[#34343e] to-[#1f1f27] ring-1 ring-white/[0.08]"
          style={{ width: w * 1.04 }}
        />
      </>
    )}
    <span className="mt-3 text-[15px] font-semibold text-white/60">{c.title}</span>
  </motion.div>
);

const ServerScene = ({ reduce, ready }: { reduce: boolean; ready: boolean }) => {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const W = narrow ? 640 : 1000;
  const CARD_W = narrow ? 200 : 220;
  const RACK_W = narrow ? 196 : 240;
  const { ref, scale } = useScale(W);
  const play = ready && !reduce;

  const rackX = (W - RACK_W) / 2;
  const rackTop = 40;
  const rackH = UNITS * 52 + (UNITS - 1) * 10 + 28;

  // Лінії від карток до стійки
  const lines = CLIENTS.map((c) => {
    // Лінія виходить із середини екрана
    const sw = c.device === "laptop" ? CARD_W * 0.9 : CARD_W;
    const cy = c.y + (sw * SCREEN_RATIO) / 2;
    const inset = (CARD_W - sw) / 2;
    const sx = c.side === "left" ? 16 + CARD_W - inset : W - 16 - CARD_W + inset;
    const ex = c.side === "left" ? rackX : rackX + RACK_W;
    const ey = Math.min(Math.max(cy, rackTop + 40), rackTop + rackH - 40);
    const mx = (sx + ex) / 2;
    return { id: c.id, color: c.color, d: `M${sx} ${cy} C ${mx} ${cy}, ${mx} ${ey}, ${ex} ${ey}` };
  });

  return (
    <div ref={ref} className="relative w-full" style={{ height: H * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {/* Світло за стійкою */}
        <div
          aria-hidden="true"
          className="absolute rounded-full bg-[radial-gradient(closest-side,rgba(142,197,252,0.22),rgba(213,126,235,0.12)_50%,transparent)]"
          style={{ left: W / 2 - 300, top: -40, width: 600, height: 580 }}
        />

        {/* Лінії з'єднань і імпульси */}
        <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
          {lines.map((l, i) => (
            <g key={l.id}>
              <motion.path
                d={l.d}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={1.5}
                initial={reduce ? false : { pathLength: 0 }}
                animate={ready ? { pathLength: 1 } : undefined}
                transition={{ duration: 1, delay: 1.1 + i * 0.15, ease: "easeInOut" }}
              />
              {play && (
                <motion.path
                  d={l.d}
                  stroke={l.color}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray="36 600"
                  style={{ filter: `drop-shadow(0 0 4px ${l.color})` }}
                  initial={{ strokeDashoffset: 636, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 1 }}
                  transition={{
                    strokeDashoffset: { duration: 2.6, delay: 2.2 + i * 0.7, repeat: Infinity, repeatDelay: 0.8, ease: "linear" },
                    opacity: { duration: 0.3, delay: 2.2 + i * 0.7 },
                  }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* Серверна стійка */}
        <motion.div
          className="absolute rounded-[22px] bg-gradient-to-b from-[#1b1b27] to-[#101018] p-3.5 ring-1 ring-white/[0.12]"
          style={{ left: rackX, top: rackTop, width: RACK_W, boxShadow: "0 50px 90px -30px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.08)" }}
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.3, delay: 0.5, ease }}
        >
          <div className="space-y-2.5">
            {Array.from({ length: UNITS }).map((_, i) => (
              <Unit key={i} i={i} play={play} vents={narrow ? 5 : 9} />
            ))}
          </div>
        </motion.div>

        {/* Робочі місця */}
        {CLIENTS.map((c, i) => (
          <Device
            key={c.id}
            c={c}
            w={CARD_W}
            x={c.side === "left" ? 16 : W - 16 - CARD_W}
            delay={0.9 + i * 0.15}
            reduce={reduce}
          />
        ))}
      </div>
    </div>
  );
};

export default ServerScene;
