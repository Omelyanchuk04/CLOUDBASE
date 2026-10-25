"use client";

import React from "react";
import Link from "next/link";
import { MacbookScroll } from "@/components/UI/MacbookScroll/MacbookScroll";
import styles from "./MacbookSection.module.scss";

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
              Впровадження, обслуговування та супровід BAS
            </span>
            <br />
            <span className={styles.subtitle}>
              Допомагаємо з установкою, налаштуванням та перенесенням ваших
              даних на хмару. Забезпечуємо безперебійну роботу, технічну
              підтримку та індивідуальні допрацювання конфігурацій.
            </span>
            <br />
            <Link href="/BAS" className={styles.learnMoreBtn}>
              Дізнатися більше <span className={styles.arrow}>&rarr;</span>
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
