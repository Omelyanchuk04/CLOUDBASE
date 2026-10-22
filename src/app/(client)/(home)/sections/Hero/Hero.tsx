"use client";

import React from "react";
import styles from "./Hero.module.scss";
import { MacbookPro } from "./MacbookPro"; // Шлях до вашого файлу з SVG

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      {/* Текстова частина (Перенесена з Header) */}
      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>
          Підтримка KBS. BAS. 1C.
          <br />
          Швидко. Безпечно. В хмарі.
        </h1>
        <p className={styles.hero__subtitle}>
          Професійний супровід вашого бухгалтерського ПЗ від CloudBASE.
          <br />
          Дбаємо про ваш бізнес 24/7.
        </p>
      </div>

      {/* Секція з пристроями */}
      <div className={styles.hero__showcase}>
        {/* Світіння на фоні (кольори CloudBASE) */}
        <div className={styles.hero__glow}></div>

        {/* 1. Настільний монітор (ПК - Windows) */}
        <div className={styles.monitor}>
          <div className={styles.monitor__screen}>
            {/* Картинка BAS для ПК */}
            <img src="/bas-pc.png" alt="BAS Software on Windows PC" />
          </div>
          <div className={styles.monitor__stand}></div>
          <div className={styles.monitor__base}></div>
        </div>

        {/* 2. Ваш MacBook Pro (macOS) */}
        <div className={styles.macbook}>
          {/* Картинка BAS для Mac */}
          <MacbookPro src="/bas-mac.png" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
