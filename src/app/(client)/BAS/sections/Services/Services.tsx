"use client";

import { display } from "@/app/fonts/display";
import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { BAS_SERVICES, BasService } from "../../basData";
import { ease } from "../shared/Illustration";
import { easedGradient, edgeMask } from "@/lib/utils/gradients";

const BG = "#07070d";

// Власні суцільні іконки в дусі SF Symbols: заливка з вирізаним малюнком
const glyphCut: Partial<Record<BasService["icon"], ReactNode>> = {
  install: (
    <>
      <path d="M12 6.6v9" />
      <path d="M8 12.4l4 4 4-4" />
    </>
  ),
  dev: (
    <>
      <circle cx="3.4" cy="14.1" r="2.2" fill="#000" stroke="none" />
      <circle cx="9.9" cy="20.6" r="2.2" fill="#000" stroke="none" />
    </>
  ),
};

const glyphShape: Record<BasService["icon"], ReactNode> = {
  install: <circle cx="12" cy="12" r="10" />,
  // Гарнітура: дуга, дві чашки і мікрофон
  support: (
    <>
      <path d="M4.6 14V12a7.4 7.4 0 0 1 14.8 0v2" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
      <rect x="2.6" y="11.6" width="5.4" height="7.8" rx="2.4" />
      <rect x="16" y="11.6" width="5.4" height="7.8" rx="2.4" />
      <path d="M18.7 19v.4a2.6 2.6 0 0 1-2.6 2.6h-2.6" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
      <rect x="10" y="20.6" width="4.4" height="2.8" rx="1.4" />
    </>
  ),
  // Пазл
  dev: (
    <g transform="translate(-0.6 0.6)">
      <rect x="4" y="7" width="13" height="13" rx="2.5" />
      <circle cx="10.5" cy="5.6" r="2.8" />
      <circle cx="18.4" cy="13.5" r="2.8" />
    </g>
  ),
  cloud: <path d="M6.6 19.5a4.6 4.6 0 0 1-.7-9.15 6.4 6.4 0 0 1 12.3-1.3 5.2 5.2 0 0 1-.6 10.45z" />,
};

const Glyph = ({ name, size, className }: { name: BasService["icon"]; size: number; className?: string }) => {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <mask id={id}>
        <g fill="#fff">{glyphShape[name]}</g>
        <g fill="none" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {glyphCut[name] ?? null}
        </g>
      </mask>
      <rect width="24" height="24" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  );
};

// «Від 1 500 грн, разово» → сума, одиниця і примітка окремо
const parsePrice = (p: string) => {
  const m = p.match(/^Від\s+([\d\s\u00a0]+?)\s*грн[,.]?\s*(.*)$/i);
  if (!m) return null;
  const rest = m[2].trim();
  const cut = rest.search(/[,.]/);
  const unit = cut < 0 ? rest : rest.slice(0, cut).trim();
  const note = cut < 0 ? "" : rest.slice(cut + 1).trim();
  return {
    amount: m[1].trim().replace(/\s+/g, "\u00a0"),
    unit,
    note: note ? note[0].toUpperCase() + note.slice(1) : "",
  };
};

const Price = ({ text }: { text: string }) => {
  const p = parsePrice(text);
  return (
    <div className="mt-7 border-t border-black/10 pt-5 text-[#0b0b10]">
      {p ? (
        <>
          <div className="text-[13px] font-semibold uppercase tracking-[0.06em] text-black/45">від</div>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2.5">
            <span className={`${display.className} text-[40px] font-bold leading-none tracking-[-0.045em]`}>
              {p.amount}
              <span className="ml-1.5 text-[22px] tracking-[-0.02em]">грн</span>
            </span>
            {p.unit && <span className="text-[15px] font-semibold text-black/55">{p.unit}</span>}
          </div>
          {p.note && <div className="mt-2 text-[13px] font-medium text-black/55">{p.note}</div>}
        </>
      ) : (
        <div className="text-[17px] font-bold tracking-[-0.02em]">{text}</div>
      )}
    </div>
  );
};

const gradientOf = (s: BasService) =>
  `linear-gradient(160deg, ${s.gradient[0]} 0%, ${s.gradient[1]} 100%)`;

const Items = ({ s }: { s: BasService }) => (
  <>
    <ul className="space-y-2.5">
      {s.items.map((item) => (
        <li key={item} className="flex gap-3 text-[16px] font-semibold leading-snug tracking-[-0.01em] text-black/70">
          <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/50" />
          {item}
        </li>
      ))}
    </ul>
    {s.price && <Price text={s.price} />}
  </>
);

type Props = {
  services?: BasService[];
  product?: string; // назва в заголовку: «Послуги для BAS»
  accent?: string; // колір назви продукту в заголовку
  fadeToWhite?: boolean; // плавний перехід у білу секцію нижче
};

const Services = ({
  services = BAS_SERVICES,
  product = "BAS",
  accent = "#5aa9ff",
  fadeToWhite = true,
}: Props) => {
  const [active, setActive] = useState(0);
  const cur = services[active];

  return (
    <section
      id="services"
      data-theme="dark"
      className={`relative w-full overflow-hidden pt-[180px] text-white ${fadeToWhite ? "pb-[240px]" : ""}`}
      style={{ backgroundColor: BG }}
    >
      {/* Перехід з білої секції вище */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[260px]"
        style={{ background: easedGradient("#ffffff", BG) }}
      />
      <div data-theme="light" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[110px]" />

      {/* Фон: «аврора» в кольорах активної послуги.
          Маска гасить її біля переходів, тож різких країв немає */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={edgeMask(240, fadeToWhite ? 260 : 120)}>
        <motion.div
          className="absolute left-[-10%] top-[30%] h-[70vh] w-[60vw] rounded-full opacity-30 [-webkit-mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)] [mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)]"
          animate={{ backgroundColor: cur.gradient[0], x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{
            backgroundColor: { duration: 0.9 },
            x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute right-[-10%] top-[45%] h-[70vh] w-[55vw] rounded-full opacity-35 [-webkit-mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)] [mask-image:radial-gradient(closest-side,#000,rgba(0,0,0,0.45)_45%,transparent)]"
          animate={{ backgroundColor: cur.gradient[1], x: [0, -70, 0], y: [0, 50, 0] }}
          transition={{
            backgroundColor: { duration: 0.9 },
            x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      {/* Основний блок рівно на висоту екрана */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col px-6 pb-14 pt-28 lg:h-[100svh] lg:px-10 lg:pb-12 lg:pt-24">
        {/* Заголовок: назва продукту в кольорі активної послуги + лічильник */}
        <div className="flex items-end justify-between gap-6">
          <h2
            className="text-4xl md:text-6xl bg-gradient-to-b from-white to-white/40 bg-clip-text pb-[0.08em] font-semibold leading-[1.05] tracking-[-0.03em] text-transparent"
          >
            Послуги для <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to bottom, #ffffff -40%, ${accent})` }}>{product}</span>
          </h2>

          <div className="hidden items-center gap-4 lg:flex">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cur.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
                className="flex items-center gap-3 text-right"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: gradientOf(cur) }} />
                <span className="text-lg font-semibold text-white/85">{cur.title}</span>
              </motion.div>
            </AnimatePresence>
            <span className="font-semibold tabular-nums text-white/40">
              <span className="text-white">0{active + 1}</span> / 0{services.length}
            </span>
          </div>
        </div>

        {/* ПК: гармошка. Активна панель розгортається, інші стають смугами */}
        <div className="mt-8 hidden min-h-[340px] flex-1 gap-3 lg:flex xl:mt-10">
          {services.map((s, i) => {
            const on = i === active;
            return (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                aria-expanded={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative cursor-pointer overflow-hidden rounded-[28px] outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-white"
                style={{ flexGrow: on ? 5 : 1, flexBasis: 0, background: gradientOf(s) }}
              >
                {/* Велика іконка в розгорнутій панелі */}
                <Glyph
                  name={s.icon}
                  size={170}
                  className={`pointer-events-none absolute right-8 top-8 text-white/45 transition-all duration-700 ${on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                />

                {/* Згорнута: номер угорі, вертикальна назва внизу */}
                <div
                  className={`absolute inset-x-0 bottom-7 top-6 flex flex-col items-center justify-between transition-opacity duration-300 ${on ? "opacity-0" : "opacity-100 delay-300"}`}
                >
                  <Glyph name={s.icon} size={34} className="text-black/40" />
                  <span className="block rotate-180 whitespace-nowrap text-[22px] font-bold tracking-[-0.02em] text-black/80 [writing-mode:vertical-rl]">
                    {s.title}
                  </span>
                </div>

                {/* Розгорнута: вміст з'являється, коли панель вже розкрилась */}
                <AnimatePresence>
                  {on && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5, ease } }}
                      exit={{ opacity: 0, transition: { duration: 0.12 } }}
                      className="absolute inset-0 flex min-w-[460px] flex-col justify-end p-9 text-[#0b0b10]"
                    >
                      <h3 className={`${display.className} mb-5 text-[46px] font-bold leading-[1.02] tracking-[-0.04em]`}>{s.title}</h3>
                      <Items s={s} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Телефон і планшет: кольорові картки, що розкриваються по натиску */}
        <div className="mt-10 space-y-3 lg:hidden">
          {services.map((s, i) => {
            const on = i === active;
            return (
              <div key={s.id} className="overflow-hidden rounded-[24px]" style={{ background: gradientOf(s) }}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={on}
                  className="flex w-full items-center gap-4 p-5 text-left text-[#0b0b10]"
                >
                  <Glyph name={s.icon} size={26} className="text-black/45" />
                  <span className="flex-1 text-[22px] font-bold tracking-[-0.03em]">{s.title}</span>
                  <IconChevronDown size={22} stroke={2} className={`transition-transform duration-300 ${on ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col px-5 pb-6">
                        <Items s={s} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Перехід у білу секцію нижче */}
      {fadeToWhite && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px]"
            style={{ background: easedGradient(BG, "#ffffff") }}
          />
          <div data-theme="light" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px]" />
        </>
      )}
    </section>
  );
};

export default Services;
