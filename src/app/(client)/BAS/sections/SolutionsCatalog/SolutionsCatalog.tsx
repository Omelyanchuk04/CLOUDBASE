"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, Variants } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import {
  Solution,
  SolutionCategory,
  SolutionCategoryDef,
  SOLUTION_CATEGORIES,
  SOLUTIONS,
} from "../../basData";
import { ease, Fit } from "../shared/Illustration";
import { SOLUTION_VISUALS } from "./SolutionVisuals";
import { edgeMask } from "@/lib/utils/gradients";
import { scrollToSection } from "@/lib/utils/scrollToSection";

const AUTOPLAY_SECONDS = 7;

const catById = Object.fromEntries(
  SOLUTION_CATEGORIES.map((c) => [c.id, c]),
) as Record<SolutionCategory, SolutionCategoryDef>;

// Нахил вкладок, як у пігулок шапки
const tilts = ["1deg", "-2deg", "1.5deg", "-1deg", "2deg"];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const scrollToApplication = () => {
  scrollToSection("application");
};

const Visual = ({ s, play }: { s: Solution; play: boolean }) => {
  const V = SOLUTION_VISUALS[s.visual];
  return (
    <Fit>
      <V a={catById[s.category].accent} play={play} />
    </Fit>
  );
};

type Filter = SolutionCategory | "all";

const SolutionsCatalog = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hover, setHover] = useState(false);
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const list = useMemo(
    () => (filter === "all" ? SOLUTIONS : SOLUTIONS.filter((s) => s.category === filter)),
    [filter],
  );
  const active = list[Math.min(index, list.length - 1)];
  const cat = catById[active.category];
  const running = autoplay && inView && !hover && !reduceMotion;

  const next = useCallback(() => setIndex((i) => (i + 1) % list.length), [list.length]);

  const select = (i: number) => {
    setAutoplay(false);
    setIndex(i);
  };

  const changeFilter = (f: Filter) => {
    setFilter(f);
    setIndex(0);
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  // Активна картка завжди видна у стрічці (без прокрутки сторінки)
  useEffect(() => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const left = card.offsetLeft - scroller.offsetLeft;
    const right = left + card.offsetWidth;
    const pad = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
    if (left - pad < scroller.scrollLeft || right > scroller.scrollLeft + scroller.clientWidth) {
      scroller.scrollTo({ left: left - pad, behavior: "smooth" });
    }
  }, [index, filter]);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const tabs: { id: Filter; label: string; color: string; count: number }[] = [
    { id: "all", label: "Усі", color: "#0068b4", count: SOLUTIONS.length },
    ...SOLUTION_CATEGORIES.map((c) => ({
      id: c.id,
      label: c.label,
      color: c.accent,
      count: SOLUTIONS.filter((s) => s.category === c.id).length,
    })),
  ];

  return (
    <section
      ref={sectionRef}
      id="solutions"
      data-theme="light"
      className="relative w-full overflow-hidden bg-white pb-16 pt-4 text-neutral-900 md:pb-20 md:pt-6 lg:pb-10"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {/* Світло в кольорі категорії активного рішення */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={edgeMask()}>
        <motion.div
          className="absolute -right-48 top-0 h-[720px] w-[720px] rounded-full opacity-70 [-webkit-mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)] [mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)]"
          animate={{ backgroundColor: cat.tint }}
          transition={{ duration: 0.9 }}
        />
        <motion.div
          className="absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full opacity-25 [-webkit-mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)] [mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)]"
          animate={{ backgroundColor: cat.accent }}
          transition={{ duration: 0.9 }}
        />
      </div>

      {/* До цього блоку прокручують посилання на #solutions: шапка 80px над заголовком */}
      <div data-scroll-anchor data-scroll-offset="80" className="relative z-10 mx-auto w-full max-w-[1200px] px-6 lg:px-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-left text-4xl md:text-5xl bg-gradient-to-b from-[#0b0b10] to-[#0b0b10]/50 bg-clip-text pb-[0.08em] font-semibold leading-[1.05] tracking-[-0.03em] text-transparent"
        >
          Доробки для <span className="bg-gradient-to-b from-[#3b9ae6] to-[#00508c] bg-clip-text text-transparent">BAS</span>
        </motion.h2>

        {/* Вкладки категорій: пігулки з нахилом і кольоровою рамкою */}
        <div className="-mx-6 mb-8 mt-7 flex gap-3 lg:mb-6 lg:mt-5 lg:gap-2.5 overflow-x-auto px-6 pb-3 pt-2 [scrollbar-width:none] md:mx-0 md:mb-12 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {tabs.map((t, i) => {
            const on = filter === t.id;
            // Коли обрано «Усі», підсвічуємо вкладку категорії поточного рішення
            const current = !on && filter === "all" && t.id === active.category;
            return (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => changeFilter(t.id)}
                aria-pressed={on}
                whileTap={{ scale: 0.95 }}
                style={{
                  rotate: tilts[i % tilts.length],
                  // Рамка інлайн: у globals.scss є button { border: none }
                  border: `1.5px solid ${t.color}`,
                  backgroundColor: on
                    ? t.color
                    : current
                      ? `color-mix(in srgb, ${t.color} 18%, #ffffff)`
                      : "rgba(255,255,255,0.8)",
                  color: on ? "#fff" : "#1d1d1f",
                  boxShadow: on
                    ? `0 12px 24px -10px ${t.color}`
                    : current
                      ? `0 10px 22px -14px ${t.color}`
                      : "none",
                }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold lg:px-4 lg:py-2 lg:text-[13px] backdrop-blur transition-[background-color,box-shadow,color] duration-300"
              >
                {t.label}
                <span className={`min-w-[22px] rounded-full px-1.5 text-center text-[12px] ${on ? "bg-white/25" : "bg-neutral-100 text-neutral-500"}`}>
                  {t.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* На телефоні: стрічка, ілюстрація, текст. На ПК: текст і ілюстрація, стрічка внизу */}
        <div className="flex flex-col">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
            {/* Текст обраного рішення */}
            <div className="lg:min-h-[300px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <h3 className="text-3xl font-semibold leading-[1.1] tracking-tight md:text-[34px]">
                    {active.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-neutral-600 lg:mt-3">
                    {active.desc}
                  </p>
                  {active.note && (
                    <p className="mt-3 text-[14px] text-neutral-400">{active.note}</p>
                  )}
                </motion.div>
              </AnimatePresence>


              <button
                type="button"
                onClick={scrollToApplication}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0068b4] lg:mt-6 px-6 py-3 text-[15px] font-semibold text-white shadow-[0_12px_24px_-12px_#0068b4] transition-colors hover:bg-[#005a9c]"
              >
                Замовити доробку
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            {/* Велика панель з ілюстрацією */}
            <div
              className="relative order-first aspect-[4/3] overflow-hidden rounded-[32px] lg:aspect-auto lg:h-[clamp(260px,calc(100svh-520px),400px)] ring-1 ring-black/5 transition-[background] duration-700 lg:order-none"
              style={{ background: `linear-gradient(135deg, ${cat.tint} 0%, #ffffff 85%)` }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className="absolute inset-0 p-4 md:p-8"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <Visual s={active} play={!reduceMotion} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Стрічка карток обраної категорії */}
          <div className="order-first mb-6 flex items-center gap-4 lg:order-none lg:mb-0 lg:mt-6">
            <div
              ref={scrollerRef}
              // Зліва стрічка доходить до краю екрана, як у Chrome. --edge — відстань
              // від краю екрана до тексту, тож перша картка стоїть рівно з ним
              className="-mx-6 flex flex-1 snap-x scroll-pl-6 gap-4 overflow-x-auto px-6 py-2 [scrollbar-width:none] md:mr-0 md:pr-1 md:[--edge:calc((100vw_-_min(100vw,1200px))/2_+_24px)] lg:[--edge:calc((100vw_-_min(100vw,1200px))/2_+_40px)] md:-ml-[var(--edge)] md:pl-[var(--edge)] md:scroll-pl-[var(--edge)] md:[mask-image:linear-gradient(to_right,#000_88%,transparent)] [&::-webkit-scrollbar]:hidden"
            >
              {list.map((s, i) => {
                const on = s.id === active.id;
                const c = catById[s.category];
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={on}
                    className="relative flex h-[132px] w-[300px] shrink-0 lg:h-[108px] snap-start items-stretch overflow-hidden rounded-[24px] text-left md:w-[330px]"
                    style={{
                      backgroundColor: c.tint,
                      boxShadow: on ? `inset 0 0 0 3px ${c.accent}` : "none",
                    }}
                  >
                    <span className="flex flex-1 items-start p-5 pr-3">
                      <span className="line-clamp-4 text-[15px] font-semibold leading-snug tracking-tight text-neutral-900">
                        {s.title}
                      </span>
                    </span>
                    <span className="pointer-events-none relative mr-4 mt-4 w-[120px] shrink-0 overflow-hidden rounded-t-xl bg-white/60">
                      <Visual s={s} play={false} />
                    </span>

                    {/* Смужка часу до наступного рішення */}
                    {on && running && (
                      <motion.span
                        key={`p-${filter}-${index}`}
                        className="absolute bottom-0 left-0 h-[3px] w-full origin-left"
                        style={{ backgroundColor: c.accent }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_SECONDS, ease: "linear" }}
                        onAnimationComplete={next}
                      />
                    )}
                  </button>
                );
              })}

              {/* Остання картка: власна задача */}
              <button
                type="button"
                onClick={scrollToApplication}
                className="flex h-[132px] w-[300px] shrink-0 snap-start lg:h-[108px] flex-col justify-between rounded-[24px] p-5 text-left text-white md:w-[330px]"
                style={{ background: "linear-gradient(135deg, #0068b4 0%, #3b8fe0 100%)" }}
              >
                <span className="text-[16px] font-semibold leading-snug tracking-tight">
                  Немає потрібної доробки?
                </span>
                <span className="inline-flex items-center gap-2 text-[14px] text-white/75">
                  Опишіть задачу у заявці
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="hidden shrink-0 gap-3 md:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Попередні"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-neutral-700 shadow-[0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-colors hover:text-neutral-900"
              >
                <IconChevronLeft size={24} stroke={2} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Наступні"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-neutral-700 shadow-[0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-colors hover:text-neutral-900"
              >
                <IconChevronRight size={24} stroke={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsCatalog;
