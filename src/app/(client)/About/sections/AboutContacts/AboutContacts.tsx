"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { easedFade } from "@/lib/utils/gradients";

// Контакти: прозора секція поверх спільного фону з «Як ми працюємо»
// (обгортка на сторінці: #cdcdda з кольоровими плямами). Зверху перехід з білої «Хто ми».
// Зверху і знизу плавні переходи в кольори сусідніх секцій.
// Великий градієнтний номер телефону, пігулки Telegram і пошти з кольоровою
// рамкою і нахилом, як у шапці, і графік зі статусом.
// Контакти справжні (ті самі дані в шапці й футері)

const PHONE = { value: "+38 093 069 26 26", href: "tel:+380930692626" };
const EMAIL = "cloudbase.com.ua@gmail.com";
const TELEGRAM = { value: "@CLOUDBASE_CHAT", href: "https://t.me/CLOUDBASE_CHAT" };
const HOURS = { days: "Пн–Пт", from: 9, to: 18 };

const useOpenNow = () => {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Kyiv",
        weekday: "short",
        hour: "numeric",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const day = parts.find((p) => p.type === "weekday")?.value ?? "";
      const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
      setOpen(!["Sat", "Sun"].includes(day) && hour >= HOURS.from && hour < HOURS.to);
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return open;
};

const pill =
  "inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 text-[15px] font-semibold text-neutral-900 transition-colors duration-200 hover:bg-white";

const ease = [0.22, 1, 0.36, 1] as const;

const AboutContacts = () => {
  const reduce = !!useReducedMotion();
  const open = useOpenNow();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.7, delay: i * 0.08, ease },
        };

  return (
    <section
      id="contacts"
      data-theme="light"
      className="relative pb-6 pt-[80px] md:pb-10 md:pt-[90px]"
    >

      {/* Плавний перехід з білої «Хто ми» */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[90px] md:h-[110px]"
        style={{ background: easedFade("#ffffff", "to top") }}
      />


      <div data-scroll-anchor className="relative z-10 mx-auto w-full max-w-[860px] px-6 text-left md:text-center">
        <motion.h2
          {...rise(0)}
          className="bg-gradient-to-b from-neutral-900 to-neutral-500 bg-clip-text pb-[0.06em] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-transparent md:text-6xl"
        >
          Контакти
        </motion.h2>

        {/* Номер телефону великим градієнтним текстом */}
        <motion.div {...rise(1)} className="mt-8 md:mt-10">
          <a
            href={PHONE.href}
            className="inline-block whitespace-nowrap bg-gradient-to-r from-[#0a8fd1] via-[#b453d1] to-[#e08a00] bg-clip-text pb-[0.08em] text-[clamp(30px,9vw,40px)] font-semibold leading-none tracking-[-0.03em] text-transparent transition-opacity hover:opacity-80 md:text-[64px]"
          >
            {PHONE.value}
          </a>
        </motion.div>

        {/* Telegram і пошта: пігулки з рамкою, як у шапці */}
        <motion.div {...rise(2)} className="mt-8 flex flex-wrap items-center gap-3 md:justify-center">
          <a
            href={TELEGRAM.href}
            target="_blank"
            rel="noopener noreferrer"
            className={pill}
            style={{ border: "1.5px solid #2AABEE", rotate: "-1.5deg" }}
          >
            <svg width="16" height="16" viewBox="4 5 15 15" fill="#2AABEE" aria-hidden="true">
              <path d="M5.4 11.7 16.9 7.3c.5-.2 1 .1.8.9l-1.9 9.2c-.1.6-.5.8-1 .5l-2.9-2.2-1.4 1.4c-.2.2-.3.3-.6.3l.2-3 5.5-5c.2-.2 0-.3-.4-.1l-6.8 4.3-2.9-.9c-.6-.2-.7-.6.1-.9z" />
            </svg>
            {TELEGRAM.value}
          </a>

          <span className="inline-flex items-center gap-1.5" style={{ rotate: "1.5deg" }}>
            <a href={`mailto:${EMAIL}`} className={pill} style={{ border: "1.5px solid #c56ee0" }}>
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Скопійовано" : "Скопіювати адресу"}
              title={copied ? "Скопійовано" : "Скопіювати"}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/70 text-neutral-600 transition-colors hover:bg-white hover:text-neutral-900"
              style={{ border: "1.5px solid #c56ee0" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {copied ? (
                  <path d="M20 6 9 17l-5-5" />
                ) : (
                  <>
                    <rect x="9" y="9" width="12" height="12" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                  </>
                )}
              </svg>
            </button>
          </span>
        </motion.div>

        {/* Графік і статус «працюємо зараз» за київським часом */}
        <motion.p
          {...rise(3)}
          className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[16px] text-neutral-600 md:justify-center md:text-[18px]"
        >
          <span>
            {HOURS.days}, {HOURS.from}:00–{HOURS.to}:00
          </span>
          <span className={`inline-flex items-center gap-2.5 font-semibold transition-opacity duration-300 ${open === null ? "opacity-0" : "opacity-100"}`}>
            <span className="relative flex h-2.5 w-2.5">
              {open && !reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />}
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-[#22c55e]" : "bg-neutral-400"}`} />
            </span>
            <span className={open ? "text-[#15803d]" : "text-neutral-600"}>{open ? "Зараз працюємо" : "Зараз неробочий час"}</span>
          </span>
        </motion.p>
      </div>
    </section>
  );
};

export default AboutContacts;
