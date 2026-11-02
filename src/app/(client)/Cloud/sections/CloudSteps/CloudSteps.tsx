"use client";

import { motion, Variants } from "framer-motion";
import { edgeMask } from "@/lib/utils/gradients";
import { CLOUD_STEPS } from "../../cloudData";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Кольори кроків — з градієнтів тарифів
const colors = [
  ["#fccb90", "#d57eeb"],
  ["#e0c3fc", "#8ec5fc"],
  ["#c2e9fb", "#a18cd1"],
];

const CloudSteps = () => (
  <section id="steps" data-theme="light" className="relative w-full overflow-hidden bg-white pb-6 pt-4 text-neutral-900 md:pb-10">
    {/* Фон: м'яке світло без різких країв */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={edgeMask()}>
      <div className="absolute -left-40 top-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(252,203,144,0.35),transparent)]" />
      <div className="absolute -right-40 top-[30%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(161,140,209,0.3),transparent)]" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-10">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="bg-gradient-to-b from-[#0b0b10] to-[#0b0b10]/50 bg-clip-text pb-[0.08em] text-left text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-transparent md:text-6xl"
      >
        Як почати
      </motion.h2>

      <motion.ol
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3"
      >
        {CLOUD_STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            variants={fadeUp}
            className="relative overflow-hidden rounded-[28px] bg-white/80 p-7 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.25)] ring-1 ring-black/5 backdrop-blur-xl md:p-8"
          >
            {/* Смужка кольору кроку */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ background: `linear-gradient(90deg, ${colors[i][0]}, ${colors[i][1]})` }}
            />
            <span
              className="inline-flex rounded-full px-3 py-1 text-[13px] font-semibold text-[#0b0b10]"
              style={{ background: `linear-gradient(135deg, ${colors[i][0]}, ${colors[i][1]})` }}
            >
              Крок {i + 1}
            </span>
            <h3 className="mt-5 text-[26px] font-bold leading-tight tracking-[-0.03em]">{s.title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-neutral-600">{s.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  </section>
);

export default CloudSteps;
