"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// «Хто ми»: світла секція з пастельними плямами (а не просто білий фон).
// Ліворуч заголовок і вступ, праворуч чотири напрямки списком з іконками.
// Жодних рамок і «пігулок», щоб текст не виглядав як кнопки

type IconProps = { color: string };

const icon = (color: string) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

const Icons = {
  Apps: ({ color }: IconProps) => (
    <svg {...icon(color)}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4M7 9h4M7 12h7" />
    </svg>
  ),
  Puzzle: ({ color }: IconProps) => (
    <svg {...icon(color)}>
      <path d="M10 3h4v2.5a1.5 1.5 0 0 0 3 0V3h2a2 2 0 0 1 2 2v4h-2.5a1.5 1.5 0 0 0 0 3H21v7a2 2 0 0 1-2 2h-4v-2.5a1.5 1.5 0 0 0-3 0V21H5a2 2 0 0 1-2-2v-4h2.5a1.5 1.5 0 0 0 0-3H3V5a2 2 0 0 1 2-2h5z" />
    </svg>
  ),
  Cloud: ({ color }: IconProps) => (
    <svg {...icon(color)}>
      <path d="M7 18h10.5a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.4 9.1 4.5 4.5 0 0 0 7 18z" />
    </svg>
  ),
  Doc: ({ color }: IconProps) => (
    <svg {...icon(color)}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  ),
};

const ITEMS = [
  {
    title: "BAS і KBS",
    text: "Встановлюємо, оновлюємо і супроводжуємо програми, налаштовуємо конфігурації під облік компанії.",
    icon: Icons.Apps,
    color: "#0a8fd1",
  },
  {
    title: "Доробки",
    text: "Коли стандартних можливостей не вистачає: звіти, обробки, обмін даними з іншими сервісами.",
    icon: Icons.Puzzle,
    color: "#5b6fd6",
  },
  {
    title: "Хмара",
    text: "Сервери за кордоном, доступ 24/7 з будь-якого пристрою, щоденні резервні копії. У хмарі працюють не лише BAS і KBS, а й M.E.Doc, FREDO Звіт, Excel та інші програми.",
    icon: Icons.Cloud,
    color: "#b453d1",
  },
  {
    title: "Договір",
    text: "Перед підключенням обстежуємо робочі місця і конфігурації, далі працюємо за договором.",
    icon: Icons.Doc,
    color: "#e08a00",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const AboutText = () => {
  const reduce = !!useReducedMotion();
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.7, delay: i * 0.08, ease },
        };

  return (
    <section data-theme="light" className="relative overflow-hidden bg-white pb-16 pt-4 md:pb-20 md:pt-8">
      {/* Пастельні плями. Верх і низ лишаються білими, щоб переходи були плавними */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 140px, #000 calc(100% - 160px), transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0, #000 140px, #000 calc(100% - 160px), transparent 100%)",
        }}
      >
        <div className="absolute -left-[12%] top-[5%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(72,198,239,0.3),rgba(72,198,239,0.08)_60%,transparent)]" />
        <div className="absolute right-[-14%] top-[-5%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(213,126,235,0.28),rgba(213,126,235,0.07)_60%,transparent)]" />
        <div className="absolute bottom-[-10%] right-[15%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(253,186,116,0.3),rgba(253,186,116,0.07)_60%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] gap-10 px-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 lg:px-10">
        <div>
          <motion.h2
            {...rise(0)}
            className="bg-gradient-to-b from-neutral-900 to-neutral-500 bg-clip-text pb-[0.06em] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-transparent md:text-6xl"
          >
            Хто ми
          </motion.h2>
          <motion.p {...rise(1)} className="mt-5 max-w-md text-[19px] leading-snug text-neutral-700 md:text-[22px]">
            Команда, що працює з обліковими програмами BAS і KBS та надає хмару для їх роботи.
          </motion.p>
        </div>

        <ul className="divide-y divide-neutral-900/[0.08]">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.li key={it.title} {...rise(i + 1)} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${it.color} 18%, #ffffff), color-mix(in srgb, ${it.color} 7%, #ffffff))` }}
                >
                  <Icon color={it.color} />
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-neutral-900">{it.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-600 md:text-[16px]">{it.text}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default AboutText;
