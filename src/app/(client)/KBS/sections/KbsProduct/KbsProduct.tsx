"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  IconBuildingBank,
  IconCash,
  IconDatabase,
  IconFileAnalytics,
  IconReceiptTax,
} from "@tabler/icons-react";
import { KBS_FEATURES, KBS_PRODUCT, KbsFeature } from "../../kbsData";

import { edgeMask } from "@/lib/utils/gradients";
const icons: Record<KbsFeature["icon"], React.ElementType> = {
  treasury: IconBuildingBank,
  salary: IconCash,
  tax: IconReceiptTax,
  reports: IconFileAnalytics,
  backup: IconDatabase,
};

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const tileCls =
  "relative overflow-hidden rounded-[28px] bg-white/80 p-7 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)] ring-1 ring-black/5 backdrop-blur-xl";

const GREEN = "#22b07d";

// Ілюстрація обміну KBS ↔ Казначейство
const TreasuryVisual = () => (
  <div className="mt-8 flex items-center justify-center gap-4">
    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)] ring-1 ring-black/5">
      <img src="/main/KBS-logo.png" alt="" className="w-[70px]" />
    </div>
    <div className="flex w-20 flex-col gap-5">
      {[0, 1].map((row) => (
        <div key={row} className="relative h-1 rounded-full bg-black/10">
          <motion.span
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: GREEN }}
            animate={{ left: row === 0 ? ["0%", "88%"] : ["88%", "0%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: row * 0.8 }}
          />
        </div>
      ))}
    </div>
    <div
      className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
      style={{ color: GREEN }}
    >
      <IconBuildingBank size={48} stroke={1.4} />
    </div>
  </div>
);

const Feature = ({ f }: { f: KbsFeature }) => {
  const Icon = icons[f.icon];
  return (
    <motion.div variants={fadeUp} className={`${tileCls} group`}>
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${GREEN}1a`, color: GREEN }}
      >
        <Icon size={26} stroke={1.6} />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">{f.desc}</p>
    </motion.div>
  );
};

const KbsProduct = () => {
  const [treasury, ...rest] = KBS_FEATURES;
  const TreasuryIcon = icons[treasury.icon];

  return (
    <section
      id="product"
      data-theme="light"
      className="relative w-full overflow-hidden bg-white pb-14 pt-4 text-neutral-900 md:pb-16 md:pt-6"
    >
      {/* Зелене світло */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={edgeMask()}>
        <div className="absolute -left-40 top-24 h-[640px] w-[640px] rounded-full bg-[#84fab0] opacity-40 [-webkit-mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)] [mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)]" />
        <div className="absolute -right-40 top-[45%] h-[640px] w-[640px] rounded-full bg-[#8fd3f4] opacity-40 [-webkit-mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)] [mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-left text-4xl md:text-center md:text-6xl bg-gradient-to-b from-[#0b0b10] to-[#0b0b10]/50 bg-clip-text pb-[0.08em] font-semibold leading-[1.05] tracking-[-0.03em] text-transparent"
        >
          Про програму
        </motion.h2>

        {/* Бенто: назва, модуль Казначейства на всю висоту, можливості */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div
            variants={fadeUp}
            className={`${tileCls} md:col-span-2 lg:col-span-2`}
            style={{ background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" }}
          >
            <span className="flex h-10 w-fit items-center rounded-full bg-white px-3.5">
              <img src="/main/KBS-logo.png" alt="KBS" className="h-[20px] w-auto" />
            </span>
            <h3 className="mt-6 max-w-xl text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
              {KBS_PRODUCT.name}
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/65 md:text-base">
              {KBS_PRODUCT.description}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className={`${tileCls} flex flex-col lg:row-span-2`}>
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${GREEN}1a`, color: GREEN }}
            >
              <TreasuryIcon size={26} stroke={1.6} />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{treasury.title}</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">{treasury.desc}</p>
            <div className="flex flex-1 items-center justify-center">
              <TreasuryVisual />
            </div>
          </motion.div>

          {rest.map((f) => (
            <Feature key={f.id} f={f} />
          ))}

          <motion.button
            variants={fadeUp}
            type="button"
            onClick={() =>
              document.getElementById("application")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="group flex flex-col justify-between rounded-[28px] bg-[#0e0e14] p-7 text-left text-white"
          >
            <span className="text-lg font-semibold tracking-tight">Обговорити супровід KBS</span>
            <span className="mt-6 inline-flex items-center gap-2 text-[14px] text-white/60 transition-colors group-hover:text-white">
              До заявки
              <svg className="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default KbsProduct;
