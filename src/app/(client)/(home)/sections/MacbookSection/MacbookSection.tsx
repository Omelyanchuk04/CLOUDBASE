"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MacbookScroll } from "@/components/UI/MacbookScroll/MacbookScroll";
import styles from "./MacbookSection.module.scss";
import { scrollToSection } from "@/lib/utils/scrollToSection";

// Скляна кнопка: відблиск слідує за курсором.
// Тільки для миші, на сенсорному екрані цей ефект не потрібен
const handleGlassMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
  el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
};

const handleGlassLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget;
  el.style.removeProperty("--gx");
  el.style.removeProperty("--gy");
};

// Поява при відкритті сторінки: заголовок, підзаголовок і кнопка по черзі
// піднімаються знизу. Лише transform і opacity
const ease = [0.16, 1, 0.3, 1] as const;

const MacbookSection = () => {
  const reduce = !!useReducedMotion();
  const appear = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section className={styles.section} data-theme="dark">
      <div className={styles.blobContainer} aria-hidden="true">
        <div className={styles.blobPink} />
        <div className={styles.blobPurple} />
        <div className={styles.blobBlue} />
      </div>

      <MacbookScroll
        title={
          <div className={styles.titleWrapper}>
            <motion.h1
              className={styles.title}
              style={{ textWrap: "balance", maxWidth: "17em" }}
              {...appear(0.1)}
            >
              Обслуговування бухгалтерських програм BAS і KBS
            </motion.h1>
            <br />
            <motion.span className={styles.subtitle} {...appear(0.25)}>
              Встановлюємо, налаштовуємо й переносимо дані в хмару. Забезпечуємо
              стабільну роботу та технічну підтримку.
            </motion.span>
            <br />
            <motion.span className="inline-block" {...appear(0.4)}>
            {/* Веде до форми заявки внизу цієї ж сторінки */}
            <Link
              href="/#application"
              onClick={(e) => {
                if (scrollToSection("application")) e.preventDefault();
              }}
              className={styles.glassBtn}
              onPointerMove={handleGlassMove}
              onPointerLeave={handleGlassLeave}
            >
              <span className={styles.glassLabel}>Отримати консультацію</span>
              <svg
                className={styles.arrow}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            </motion.span>
          </div>
        }
        src={`/main/BAS-img.jpg`}
        showGradient={false}
      />
    </section>
  );
};

export default MacbookSection;
