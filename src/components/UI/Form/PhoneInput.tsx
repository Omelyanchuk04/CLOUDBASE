"use client";

import React, { forwardRef, useState } from "react";
import {
  PHONE_PREFIX,
  caretAfterDigits,
  digitsBefore,
  formatPhone,
  normalizePhone,
} from "@/lib/utils/leadForm";

// Поле номера з маскою +380 XX XXX XX XX.
// value — лише 9 цифр після +380. Префікс не стирається, курсор не стрибає в кінець,
// Backspace перед пробілом видаляє цифру, вставка будь-якого формату (067…, +38 (067)…)
// перетворюється на правильний номер

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string;
  onValueChange: (digits: string) => void;
};

const PhoneInput = forwardRef<HTMLInputElement, Props>(({ value, onValueChange, onFocus, onBlur, ...rest }, ref) => {
  const [focused, setFocused] = useState(false);
  // Порожнє поле без фокуса показує плейсхолдер, з фокусом — префікс +380
  const shown = value || focused ? formatPhone(value) : "";

  const placeCaret = (el: HTMLInputElement, pos: number) => {
    requestAnimationFrame(() => el.setSelectionRange(pos, pos));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const raw = el.value;
    const caret = el.selectionStart ?? raw.length;
    const next = normalizePhone(raw);
    // Скільки цифр номера стоїть перед курсором у тому, що ввели
    const before = normalizePhone(raw.slice(0, caret)).length;
    onValueChange(next);
    placeCaret(el, caretAfterDigits(formatPhone(next), Math.min(before, next.length)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    if (start !== end) return; // виділення стирається звичайно

    if (e.key === "Backspace") {
      if (start <= PHONE_PREFIX.length) {
        // Префікс +380 не стирається
        e.preventDefault();
        return;
      }
      if (shown[start - 1] === " ") {
        // Курсор після пробілу: видаляємо цифру перед ним
        e.preventDefault();
        const n = digitsBefore(shown, start);
        const next = value.slice(0, n - 1) + value.slice(n);
        onValueChange(next);
        placeCaret(el, caretAfterDigits(formatPhone(next), n - 1));
      }
    }

    if (e.key === "Delete" && shown[start] === " ") {
      e.preventDefault();
      const n = digitsBefore(shown, start);
      const next = value.slice(0, n) + value.slice(n + 1);
      onValueChange(next);
      placeCaret(el, caretAfterDigits(formatPhone(next), n));
    }

    // Курсор не заходить у префікс стрілками і Home
    if ((e.key === "ArrowLeft" && start <= PHONE_PREFIX.length) || e.key === "Home") {
      e.preventDefault();
      placeCaret(el, PHONE_PREFIX.length);
    }
  };

  return (
    <input
      {...rest}
      ref={ref}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      value={shown}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={(e) => {
        setFocused(true);
        // Після фокусу курсор одразу після +380 або в кінці введеного
        placeCaret(e.target, formatPhone(value).length);
        onFocus?.(e);
      }}
      onClick={(e) => {
        const el = e.currentTarget;
        if ((el.selectionStart ?? 0) < PHONE_PREFIX.length) placeCaret(el, PHONE_PREFIX.length);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
    />
  );
});

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
