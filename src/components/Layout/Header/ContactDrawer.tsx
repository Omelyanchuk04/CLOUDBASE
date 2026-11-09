"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { services, useTypewriter } from "@/app/(client)/(home)/sections/ApplicationForm/ApplicationForm";
import { useLeadForm } from "@/lib/utils/leadForm";
import PhoneInput from "@/components/UI/Form/PhoneInput";
import FieldError from "@/components/UI/Form/FieldError";

// Бічна панель справа на всю висоту вікна, виїжджає зверху. Відкривається стрілочкою біля «Заявка» в шапці.
// Темна, як сайт. Зверху контакти як у секції «Контакти» на сторінці «Про нас»,
// нижче форма заявки з полями без рамок і фону (лише лінія знизу) (ті самі напрямки, що у великій формі).
// Закривається хрестиком, кліком по затемненню або клавішею Esc

export interface DrawerContact {
  id: string;
  label: string;
  value: string;
  href: string | null;
}

const HOURS = { from: 9, to: 18 };

// Чи зараз робочий час у Києві. Рахується лише в браузері
const useOpenNow = (active: boolean) => {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    if (!active) return;
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Kyiv",
      weekday: "short",
      hour: "numeric",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const day = parts.find((p) => p.type === "weekday")?.value ?? "";
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    setOpen(!["Sat", "Sun"].includes(day) && hour >= HOURS.from && hour < HOURS.to);
  }, [active]);
  return open;
};

const stroke = {
  width: 17,
  height: 17,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons: Record<string, React.ReactNode> = {
  phone: (
    <svg {...stroke}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z" />
    </svg>
  ),
  telegram: (
    <svg width="15" height="15" viewBox="4 5 15 15" fill="currentColor" aria-hidden="true">
      <path d="M5.4 11.7 16.9 7.3c.5-.2 1 .1.8.9l-1.9 9.2c-.1.6-.5.8-1 .5l-2.9-2.2-1.4 1.4c-.2.2-.3.3-.6.3l.2-3 5.5-5c.2-.2 0-.3-.4-.1l-6.8 4.3-2.9-.9c-.6-.2-.7-.6.1-.9z" />
    </svg>
  ),
  email: (
    <svg {...stroke}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  hours: (
    <svg {...stroke}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
};

const inputCls =
  "w-full min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/30";
// Рамка поля з помилкою
const errCls = "!border-[#fb7185]/70 focus:!border-[#fb7185]";

// Затемнена заливка з відтінком кольору, щоб кнопки не зливались зі склом панелі
const tintFill = (c: string) => `color-mix(in srgb, ${c} 16%, rgba(8, 9, 14, 0.62))`;

const pill =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold text-white/90 transition-[filter,color] duration-200 hover:brightness-125 hover:text-white";

const ContactDrawer = ({
  open,
  onClose,
  contacts,
}: {
  open: boolean;
  onClose: () => void;
  contacts: DrawerContact[];
}) => {
  const reduce = !!useReducedMotion();
  const openNow = useOpenNow(open);

  // Портал монтується лише в браузері
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Форма
  const [serviceId, setServiceId] = useState(services[0].id);
  const service = services.find((s) => s.id === serviceId) ?? services[0];
  // Поля, маска номера і перевірка — спільні з великою формою (lib/utils/leadForm)
  const form = useLeadForm();
  const { name, setName, phone, setPhone, message, setMessage, errorOf, touch, refs } = form;
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focused, setFocused] = useState(false);
  // Друк прикладів у полі, як у великій формі; працює лише коли панель відкрита
  const emptyPrompt = !focused && message === "";
  const typed = useTypewriter(service.examples, emptyPrompt && open);

  // Enter надсилає, Shift+Enter дає новий рядок
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending" || !form.check()) return;
    setStatus("sending");
    // TODO: той самий запит, що й у великій формі (service.label, name.trim(), form.phoneFull, message.trim())
    setTimeout(() => setStatus("sent"), 1200);
  };

  const resetForm = () => {
    setStatus("idle");
    form.reset();
  };

  // Esc закриває, сторінка під панеллю не прокручується
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    // Блокуємо прокрутку на <html> і лишаємо місце під смугу прокрутки
    // (scrollbar-gutter), інакше сторінка й шапка смикаються вбік на її ширину
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    const prevGutter = root.style.scrollbarGutter;
    // Лише коли смуга прокрутки справді займає місце (на Mac з трекпадом її ширина 0)
    if (window.innerWidth - root.clientWidth > 0) root.style.scrollbarGutter = "stable";
    root.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      root.style.scrollbarGutter = prevGutter;
    };
  }, [open, onClose]);

  const phoneC = contacts.find((c) => c.id === "phone");
  const tgC = contacts.find((c) => c.id === "telegram");
  const mailC = contacts.find((c) => c.id === "email");
  const hoursC = contacts.find((c) => c.id === "hours");

  // Заломлення світла працює лише в Chromium (Chrome, Edge, Opera)
  const [refract, setRefract] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    setRefract(/Chrome|Chromium|Edg\//.test(ua) && !/Firefox|FxiOS|CriOS/.test(ua));
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000]" role="dialog" aria-modal="true" aria-label="Контакти і заявка">
          {/* SVG-фільтр рідкого скла: шум зміщує пікселі під панеллю, ніби світло
              заломлюється в нерівному склі. Підключається через backdrop-filter */}
          <svg aria-hidden="true" width="0" height="0" className="absolute">
            <filter id="cb-liquid-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="2" seed="7" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
              <feDisplacementMap in="SourceGraphic" in2="soft" scale="70" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>

          {/* Затемнення і легке розмиття сторінки, щоб акцент був на панелі */}
          <motion.div
            className="absolute inset-0 bg-black/45 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Панель: темна, як сайт. Головне в ній — форма заявки,
              контакти зверху компактно трьома кнопками */}
          <motion.aside
            className="absolute inset-y-2 right-2 flex w-[calc(100%-16px)] max-w-[400px] flex-col overflow-hidden rounded-[28px] text-white sm:inset-y-3 sm:right-3"
            // Liquid glass: напівпрозорий фон з розмиттям і насиченням того, що під панеллю,
            // світлий відблиск по краю і м'які внутрішні блики
            style={{
              background: "linear-gradient(180deg, rgba(24,26,40,0.5) 0%, rgba(16,17,26,0.58) 100%)",
              // У Chromium додатково заломлення через SVG-фільтр (#cb-liquid-glass нижче),
              // інші браузери не підтримують url() у backdrop-filter, тож там лише розмиття
              backdropFilter: refract ? "url(#cb-liquid-glass) blur(6px) saturate(180%)" : "blur(12px) saturate(180%)",
              WebkitBackdropFilter: "blur(12px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow:
                "inset 1px 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.06), -30px 0 80px -20px rgba(0,0,0,0.6)",
            }}
            // Виїжджає зверху вниз
            initial={reduce ? { opacity: 0 } : { y: "-105%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "-105%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Одне м'яке світіння вгорі, без плям по всій панелі */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(111,134,214,0.18),transparent)]" />
            {/* Відблиск скла: світла смуга з верхнього лівого кута і ледь помітна знизу */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(140deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_22%,transparent_45%,transparent_80%,rgba(255,255,255,0.05)_100%)]" />

            {/* Верх: заголовок і хрестик */}
            <div className="relative flex items-center justify-between px-6 pt-6">
              <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Зв&apos;яжіться з нами</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрити"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            {/* Прокрутка лишається, але системна смуга прихована */}
            <div className="relative flex-1 overflow-y-auto overscroll-contain px-6 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Контакти: як у секції «Контакти» на сторінці «Про нас», темний варіант */}
              {phoneC && (
                <a
                  href={phoneC.href ?? undefined}
                  className="mt-6 inline-block whitespace-nowrap bg-gradient-to-r from-[#7dd8f5] via-[#d57eeb] to-[#fde047] bg-clip-text pb-[0.08em] text-[30px] font-semibold leading-none tracking-[-0.03em] text-transparent transition-opacity hover:opacity-85"
                >
                  {phoneC.value}
                </a>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {tgC && (
                  <a
                    href={tgC.href ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pill}
                    style={{ border: "1.5px solid #2AABEE", rotate: "-1.5deg", background: tintFill("#2AABEE") }}
                  >
                    <span className="text-[#2AABEE]">{icons.telegram}</span>
                    {tgC.value}
                  </a>
                )}
                {mailC && (
                  <a href={mailC.href ?? undefined} className={pill} style={{ border: "1.5px solid #d57eeb", rotate: "1.5deg", background: tintFill("#d57eeb") }}>
                    {mailC.value}
                  </a>
                )}
              </div>

              {hoursC && (
                <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-white/55">
                  <span>{hoursC.value}</span>
                  {openNow !== null && (
                    <span className="inline-flex items-center gap-2 font-semibold">
                      <span className={`h-2 w-2 rounded-full ${openNow ? "bg-[#4ade80]" : "bg-white/35"}`} />
                      <span className={openNow ? "text-[#86efac]" : "text-white/60"}>
                        {openNow ? "Зараз працюємо" : "Зараз неробочий час"}
                      </span>
                    </span>
                  )}
                </p>
              )}

              {/* Форма: компактна версія форми над футером — пігулки напрямків з нахилом,
                  картка з кольоровою рамкою, друк прикладу в полі і кругла кнопка зі стрілкою */}
              <div className="mt-16">
                <h3 className="text-[19px] font-semibold tracking-[-0.01em]">Залиште заявку</h3>

                {/* Напрямки */}
                <div className="mt-4 flex flex-wrap gap-x-2.5 gap-y-3">
                  {services.map((s) => {
                    const active = s.id === serviceId;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setServiceId(s.id)}
                        aria-pressed={active}
                        className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors duration-200 ${s.tilt}`}
                        // Рамка задана інлайном, бо глобальні стилі прибирають рамки в кнопок
                        style={
                          active
                            ? { backgroundColor: s.color, border: `1px solid ${s.color}`, color: "#0b0b0f" }
                            : { border: `1px solid ${s.color}80`, color: s.color, background: tintFill(s.color) }
                        }
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                {/* Картка з тонкою кольоровою рамкою */}
                <div className="relative mt-5 rounded-[20px] bg-[linear-gradient(135deg,#48c6ef,#d57eeb_45%,#fccb90_75%,#84fab0)] p-px opacity-100">
                  <div className="rounded-[19px] bg-[#12131c] p-4">
                    {status === "sent" ? (
                      <div className="flex flex-col items-center py-6 text-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#84fab0] text-black">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </span>
                        <p className="mt-3 text-[16px] font-semibold">Заявку отримано</p>
                        <p className="mt-1 text-[12px] text-white/50">
                          Напрямок: {service.label}. Зв&apos;яжемося протягом робочого дня.
                        </p>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="mt-3 text-[12px] text-white/55 underline-offset-4 transition-colors hover:text-white hover:underline"
                        >
                          Надіслати ще одну
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-2">
                          <div>
                            <input
                              ref={refs.name}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onBlur={touch("name")}
                              placeholder="Ваше ім'я"
                              autoComplete="name"
                              aria-invalid={!!errorOf("name")}
                              aria-describedby="cd-name-err"
                              className={`${inputCls} ${errorOf("name") ? errCls : ""}`}
                            />
                            <FieldError id="cd-name-err" message={errorOf("name")} />
                          </div>
                          <div>
                            <PhoneInput
                              ref={refs.phone}
                              value={phone}
                              onValueChange={setPhone}
                              onBlur={touch("phone")}
                              placeholder="+380 __ ___ __ __"
                              aria-invalid={!!errorOf("phone")}
                              aria-describedby="cd-phone-err"
                              className={`${inputCls} ${errorOf("phone") ? errCls : ""}`}
                            />
                            <FieldError id="cd-phone-err" message={errorOf("phone")} />
                          </div>
                        </div>

                        <textarea
                          ref={refs.message}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onFocus={() => setFocused(true)}
                          onBlur={() => {
                            setFocused(false);
                            touch("message")();
                          }}
                          aria-invalid={!!errorOf("message")}
                          aria-describedby="cd-msg-err"
                          onKeyDown={handleKeyDown}
                          rows={4}
                          placeholder={emptyPrompt ? typed || "Опишіть задачу…" : "Опишіть задачу…"}
                          className="mt-3 w-full resize-none bg-transparent px-1 text-[15px] leading-relaxed text-white outline-none placeholder:text-white/35"
                        />
                        <FieldError id="cd-msg-err" message={errorOf("message")} />

                        <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: service.color }} />
                            <span className="truncate text-[12px] text-white/50">{service.label}</span>
                          </div>
                          <button
                            type="submit"
                            disabled={status === "sending"}
                            aria-label="Надіслати заявку"
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-white/85 disabled:bg-white/15 disabled:text-white/40 ${
                              status === "sending" ? "animate-pulse" : ""
                            }`}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M12 19V5M5 12l7-7 7 7" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ContactDrawer;
