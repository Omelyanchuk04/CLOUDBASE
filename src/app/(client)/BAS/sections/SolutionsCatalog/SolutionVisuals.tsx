"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IconArrowDownLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconArrowsLeftRight,
  IconBuildingBank,
  IconBuildingFactory2,
  IconGasStation,
  IconMail,
  IconPlus,
  IconPrinter,
  IconSearch,
  IconSum,
  IconTruck,
} from "@tabler/icons-react";
import { SolutionVisual } from "../../basData";
import { AppWindow, Bar, ease } from "../shared/Illustration";

// Схематичні ілюстрації рішень на полотні 480×340.
// a — колір категорії, play=false — статичний кадр для мініатюр
type V = { a: string; play: boolean };

const RED = "#e5484d";
const card = "shadow-[0_24px_50px_-20px_rgba(0,0,0,0.3)] ring-1 ring-black/5";

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Модулі ── */

const ROUTE = "M10 120 C 80 120, 90 30, 170 50 S 280 130, 350 24";

const Fleet = ({ a, play }: V) => (
  <AppWindow className="absolute left-[40px] top-[22px] w-[400px]">
    <div className="relative h-[170px]">
      <svg width="360" height="150" viewBox="0 0 360 150" className="absolute left-[20px] top-[10px]">
        <path d={ROUTE} fill="none" stroke="#eceef2" strokeWidth="10" strokeLinecap="round" />
        <motion.path
          d={ROUTE}
          fill="none"
          stroke={a}
          strokeWidth="4"
          strokeLinecap="round"
          initial={play ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <circle cx="10" cy="120" r="7" fill={a} />
        <circle cx="350" cy="24" r="7" fill="white" stroke={a} strokeWidth="4" />
      </svg>
      <motion.span
        className="absolute left-[20px] top-[10px] flex h-9 w-9 items-center justify-center rounded-full bg-white text-white shadow-md"
        style={{ offsetPath: `path("${ROUTE}")`, offsetRotate: "0deg", backgroundColor: a, marginLeft: -18, marginTop: -18 }}
        initial={play ? { offsetDistance: "0%" } : false}
        animate={{ offsetDistance: play ? "100%" : "55%" }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      >
        <IconTruck size={20} stroke={2} />
      </motion.span>
    </div>
    <div className="flex items-center gap-3 border-t border-neutral-100 px-5 py-4">
      <span style={{ color: a }}>
        <IconGasStation size={22} stroke={1.8} />
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: a, width: "62%" }}
          initial={play ? { scaleX: 0 } : false}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
        />
      </div>
      <Bar w={40} />
    </div>
  </AppWindow>
);

const Ttn = ({ a, play }: V) => (
  <>
    {[2, 1, 0].map((i) => (
      <motion.div
        key={i}
        className={`absolute h-[250px] w-[200px] rounded-md bg-white p-4 ${card}`}
        style={{ left: 120 + i * 34, top: 40 + i * 12, zIndex: 3 - i }}
        initial={play ? { y: -30, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1, rotate: (i - 1) * 3 }}
        transition={{ duration: 0.5, delay: (2 - i) * 0.12, ease }}
      >
        <div className="flex items-center justify-between">
          <Bar w={70} className="!h-3 !bg-neutral-300" />
          <div className="h-5 w-5 rounded" style={{ backgroundColor: i === 0 ? a : `${a}55` }} />
        </div>
        <div className="mt-4 overflow-hidden rounded border border-neutral-200">
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className={`flex gap-2 px-2 py-1.5 ${r ? "border-t border-neutral-100" : ""}`} style={r === 0 ? { backgroundColor: `${a}22` } : undefined}>
              <Bar w={60} className="!h-2" />
              <Bar w={26} className="ml-auto !h-2" />
            </div>
          ))}
        </div>
        <Bar w={120} className="mt-4 !h-2" />
        <Bar w={90} className="mt-2 !h-2" />
      </motion.div>
    ))}
    <motion.span
      className={`absolute left-[70px] top-[200px] flex h-14 w-14 items-center justify-center rounded-2xl bg-white ${card}`}
      style={{ color: a }}
      initial={play ? { scale: 0.6, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.5 }}
    >
      <IconPrinter size={28} stroke={1.7} />
    </motion.span>
  </>
);

const STRIPES = [2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2];

const Scan = ({ a, play }: V) => (
  <motion.div
    className={`absolute left-[110px] top-[60px] w-[260px] rounded-2xl bg-white p-5 ${card}`}
    initial={play ? { y: 20, opacity: 0 } : false}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease }}
  >
    <div className="mb-2 h-1.5 w-12 rounded-full" style={{ backgroundColor: a }} />
    <Bar w={170} className="!h-3 !bg-neutral-300" />
    <Bar w={110} className="mt-2" />
    <div className="relative mt-5 flex h-20 items-stretch gap-[3px] overflow-hidden">
      {STRIPES.map((w, i) => (
        <span key={i} className="bg-neutral-800" style={{ width: w * 2.5 }} />
      ))}
      <motion.span
        className="absolute inset-x-[-10px] h-[3px] rounded-full"
        style={{ backgroundColor: RED, boxShadow: `0 0 12px 2px ${RED}` }}
        initial={{ top: play ? "0%" : "50%" }}
        animate={play ? { top: ["5%", "92%", "5%"] } : { top: "50%" }}
        transition={play ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : undefined}
      />
    </div>
  </motion.div>
);

/* ── Обробки ── */

const Processing = ({ a, play }: V) => (
  <AppWindow className="absolute left-[60px] top-[30px] w-[360px]">
    <div className="space-y-3 p-5">
      {[150, 120, 170, 100, 140].map((w, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-2.5">
          <motion.span
            className="flex h-5 w-5 items-center justify-center rounded-md text-white"
            initial={play ? { backgroundColor: "#e5e5e5" } : false}
            animate={{ backgroundColor: a }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.25 }}
          >
            <Check />
          </motion.span>
          <Bar w={w} />
          <Bar w={36} className="ml-auto" />
        </div>
      ))}
      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: a }}
          initial={play ? { scaleX: 0 } : false}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  </AppWindow>
);

const Mail = ({ a, play }: V) => (
  <>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={`absolute h-[110px] w-[86px] rounded-md bg-white p-2.5 ${card}`}
        style={{ left: 50 + i * 26, top: 70 + i * 26 }}
        initial={play ? { opacity: 0, x: -20 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1, ease }}
      >
        <span className="inline-block rounded px-1 text-[9px] font-bold text-white" style={{ backgroundColor: RED }}>
          PDF
        </span>
        <Bar w="90%" className="mt-2 !h-1.5" />
        <Bar w="70%" className="mt-1.5 !h-1.5" />
        <Bar w="80%" className="mt-1.5 !h-1.5" />
      </motion.div>
    ))}
    <motion.span
      className="absolute left-[240px] top-[150px] text-neutral-300"
      initial={play ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <IconArrowRight size={36} stroke={2} />
    </motion.span>
    <motion.div
      className={`absolute left-[300px] top-[110px] flex h-[120px] w-[130px] items-center justify-center rounded-3xl bg-white ${card}`}
      style={{ color: a }}
      initial={play ? { scale: 0.7, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.5 }}
    >
      <IconMail size={60} stroke={1.4} />
      <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: a }}>
        3
      </span>
    </motion.div>
  </>
);

const Production = ({ a, play }: V) => (
  <>
    <div className="absolute left-[50px] top-[80px] grid grid-cols-2 gap-3">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className={`h-[70px] w-[70px] rounded-2xl bg-white ${card}`}
          initial={play ? { opacity: 0, scale: 0.7 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: i * 0.08 }}
        >
          <span className="m-3 block h-4 w-4 rounded" style={{ backgroundColor: `${a}${["ff", "aa", "77", "55"][i]}` }} />
          <Bar w={40} className="mx-3 !h-2" />
        </motion.span>
      ))}
    </div>
    <motion.span
      className="absolute left-[226px] top-[150px] text-neutral-300"
      initial={play ? { x: -10, opacity: 0 } : false}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <IconArrowRight size={36} stroke={2} />
    </motion.span>
    <motion.div
      className={`absolute left-[290px] top-[90px] flex h-[160px] w-[150px] flex-col items-center justify-center rounded-3xl bg-white ${card}`}
      style={{ color: a }}
      initial={play ? { scale: 0.7, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.55 }}
    >
      <IconBuildingFactory2 size={58} stroke={1.4} />
      <Bar w={80} className="mt-4" />
    </motion.div>
  </>
);

const CheckRows = ({ a, play }: V) => (
  <>
    <AppWindow className="absolute left-[40px] top-[26px] w-[400px]">
      <div className="space-y-2 p-5">
        {[0, 1, 2, 3, 4].map((i) => {
          const bad = i === 2;
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3 rounded-lg px-3 py-2"
              initial={play ? { backgroundColor: "#fafafa" } : false}
              animate={{ backgroundColor: bad ? "#fdecec" : "#fafafa" }}
              transition={{ delay: bad ? 0.9 : 0, duration: 0.3 }}
            >
              <Bar w={120} />
              <Bar w={50} className="ml-auto" />
              <span
                className="w-12 rounded-full py-0.5 text-center text-[11px] font-bold"
                style={bad ? { backgroundColor: RED, color: "#fff" } : { backgroundColor: `${a}22`, color: a }}
              >
                {bad ? "−4" : "12"}
              </span>
            </motion.div>
          );
        })}
      </div>
    </AppWindow>
    <motion.span
      className={`absolute flex h-16 w-16 items-center justify-center rounded-full bg-white ${card}`}
      style={{ color: a }}
      initial={play ? { left: 330, top: 60 } : false}
      animate={{ left: 250, top: 150 }}
      transition={{ duration: 0.9, ease }}
    >
      <IconSearch size={30} stroke={2} />
    </motion.span>
  </>
);

const Merge = ({ a, play }: V) => (
  <>
    <div className="absolute left-[40px] top-[60px] grid grid-cols-3 gap-2.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.span
          key={i}
          className={`h-[62px] w-[50px] rounded-md bg-white p-2 ${card}`}
          initial={play ? { opacity: 0, y: -10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <Bar w="100%" className="!h-1.5" />
          <Bar w="70%" className="mt-1.5 !h-1.5" />
          <Bar w="50%" className="mt-1.5 !h-1.5" />
        </motion.span>
      ))}
    </div>
    <motion.span
      className="absolute left-[232px] top-[148px] text-neutral-300"
      initial={play ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <IconArrowRight size={36} stroke={2} />
    </motion.span>
    <motion.div
      className={`absolute left-[290px] top-[60px] h-[230px] w-[160px] rounded-md bg-white p-4 ${card}`}
      initial={play ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.6 }}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: a }}>
        <IconSum size={24} stroke={2.2} />
      </span>
      {[110, 90, 120, 70, 100].map((w, i) => (
        <Bar key={i} w={w} className="mt-3 !h-2" />
      ))}
    </motion.div>
  </>
);

/* ── Звіти ── */

const Settlements = ({ a, play }: V) => (
  <AppWindow className="absolute left-[40px] top-[30px] w-[400px]">
    <div className="p-5">
      <div className="mb-3 flex gap-3 px-3">
        <Bar w={110} className="!bg-neutral-300" />
        <span className="ml-auto h-2.5 w-14 rounded-full" style={{ backgroundColor: `${a}66` }} />
        <span className="h-2.5 w-14 rounded-full bg-neutral-300" />
      </div>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="flex items-center gap-3 border-t border-neutral-100 px-3 py-2.5"
          initial={play ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 + i * 0.08 }}
        >
          <Bar w={100 + (i % 2) * 30} />
          <Bar w={56} className="ml-auto" />
          {i === 1 ? (
            <span className="w-14 rounded-full py-0.5 text-center text-[10px] font-bold text-white" style={{ backgroundColor: RED }}>
              !
            </span>
          ) : (
            <Bar w={56} />
          )}
        </motion.div>
      ))}
    </div>
  </AppWindow>
);

const Margin = ({ a, play }: V) => (
  <AppWindow className="absolute left-[40px] top-[30px] w-[400px]">
    <div className="p-5">
      <div className="flex h-[200px] items-end gap-4 border-b border-neutral-100 pb-1">
        {[
          [60, 25],
          [70, 35],
          [50, 20],
          [80, 40],
          [65, 30],
          [75, 45],
        ].map(([cost, margin], i) => (
          <div key={i} className="flex flex-1 flex-col justify-end">
            <motion.div
              className="origin-bottom rounded-t-md"
              style={{ height: margin * 1.6, backgroundColor: a }}
              initial={play ? { scaleY: 0 } : false}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease }}
            />
            <motion.div
              className="origin-bottom bg-neutral-200"
              style={{ height: cost * 1.6 }}
              initial={play ? { scaleY: 0 } : false}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-5">
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-neutral-200" /><Bar w={50} /></span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm" style={{ backgroundColor: a }} /><Bar w={50} /></span>
      </div>
    </div>
  </AppWindow>
);

const Line = ({ a, play }: V) => (
  <AppWindow className="absolute left-[40px] top-[30px] w-[400px]">
    <div className="p-5">
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 rounded-xl bg-neutral-50 p-3">
            <Bar w="60%" />
            <div className="mt-2 h-3 w-14 rounded-full" style={{ backgroundColor: i === 0 ? a : `${a}55` }} />
          </div>
        ))}
      </div>
      <svg viewBox="0 0 360 140" className="mt-4 h-[140px] w-full">
        <defs>
          <linearGradient id="sales-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={a} stopOpacity="0.3" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 120 C 40 110, 70 70, 110 80 S 170 40, 210 55 S 290 20, 360 12 L 360 140 L 0 140 Z"
          fill="url(#sales-fill)"
          initial={play ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
        <motion.path
          d="M0 120 C 40 110, 70 70, 110 80 S 170 40, 210 55 S 290 20, 360 12"
          fill="none"
          stroke={a}
          strokeWidth="4"
          strokeLinecap="round"
          initial={play ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  </AppWindow>
);

const Donut = ({ a, play }: V) => {
  const R = 64;
  const C = 2 * Math.PI * R;
  const goods = 0.62;
  return (
    <AppWindow className="absolute left-[40px] top-[40px] w-[400px]">
      <div className="flex items-center gap-8 p-6">
        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
          <circle cx="80" cy="80" r={R} fill="none" stroke="#f1f1f4" strokeWidth="24" />
          <motion.circle
            cx="80" cy="80" r={R} fill="none" stroke={a} strokeWidth="24"
            strokeDasharray={`${goods * C - 4} ${C}`}
            initial={play ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          />
          <motion.circle
            cx="80" cy="80" r={R} fill="none" stroke={a} strokeOpacity={0.4} strokeWidth="24"
            strokeDasharray={`${(1 - goods) * C - 4} ${C}`} strokeDashoffset={-goods * C}
            initial={play ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
          />
        </svg>
        <div className="flex-1 space-y-4">
          {[1, 0.4].map((o, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: a, opacity: o }} />
              <Bar w={i ? "55%" : "75%"} />
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
};

const Stock = ({ a, play }: V) => {
  const rows = [
    { icon: IconArrowDownLeft, color: a },
    { icon: IconArrowsLeftRight, color: "#8a8f98" },
    { icon: IconArrowUpRight, color: RED },
    { icon: IconArrowDownLeft, color: a },
  ];
  return (
    <AppWindow className="absolute left-[40px] top-[30px] w-[400px]">
      <div className="space-y-2.5 p-5">
        {rows.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-2"
              initial={play ? { x: -12, opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: `${r.color}22`, color: r.color }}>
                <Icon size={16} stroke={2.4} />
              </span>
              <Bar w={130} />
              <Bar w={44} className="ml-auto" />
            </motion.div>
          );
        })}
        <div className="flex items-center gap-3 border-t border-neutral-100 px-3 pt-3">
          <Bar w={80} className="!bg-neutral-300" />
          <span className="ml-auto h-3 w-16 rounded-full" style={{ backgroundColor: a }} />
        </div>
      </div>
    </AppWindow>
  );
};

/* ── Під замовлення ── */

const Report = ({ a, play }: V) => (
  <AppWindow className="absolute left-[40px] top-[30px] w-[400px]">
    <div className="p-5">
      <div className="flex items-center justify-between">
        <Bar w={140} className="!h-3 !bg-neutral-300" />
        <Bar w={60} />
      </div>
      <div className="mt-5 flex h-[110px] items-end gap-3 border-b border-neutral-100 pb-1">
        {[45, 70, 55, 90, 65, 100, 80].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 origin-bottom rounded-t-md"
            style={{ height: `${h}%`, backgroundColor: i === 5 ? a : `${a}55` }}
            initial={play ? { scaleY: 0 } : false}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease }}
          />
        ))}
      </div>
      <div className="mt-4 space-y-2.5">
        {[0, 1, 2].map((r) => (
          <div key={r} className="flex items-center gap-4">
            <Bar w={110} />
            <Bar w={70} />
            <Bar w={50} className="ml-auto" />
          </div>
        ))}
      </div>
    </div>
  </AppWindow>
);

const Features = ({ a, play }: V) => (
  <AppWindow className="absolute left-[50px] top-[30px] w-[380px]">
    <div className="grid grid-cols-3 gap-3 p-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-xl bg-neutral-50 p-3">
          <div className="mb-3 h-7 w-7 rounded-lg bg-neutral-200" />
          <Bar w="80%" />
          <Bar w="50%" className="mt-2" />
        </div>
      ))}
      <motion.div
        className="flex items-center justify-center rounded-xl border-2 border-dashed"
        style={{ borderColor: a, color: a, backgroundColor: `${a}12` }}
        initial={play ? { scale: 0.6, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 }}
      >
        <IconPlus size={30} stroke={2.2} />
      </motion.div>
    </div>
  </AppWindow>
);

const Forms = ({ a, play }: V) => (
  <motion.div
    className={`absolute left-[130px] top-[14px] h-[312px] w-[220px] rounded-md bg-white p-5 ${card}`}
    initial={play ? { y: 30, opacity: 0, rotate: -2 } : false}
    animate={{ y: 0, opacity: 1, rotate: 0 }}
    transition={{ duration: 0.6, ease }}
  >
    <div className="flex items-center justify-between">
      <div className="h-8 w-8 rounded-md" style={{ backgroundColor: a }} />
      <Bar w={60} />
    </div>
    <Bar w={120} className="mx-auto mt-5 !h-3 !bg-neutral-300" />
    <div className="mt-5 overflow-hidden rounded border border-neutral-200">
      {[0, 1, 2, 3, 4].map((r) => (
        <div key={r} className={`flex gap-2 px-2 py-1.5 ${r ? "border-t border-neutral-100" : ""}`} style={r === 0 ? { backgroundColor: `${a}22` } : undefined}>
          <Bar w={70} className="!h-2" />
          <Bar w={30} className="ml-auto !h-2" />
          <Bar w={30} className="!h-2" />
        </div>
      ))}
    </div>
    <div className="mt-6 flex justify-between">
      <div className="h-px w-16 bg-neutral-300" />
      <div className="h-px w-16 bg-neutral-300" />
    </div>
  </motion.div>
);

const Bank = ({ a, play }: V) => (
  <div className="absolute inset-0 flex items-center justify-center gap-6">
    <div className={`flex h-[130px] w-[130px] items-center justify-center rounded-3xl bg-white ${card}`}>
      <img src="/main/BAS-logo.png" alt="" className="w-[90px]" />
    </div>
    <div className="relative flex w-[110px] flex-col gap-6">
      {[0, 1].map((row) => (
        <div key={row} className="relative h-1 rounded-full bg-neutral-200">
          <motion.span
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: a }}
            initial={{ left: row === 0 ? "0%" : "100%" }}
            animate={play ? { left: row === 0 ? ["0%", "92%"] : ["92%", "0%"] } : { left: "46%" }}
            transition={play ? { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: row * 0.8 } : undefined}
          />
        </div>
      ))}
    </div>
    <div className={`flex h-[130px] w-[130px] items-center justify-center rounded-3xl bg-white ${card}`} style={{ color: a }}>
      <IconBuildingBank size={64} stroke={1.4} />
    </div>
  </div>
);

export const SOLUTION_VISUALS: Record<SolutionVisual, React.ComponentType<V>> = {
  fleet: Fleet,
  ttn: Ttn,
  scan: Scan,
  mail: Mail,
  production: Production,
  check: CheckRows,
  merge: Merge,
  processing: Processing,
  settlements: Settlements,
  margin: Margin,
  line: Line,
  donut: Donut,
  stock: Stock,
  report: Report,
  features: Features,
  forms: Forms,
  bank: Bank,
};
