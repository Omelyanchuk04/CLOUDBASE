"use client";

import React from "react";
import Link from "next/link"; // Додано імпорт Link
import { MacbookScroll } from "@/components/ui/MacbookScroll/MacbookScroll";
import styles from "./MacbookSection.module.scss";

export const MacbookSection = () => {
  return (
    <div className={styles.section}>
      {/* ФІРМОВІ ПЛЯМИ ФОНУ */}
      <div className={styles.blobContainer} aria-hidden="true">
        <div className={styles.blobPink} />
        <div className={styles.blobPurple} />
        <div className={styles.blobBlue} />
      </div>

      {/* ГЕОМЕТРИЧНІ ДЕКОРАЦІЇ */}
      <div className={styles.bgDecorations} aria-hidden="true">
        <div className={styles.pillYellow}></div>
        <div className={styles.dotRed}></div>
        <div className={styles.dotGreen}></div>
        <div className={styles.dotBlue}></div>
        <div className={styles.ringPurple}></div>
        <div className={styles.triangleOrange}></div>
      </div>

      <MacbookScroll
        title={
          <div className={styles.titleWrapper}>
            <span className={styles.title}>
              Впровадження, обслуговування та супровід BAS
            </span>
            <br />
            <span className={styles.subtitle}>
              Допомагаємо з установкою, налаштуванням та перенесенням ваших
              даних на хмару. Забезпечуємо безперебійну роботу, технічну
              підтримку та індивідуальні допрацювання конфігурацій.
            </span>
            <br />
            {/* НОВА КНОПКА */}
            <Link href="/BAS" className={styles.learnMoreBtn}>
              Дізнатися більше <span className={styles.arrow}>&rarr;</span>
            </Link>
          </div>
        }
        src={`/main/BAS-img.jpg`} // Твій шлях до фото
        showGradient={false}
      />
    </div>
  );
};
