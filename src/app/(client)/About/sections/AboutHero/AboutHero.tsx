"use client";

import React from "react";
import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { easedFade } from "@/lib/utils/gradients";
import styles from "../../../BAS/sections/BasHero/BasHero.module.scss";

// Hero «Про нас»: темний фон з блакитною, фіолетовою і жовтою плямами
// (кольори пігулок шапки). Під текстом три картки напрямків віялом.
// Анімуються лише transform і opacity

const ease = [0.16, 1, 0.3, 1] as const;

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
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const WORDS = [
  { w: "Про", accent: false },
  { w: "CloudBASE", accent: true },
];
const TEXT_END = 0.5;

const appear = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

const Word = ({ children, i, still, className }: { children: React.ReactNode; i: number; still: boolean; className: string }) => (
  <motion.span
    className={`inline-block bg-clip-text pb-[0.08em] text-transparent ${className}`}
    initial={still ? false : { opacity: 0, y: "0.35em" }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
  >
    {children}
  </motion.span>
);

const CloudIcon = ({ color }: { color: string }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 18h10.5a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.4 9.1 4.5 4.5 0 0 0 7 18z" />
  </svg>
);

// Напрямки. fan — положення картки у віялі на широкому екрані
const AREAS = [
  {
    title: "BAS",
    href: "/BAS",
    color: "#48c6ef",
    tone: ["#1d2c40", "#141922"],
    logo: "/main/BAS-logo.png",
    items: ["Встановлення", "Супровід", "Доробки під ваш облік"],
    fan: "-mr-3 translate-y-10 -rotate-[7deg]",
    z: "z-10",
  },
  {
    title: "Хмара",
    href: "/Cloud",
    color: "#d57eeb",
    tone: ["#2b2140", "#16141f"],
    logo: null,
    items: ["Доступ 24/7 з будь-якого пристрою", "Щоденні резервні копії", "BAS, KBS, M.E.Doc, FREDO, Excel та інші"],
    fan: "-translate-y-2",
    z: "z-20",
  },
  {
    title: "KBS",
    href: "/KBS",
    color: "#84fab0",
    tone: ["#1b3029", "#131a17"],
    logo: "/main/KBS-logo.png",
    items: ["Встановлення", "Супровід", "ОБУ і БКП"],
    fan: "-ml-3 translate-y-10 rotate-[7deg]",
    z: "z-10",
  },
];

// Сама картка напрямку. onClick на телефоні не дає перейти, поки картка не в центрі
const CardLink = ({
  area,
  onClick,
}: {
  area: (typeof AREAS)[number];
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
    <Link
      href={area.href}
      onClick={onClick}
      draggable={false}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[28px] p-7 transition-colors duration-300"
      style={{
        // Матовий приглушений відтінок свого кольору, кольорова рамка, без світіння
        background: `linear-gradient(165deg, ${area.tone[0]} 0%, ${area.tone[1]} 75%)`,
        border: `1.5px solid ${area.color}`,
        boxShadow: "0 30px 60px -35px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >

      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: area.logo ? "#ffffff" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
        {area.logo ? <img src={area.logo} alt="" draggable={false} className="h-7 w-7 object-contain" /> : <CloudIcon color="#ffffff" />}
      </span>

      <span className="relative mt-6 text-[30px] font-semibold leading-none tracking-[-0.02em]">{area.title}</span>

      <ul className="relative mt-5 space-y-2.5">
        {area.items.map((t) => (
          <li key={t} className="flex items-center gap-2.5 text-[14px] text-white/70">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full opacity-70" style={{ background: area.color }} />
            {t}
          </li>
        ))}
      </ul>

      <span className="relative mt-auto inline-flex items-center pt-7 text-[14px] font-semibold text-white/80 transition-colors group-hover:text-white">
        Детальніше
        <svg className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
);

const AreaCard = ({ area, i, still }: { area: (typeof AREAS)[number]; i: number; still: boolean }) => {
  return (
    // Зовнішній блок задає положення у віялі, внутрішній — анімацію появи
    <div className={`relative w-[300px] shrink-0 ${area.fan} ${area.z}`}>
      <motion.div
        initial={still ? false : { opacity: 0, y: 70, rotateX: 28 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.2, delay: TEXT_END + 0.25 + i * 0.12, ease }}
        style={{ transformPerspective: 1200 }}
      >
        <CardLink area={area} />
      </motion.div>
    </div>
  );
};

// Телефон: картки віялом з однією в центрі. Бічні визирають з-за неї нахилені.
// Свайп рухає картки разом із пальцем, а після відпускання вони плавно (пружиною)
// доїжджають до найближчої. Тап по бічній картці або по крапці теж переносить її в центр.
// Перехід на сторінку — тапом по картці, що вже в центрі
const STEP = 150; // скільки пікселів свайпу = одна картка
const spring = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 };

const FanCard = ({
  area,
  i,
  pos,
  active,
  onPick,
  dragged,
}: {
  area: (typeof AREAS)[number];
  i: number;
  pos: MotionValue<number>;
  active: number;
  onPick: (i: number) => void;
  dragged: React.MutableRefObject<boolean>;
}) => {
  // Положення картки залежить від того, наскільки вона далеко від центру (дробове під час свайпу)
  const d = useTransform(pos, (p) => i - p);
  const x = useTransform(d, (v) => {
    const far = Math.abs(v);
    return Math.sign(v) * (far <= 1 ? far * 62 : 62 + (far - 1) * 34);
  });
  const y = useTransform(d, (v) => Math.abs(v) * 20);
  const rotate = useTransform(d, (v) => v * 7);
  const scale = useTransform(d, (v) => 1 - Math.abs(v) * 0.07);
  const zIndex = useTransform(d, (v) => Math.round(100 - Math.abs(v) * 10));
  const dim = useTransform(d, (v) => {
    const far = Math.abs(v);
    return Math.min(far, 1) * 0.35 + Math.max(far - 1, 0) * 0.15;
  });

  return (
    <motion.div
      className="absolute left-1/2 top-0 w-[270px]"
      style={{ marginLeft: -135, x, y, rotate, scale, zIndex }}
    >
      <CardLink
        area={area}
        onClick={(e) => {
          // Після свайпу або по бічній картці — не переходимо, а центруємо
          if (dragged.current || i !== active) {
            e.preventDefault();
            if (!dragged.current) onPick(i);
          }
        }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[28px] bg-black"
        style={{ opacity: dim }}
      />
    </motion.div>
  );
};

const MobileFan = ({ still }: { still: boolean }) => {
  const pos = useMotionValue(1);
  const [active, setActive] = React.useState(1);
  const startPos = React.useRef(1);
  const dragged = React.useRef(false);
  const last = AREAS.length - 1;

  React.useEffect(() => pos.on("change", (v) => setActive(Math.round(Math.max(0, Math.min(last, v))))), [pos, last]);

  const goTo = (i: number) => {
    animate(pos, Math.max(0, Math.min(last, i)), still ? { duration: 0 } : spring);
  };

  return (
    <motion.div
      className="md:hidden"
      initial={still ? false : { opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: TEXT_END + 0.25, ease }}
    >
      <motion.div
        className="relative mx-auto h-[375px] w-full max-w-[340px] touch-pan-y select-none"
        onPanStart={() => {
          pos.stop();
          startPos.current = pos.get();
          dragged.current = true;
        }}
        onPan={(_, info) => {
          // За краями тягнеться туго, як гумка
          let v = startPos.current - info.offset.x / STEP;
          if (v < 0) v = v * 0.3;
          if (v > last) v = last + (v - last) * 0.3;
          pos.set(v);
        }}
        onPanEnd={(_, info) => {
          // Враховуємо швидкість: швидкий короткий свайп теж перегортає
          const projected = pos.get() - (info.velocity.x / STEP) * 0.18;
          goTo(Math.round(projected));
          setTimeout(() => (dragged.current = false), 50);
        }}
      >
        {AREAS.map((a, i) => (
          <FanCard key={a.href} area={a} i={i} pos={pos} active={active} onPick={goTo} dragged={dragged} />
        ))}
      </motion.div>

      {/* Перемикач під картками */}
      <div className="mt-2 flex items-center justify-center gap-2">
        {AREAS.map((a, i) => (
          <button
            key={a.href}
            type="button"
            onClick={() => goTo(i)}
            aria-label={a.title}
            aria-pressed={i === active}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === active ? 22 : 8, background: i === active ? a.color : "rgba(255,255,255,0.25)" }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Зменшує вміст, якщо він ширший за доступне місце (лише масштаб, без зміни верстки)
const FitScale = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const outer = React.useRef<HTMLDivElement>(null);
  const inner = React.useRef<HTMLDivElement>(null);
  const [box, setBox] = React.useState({ scale: 1, height: 0 });

  React.useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const update = () => {
      const scale = Math.min(1, o.clientWidth / i.scrollWidth);
      setBox({ scale, height: i.offsetHeight * scale });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className={`relative w-full ${className}`} style={box.height ? { height: box.height } : undefined}>
      <div
        ref={inner}
        className="absolute left-1/2 top-0 w-max origin-top"
        style={{ transform: `translateX(-50%) scale(${box.scale})` }}
      >
        {children}
      </div>
    </div>
  );
};

const AboutHero = () => {
  const reduce = !!useReducedMotion();

  return (
    <section className={styles.section} data-theme="dark">
      {/* Плями: блакитна ліворуч, фіолетова праворуч, жовта під картками.
          Радіальні градієнти без розмиття, тож без різких країв */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[16%] top-[-10%] h-[62vw] max-h-[820px] w-[62vw] max-w-[820px] rounded-full bg-[radial-gradient(closest-side,rgba(72,198,239,0.26),rgba(72,198,239,0.07)_55%,transparent)]" />
        <div className="absolute -right-[14%] top-[8%] h-[60vw] max-h-[800px] w-[60vw] max-w-[800px] rounded-full bg-[radial-gradient(closest-side,rgba(213,126,235,0.28),rgba(213,126,235,0.07)_55%,transparent)]" />
        <div className="absolute bottom-[-6%] left-1/2 h-[46vw] max-h-[620px] w-[86vw] max-w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(253,224,71,0.17),rgba(253,224,71,0.04)_55%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-[190px] pt-36 md:pb-[300px] md:pt-44">
        <div className="flex flex-col items-start text-left md:items-center md:text-center">
          <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[60px] xl:text-[68px]">
            {WORDS.map(({ w, accent }, i) => (
              <React.Fragment key={w}>
                <Word
                  i={i}
                  still={reduce}
                  className={
                    accent
                      ? "bg-gradient-to-r from-[#7dd8f5] via-[#d57eeb] to-[#fde047]"
                      : "bg-gradient-to-b from-white to-white/40"
                  }
                >
                  {w}
                </Word>{" "}
              </React.Fragment>
            ))}
          </h1>

          <motion.p {...appear(TEXT_END)} className="mt-4 max-w-[620px] text-[15px] text-white/60 md:text-lg">
            Встановлюємо і супроводжуємо BAS та KBS, робимо доробки і надаємо хмару для роботи програм.
          </motion.p>

          <motion.div {...appear(TEXT_END + 0.1)} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 md:justify-center">
            <a
              href="#contacts"
              onClick={scrollTo("contacts")}
              className={styles.glassBtn}
              onPointerMove={handleGlassMove}
              onPointerLeave={handleGlassLeave}
            >
              <span>Контакти</span>
              <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#application"
              onClick={scrollTo("application")}
              className="group inline-flex items-center text-[15px] font-semibold text-white/75 transition-colors hover:text-white"
            >
              Залишити заявку
              <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Три напрямки віялом. На телефоні — віяло з перемиканням (MobileFan),
            на ширших екранах — усі три поруч, із зменшенням, якщо не вміщаються */}
        <div className="mt-12 md:hidden">
          <MobileFan still={reduce} />
        </div>
        <FitScale className="mt-20 hidden md:block">
          <div className="flex flex-row items-start justify-center">
            {AREAS.map((a, i) => (
              <AreaCard key={a.href} area={a} i={i} still={reduce} />
            ))}
          </div>
        </FitScale>
      </div>

      {/* Плавний перехід у білу секцію контактів */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[150px] md:h-[200px]"
        style={{ background: easedFade("#ffffff") }}
      />
      <div data-theme="light" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px]" />
    </section>
  );
};

export default AboutHero;
