"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Service = {
  id: string;
  label: string;
  color: string;
  hint: string;
  examples: string[];
};

// Напрямки з секцій сервісів. Для кожного свої приклади запитів
// у полі та короткий опис, щоб вибір щось пояснював
const services: Service[] = [
  {
    id: "bas",
    label: "Супровід BAS",
    color: "#48c6ef",
    hint: "Оновлення, налаштування конфігурацій і технічна підтримка BAS.",
    examples: [
      "Після оновлення BAS не проводяться документи…",
      "Потрібно налаштувати обмін даними з банком…",
    ],
  },
  {
    id: "kbs",
    label: "Системи KBS",
    color: "#84fab0",
    hint: "Супровід KBS: актуальні звітні форми та стабільна робота баз.",
    examples: [
      "Не формується звітна форма за новий квартал…",
      "Потрібна перевірка бази KBS після збою…",
    ],
  },
  {
    id: "custom",
    label: "Допрацювання",
    color: "#fde047",
    hint: "Нестандартні звіти, обробки, друковані форми та нові функції під ваші процеси.",
    examples: [
      "Потрібен звіт, якого немає в стандартній конфігурації…",
      "Хочу додати друковану форму для накладних…",
    ],
  },
  {
    id: "cloud",
    label: "Хмара 24/7",
    color: "#d57eeb",
    hint: "Віддалений доступ до баз, розгортання та щоденне резервне копіювання.",
    examples: [
      "Хочу перенести базу у хмару з доступом з будь-якого місця…",
      "Потрібне щоденне резервне копіювання бази…",
    ],
  },
  {
    id: "other",
    label: "Інше",
    color: "#fca5a5",
    hint: "Питання, які не підходять під інші напрямки. Опишіть задачу своїми словами.",
    examples: [
      "Є питання, які не стосуються цих напрямків…",
      "Потрібна консультація щодо роботи мого бізнесу…",
    ],
  },
];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/30";

// Ефект друкування: пише текст, пауза, стирає і переходить до наступного
const useTypewriter = (texts: string[], enabled: boolean) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!enabled) return;

    setText("");

    let index = 0;
    let chars = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = texts[index];

      if (!deleting) {
        chars += 1;
        setText(full.slice(0, chars));
        if (chars === full.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
        } else {
          timer = setTimeout(tick, 45);
        }
      } else {
        chars -= 1;
        setText(full.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          index = (index + 1) % texts.length;
          timer = setTimeout(tick, 350);
        } else {
          timer = setTimeout(tick, 20);
        }
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [texts, enabled]);

  return text;
};

const ArrowUp = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const ClipIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ApplicationForm = () => {
  const [serviceId, setServiceId] = useState(services[0].id);
  const service = services.find((s) => s.id === serviceId) ?? services[0];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  // Приклади беруться з обраного напрямку, тож друк змінюється разом із вибором
  const emptyPrompt = !focused && message === "";
  const typed = useTypewriter(service.examples, emptyPrompt);

  const canSend =
    name.trim() !== "" && phone.trim() !== "" && message.trim() !== "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend || status === "sending") return;

    setStatus("sending");
    // TODO: замініть на реальний запит (API, пошта або Telegram-бот).
    // Передайте service.label, name, phone, message і fileName
    setTimeout(() => setStatus("sent"), 1200);
  };

  // Enter надсилає, Shift+Enter дає новий рядок
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setName("");
    setPhone("");
    setMessage("");
    setFileName("");
  };

  return (
    <section
      id="application"
      data-theme="dark"
      className="relative w-full overflow-hidden bg-[#08080c] pb-24 pt-44 text-white md:pb-32 md:pt-56"
    >
      {/* Перехід із попередньої світлої секції. Починається з того самого
          кольору, що фон кроків (#ebebf0), і поступово темніє до фону цієї
          секції. pointer-events-none, щоб шапка не брала колір градієнта */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[240px]"
        style={{
          background:
            "linear-gradient(to bottom, #ebebf0 0%, #d3cfdc 20%, #b0abbf 38%, #7d7890 55%, #3b3749 72%, #17151e 88%, #08080c 100%)",
        }}
      />

      {/* Невидимий маркер для шапки. Поки він під шапкою, шапка світла,
          бо фон там ще світлий. Висота відповідає світлій частині градієнта */}
      <div
        data-theme="light"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[100px]"
      />

      {/* Декоративне світло */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[38%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[#d57eeb]/20 blur-[120px]" />
        <div className="absolute -bottom-32 right-0 h-[380px] w-[520px] rounded-full bg-[#48c6ef]/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[860px] px-6">
        {/* Заголовок: на телефоні зліва, на ПК по центру */}
        <div className="text-left md:text-center">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Опишіть задачу.{" "}
            <span className="text-white/40">Ми подбаємо про решту.</span>
          </h2>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/55 md:mx-auto md:text-lg">
            Залиште контакти та опис. Наш менеджер зв'яжеться з вами, щоб
            уточнити деталі й запропонувати рішення.
          </p>
        </div>

        {/* Вибір напрямку. Від нього залежать приклади в полі нижче
            і опис під тегами, тож вибір щось пояснює */}
        <div className="mt-12 md:mt-16">
          <p className="mb-4 text-left text-xs font-medium uppercase tracking-[0.2em] text-white/40 md:text-center">
            Оберіть напрямок
          </p>

          <div className="flex flex-wrap justify-start gap-2.5 md:justify-center">
            {services.map((s) => {
              const active = s.id === serviceId;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceId(s.id)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "border-white bg-white text-black"
                      : "border-white/15 text-white/70 hover:border-white/35 hover:text-white"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Опис обраного напрямку. key змушує анімацію відіграти при зміні */}
          <motion.p
            key={service.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-4 text-left text-sm leading-relaxed text-white/55 md:text-center"
          >
            <span
              className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
              style={{ backgroundColor: service.color }}
            />
            {service.hint}
          </motion.p>
        </div>

        {/* Картка з обертовою рамкою. На фокусі рамка яскравіша */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mt-6 rounded-[1.5rem] p-px shadow-[0_40px_80px_-30px_rgba(213,126,235,0.35)] md:mt-8"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.5rem]">
            <div className="absolute left-1/2 top-1/2 -ml-[600px] -mt-[600px] h-[1200px] w-[1200px] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,#48c6ef,#d57eeb,#fccb90,#84fab0,#48c6ef)] opacity-40 transition-opacity duration-500 group-focus-within:opacity-100 motion-reduce:animate-none" />
          </div>

          <div className="relative rounded-[calc(1.5rem_-_1px)] bg-[#0e0e14] p-5 md:p-7">
            {status === "sent" ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-black shadow-[0_0_40px_-4px_#84fab0]"
                  style={{ backgroundColor: "#84fab0" }}
                >
                  <CheckIcon />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                  Заявку отримано
                </h3>
                <p className="mt-2 max-w-sm text-sm text-white/55">
                  Напрямок: {service.label}. Ми зв'яжемося з вами протягом
                  робочого дня.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-6 text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Надіслати ще одну
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше ім'я"
                    autoComplete="name"
                    className={inputCls}
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+380 __ ___ __ __"
                    autoComplete="tel"
                    className={inputCls}
                  />
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={handleKeyDown}
                  rows={4}
                  placeholder={
                    emptyPrompt ? typed || "Опишіть задачу…" : "Опишіть задачу…"
                  }
                  className="w-full resize-none bg-transparent px-1 text-base leading-relaxed text-white outline-none placeholder:text-white/35"
                />

                <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <label className="flex min-w-0 cursor-pointer items-center gap-2 text-white/50 transition-colors hover:text-white">
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) =>
                        setFileName(e.target.files?.[0]?.name ?? "")
                      }
                    />
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10">
                      <ClipIcon />
                    </span>
                    {fileName && (
                      <span className="truncate text-xs">{fileName}</span>
                    )}
                  </label>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden text-xs text-white/35 sm:inline">
                      ↵ надіслати
                    </span>
                    <button
                      type="submit"
                      disabled={!canSend || status === "sending"}
                      aria-label="Надіслати заявку"
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all duration-200 hover:scale-105 active:scale-95 disabled:bg-white/15 disabled:text-white/40 disabled:hover:scale-100 ${
                        status === "sending" ? "animate-pulse" : ""
                      }`}
                    >
                      <ArrowUp />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        <p className="mt-8 text-left text-xs text-white/40 md:text-center">
          Відповідаємо протягом 1 робочого дня · Консультація безкоштовна · Без
          зобов'язань
        </p>
      </div>
    </section>
  );
};

export default ApplicationForm;
