"use client";

import { useRef, useState } from "react";

// Спільна логіка форм заявки: маска українського номера і перевірка полів.
// Використовується у формі «Залиште заявку» і в бічній панелі шапки

/* ---------------- Номер телефону ---------------- */

export const PHONE_PREFIX = "+380 ";
export const PHONE_DIGITS = 9; // цифр після +380

// Витягує 9 цифр після +380 з будь-якого введеного чи вставленого тексту:
// "0671234567", "380671234567", "+38 (067) 123-45-67", "67 123 45 67" тощо
export const normalizePhone = (raw: string): string => {
  let d = raw.replace(/\D/g, "");
  // Префікс 380 (буває двічі, якщо вставили повний номер у поле з +380)
  while (d.startsWith("380")) d = d.slice(3);
  // Старий формат 80XXXXXXXXX
  if (d.startsWith("80") && d.length >= 11) d = d.slice(2);
  // Код оператора не починається з 0: 067… → 67…
  d = d.replace(/^0+/, "");
  return d.slice(0, PHONE_DIGITS);
};

// 671234567 → "+380 67 123 45 67" (частково введене теж форматується)
export const formatPhone = (rest: string): string => {
  const groups = [rest.slice(0, 2), rest.slice(2, 5), rest.slice(5, 7), rest.slice(7, 9)].filter(Boolean);
  return PHONE_PREFIX + groups.join(" ");
};

// Позиція курсора у відформатованому рядку після n-ї цифри номера
export const caretAfterDigits = (formatted: string, n: number): number => {
  if (n <= 0) return PHONE_PREFIX.length;
  let count = 0;
  for (let i = PHONE_PREFIX.length; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) count++;
    if (count === n) return i + 1;
  }
  return formatted.length;
};

// Скільки цифр номера (без +380) стоїть до позиції pos у відформатованому рядку
export const digitsBefore = (formatted: string, pos: number): number =>
  formatted.slice(PHONE_PREFIX.length, Math.max(pos, PHONE_PREFIX.length)).replace(/\D/g, "").length;

/* ---------------- Перевірка полів ---------------- */

const NAME_RE = /^[A-Za-zА-Яа-яІіЇїЄєҐґЁё'’ʼ\- ]+$/;

export const validateName = (v: string): string | null => {
  const t = v.trim();
  if (!t) return "Вкажіть ім'я";
  if (!NAME_RE.test(t)) return "Лише літери, пробіл, апостроф або дефіс";
  if (t.replace(/[^A-Za-zА-Яа-яІіЇїЄєҐґЁё]/g, "").length < 2) return "Ім'я закоротке";
  if (t.length > 60) return "Ім'я задовге";
  return null;
};

export const validatePhone = (rest: string): string | null => {
  if (!rest) return "Вкажіть номер телефону";
  const left = PHONE_DIGITS - rest.length;
  if (left > 0) {
    const word = left === 1 ? "цифру" : left < 5 ? "цифри" : "цифр";
    return `Номер неповний: додайте ще ${left} ${word}`;
  }
  return null;
};

export const validateMessage = (v: string): string | null => {
  const t = v.trim();
  if (!t) return "Опишіть задачу";
  if (t.length < 10) return "Додайте трохи деталей, хоча б 10 символів";
  return null;
};

/* ---------------- Хук стану форми ---------------- */

type Field = "name" | "phone" | "message";

export const useLeadForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // лише 9 цифр після +380
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, phone: false, message: false });
  const [submitted, setSubmitted] = useState(false);

  const refs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const errors: Record<Field, string | null> = {
    name: validateName(name),
    phone: validatePhone(phone),
    message: validateMessage(message),
  };

  // Помилку показуємо після виходу з поля або після спроби надіслати,
  // а не з першої ж літери
  const errorOf = (f: Field) => (touched[f] || submitted ? errors[f] : null);
  const touch = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  // true — можна надсилати. Інакше показує всі помилки і ставить курсор у перше хибне поле
  const check = (): boolean => {
    setSubmitted(true);
    const first = (["name", "phone", "message"] as Field[]).find((f) => errors[f]);
    if (first) {
      refs[first].current?.focus();
      return false;
    }
    return true;
  };

  const reset = () => {
    setName("");
    setPhone("");
    setMessage("");
    setTouched({ name: false, phone: false, message: false });
    setSubmitted(false);
  };

  return {
    name, setName, phone, setPhone, message, setMessage,
    errors, errorOf, touch, check, reset, refs,
    phoneFull: phone.length === PHONE_DIGITS ? `+380${phone}` : "",
  };
};

/* ---------------- Надсилання заявки ---------------- */

export type Lead = {
  service: string;
  name: string;
  phone: string; // +380XXXXXXXXX
  message: string;
  source: string; // з якої форми
  website?: string; // приховане поле-пастка для ботів
};

// Надсилає заявку на /api/lead, звідки вона йде в Telegram.
// Повертає null, якщо все добре, або текст помилки для показу у формі
export const sendLead = async (lead: Lead): Promise<string | null> => {
  const fallback = "Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам";
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, page: window.location.pathname }),
    });
    if (res.ok) return null;
    const data = await res.json().catch(() => null);
    return (data && typeof data.error === "string" && data.error) || fallback;
  } catch {
    return "Немає з'єднання. Перевірте інтернет і спробуйте ще раз";
  }
};
