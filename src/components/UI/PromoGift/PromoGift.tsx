"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { scrollToSection } from "@/lib/utils/scrollToSection";

// Акція: при підключенні від одного робочого місця в хмарі — одна доробка
// з каталогу на вибір у подарунок на рік. Світла секція з карткою в градієнтній рамці.
// Використовується на сторінках BAS (перед каталогом доробок) і Хмара (після тарифів)

const ease = [0.22, 1, 0.36, 1] as const;

const GiftIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
  </svg>
);

// Кроки: кожен свого спокійного кольору
// Святковий декор до Дня Святого Миколая (6 грудня) і зимових свят:
// повільний сніг усередині картки. Показується з 1 листопада по 15 січня, потім зникає сам
const isWinterSeason = () => {
  const d = new Date();
  const m = d.getMonth(); // 0 — січень
  return m === 10 || m === 11 || (m === 0 && d.getDate() <= 15);
};

// Сніжинки з фіксованими позиціями (без Math.random, щоб не було розбіжностей під час гідрації)
const FLAKES = [
  { x: 4, s: 10, d: 0, t: 14 }, { x: 11, s: 7, d: 3, t: 11 }, { x: 19, s: 12, d: 6, t: 16 },
  { x: 27, s: 8, d: 1.5, t: 12 }, { x: 36, s: 6, d: 8, t: 10 }, { x: 44, s: 11, d: 4, t: 15 },
  { x: 52, s: 7, d: 9.5, t: 12 }, { x: 60, s: 9, d: 2, t: 13 }, { x: 68, s: 6, d: 6.5, t: 10 },
  { x: 76, s: 12, d: 0.8, t: 17 }, { x: 84, s: 8, d: 5, t: 12 }, { x: 92, s: 10, d: 7.5, t: 14 },
  { x: 97, s: 6, d: 3.5, t: 11 },
];

const Snowflake = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 2 3-2M9 20l3-2 3 2" />
  </svg>
);

const Snow = ({ still }: { still: boolean }) => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Легкий морозний відтінок зверху картки */}
    <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(173,214,245,0.35),transparent)]" />
    {FLAKES.map((f, i) => (
      <motion.span
        key={i}
        className="absolute top-0 text-[#5fa8de]"
        style={{ left: `${f.x}%`, opacity: 0.7 }}
        initial={{ y: still ? 40 + i * 30 : -30 }}
        animate={still ? undefined : { y: 620, x: [0, 12, -8, 0], rotate: 180 }}
        transition={{ duration: f.t, delay: f.d, repeat: Infinity, ease: "linear" }}
      >
        <Snowflake size={Math.round(f.s * 1.7)} />
      </motion.span>
    ))}
  </div>
);

// Святкові значки для кроків (у сезон замість номерів)
const Bauble = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="10" y="2.5" width="4" height="3" rx="1" />
    <circle cx="12" cy="14" r="8" />
    <path d="M5 12.5c2.3 1.4 4.6 2 7 2s4.7-.6 7-2" />
  </svg>
);
const GiftSmall = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5" />
  </svg>
);
const Star = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 2.8 2.8 5.7 6.3.9-4.55 4.43 1.07 6.27L12 17.15 6.38 20.1l1.07-6.27L2.9 9.4l6.3-.9z" />
  </svg>
);
const FESTIVE_ICONS = [Bauble, GiftSmall, Star];

const STEPS = [
  { n: "01", title: "Підключаєте хмару", text: "Від одного робочого місця в хмарі CloudBASE", color: "#2f86d6" },
  { n: "02", title: "Обираєте доробку для BAS", text: "Будь-яку з каталогу: модуль, обробку, звіт чи друковану форму", color: "#1f9d68" },
  { n: "03", title: "Користуєтеся рік безкоштовно", text: "12 місяців без доплат", color: "#d9800b" },
];

// bg: колір фону секції, щоб не було шва із сусідніми секціями (на головній #ebebf0)
const PromoGift = ({ bg = "#ffffff" }: { bg?: string }) => {
  const reduce = !!useReducedMotion();
  const pathname = usePathname();
  const catalogHere = pathname.toLowerCase() === "/bas";
  // Сезон рахуємо лише в браузері, щоб не було розбіжностей з серверним HTML
  const [festive, setFestive] = React.useState(false);
  React.useEffect(() => setFestive(isWinterSeason()), []);

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 0.7, delay: i * 0.08, ease },
        };

  return (
    <section id="gift" data-theme="light" className="relative w-full py-10 md:py-14" style={{ backgroundColor: bg }}>
      <motion.div {...rise(0)} className="relative mx-auto w-full max-w-[1200px] px-6 lg:px-10">
        {/* Градієнтна рамка в кольорах сайту */}
        {/* Без кольорової рамки: м'яка тінь і ледь помітний контур */}
        <div className="rounded-[34px] shadow-[0_30px_70px_-35px_rgba(30,60,110,0.35)]">
          <div className="relative overflow-hidden rounded-[34px] bg-[#fcfcfd] px-6 py-9 ring-1 ring-black/[0.06] md:px-14 md:py-14">
            {/* М'які плями всередині картки */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(72,198,239,0.14),transparent)]" />
              <div className="absolute -bottom-32 -left-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(252,203,144,0.22),transparent)]" />
            </div>

            {/* Іконка подарунка в правому верхньому куті картки */}
            <motion.span
              aria-hidden="true"
              className="absolute right-6 top-6 z-10 hidden h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#d9800b] shadow-[0_20px_40px_-18px_rgba(217,128,11,0.45)] md:flex"
              animate={reduce ? undefined : { rotate: [-6, 6, -6], y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <GiftIcon />
            </motion.span>
            {festive && <Snow still={reduce} />}

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
              <div>
                <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-neutral-900 md:text-[36px]">
                  Доробка для BAS
                  <br />
                  на рік{" "}
                  <span className="bg-gradient-to-r from-[#3b8fe0] via-[#b453d1] to-[#e08a00] bg-clip-text text-transparent">
                    безкоштовно
                  </span>
                </h2>

                <p className="mt-4 max-w-[460px] text-[15px] leading-relaxed text-neutral-500">
                  Підключіть хоча б одне робоче місце в нашій хмарі — і отримайте одну доробку для BAS з
                  каталогу на вибір. Користуйтеся нею весь рік без доплат.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <Link
                    href="/BAS#solutions"
                    onClick={(e) => {
                      if (catalogHere && scrollToSection("solutions")) e.preventDefault();
                    }}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#0b0b0f] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    Обрати доробку
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                  <a
                    href="#application"
                    onClick={(e) => {
                      if (scrollToSection("application")) e.preventDefault();
                    }}
                    className="group inline-flex items-center text-[14px] font-semibold text-neutral-600 transition-colors hover:text-neutral-900"
                  >
                    Залишити заявку
                    <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Праворуч: як отримати подарунок */}
              <div className="relative">

                {/* Кроки без карток: номер, заголовок і пояснення, між кроками тонка лінія */}
                <ol className="relative">
                  {STEPS.map((s, i) => (
                    <motion.li
                      key={s.n}
                      {...rise(i + 1)}
                      className="relative flex gap-4 pb-6 last:pb-0"
                    >
                      {/* З'єднувальна лінія до наступного кроку */}
                      {i < STEPS.length - 1 && (
                        <span aria-hidden="true" className="absolute bottom-0 left-[17px] top-10 w-px bg-neutral-900/[0.07]" />
                      )}
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] text-[13px] font-bold tracking-tight [&_svg]:h-[18px] [&_svg]:w-[18px]"
                        style={{ color: s.color, background: `color-mix(in srgb, ${s.color} 12%, #ffffff)` }}
                      >
                        {festive ? React.createElement(FESTIVE_ICONS[i]) : s.n}
                      </span>
                      <span className="pt-1">
                        <span className="block text-[15px] font-semibold leading-snug text-neutral-900">{s.title}</span>
                        <span className="mt-0.5 block text-[13px] leading-relaxed text-neutral-500">{s.text}</span>
                      </span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PromoGift;
