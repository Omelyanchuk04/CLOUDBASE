"use client";

import React from "react";
import Link from "next/link";
import { MacbookScroll } from "@/components/UI/MacbookScroll/MacbookScroll";
import styles from "./MacbookSection.module.scss";

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

const MacbookSection = () => {
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
            <span className={styles.title}>
              Обслуговування бухгалтерських програм
            </span>
            <br />
            <span className={styles.subtitle}>
              Встановлюємо, налаштовуємо й переносимо дані в хмару. Забезпечуємо
              стабільну роботу та технічну підтримку.
            </span>
            <br />
            <Link
              href="/BAS"
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
          </div>
        }
        src={`/main/BAS-img.jpg`}
        showGradient={false}
      />
    </section>
  );
};

export default MacbookSection;
