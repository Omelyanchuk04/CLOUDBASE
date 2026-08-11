"use client";

import React from "react";
import { MacbookScroll } from "@/components/ui/MacbookScroll/MacbookScroll";
import styles from "./MacbookSection.module.scss";

export const MacbookSection = () => {
  return (
    <div className={styles.section}>
      {/* Градієнтні кульки залишаються на фоні, але не впливають на скрол */}
      <div className={styles.glowContainer} aria-hidden="true">
        <div className={styles.glowPurple} />
        <div className={styles.glowBlue} />
        <div className={styles.glowCyan} />
        <div className={styles.glowPink} />
      </div>

      <MacbookScroll
        title={
          <div className={styles.titleWrapper}>
            <span className={styles.title}>
              Ваша бухгалтерія доступна звідусіль
            </span>
            <br />
            <span className={styles.subtitle}>
              Працюйте в BAS з будь-якого комп'ютера чи ноутбука. Безпечний
              доступ до ваших баз 24/7 з дому, офісу чи навіть під час
              відрядження.
            </span>
          </div>
        }
        src={`/main/BAS-img.jpg`} // Твій шлях до фото
        showGradient={false}
      />
    </div>
  );
};
