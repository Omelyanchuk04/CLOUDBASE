import React from "react";
import Link from "next/link";
import styles from "./BasCta.module.scss";

export const BasCta = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.content}>
            <h2>Потрібне нестандартне рішення?</h2>
            <p>
              Залиште заявку на безкоштовну консультацію. Наш спеціаліст
              проаналізує вашу задачу та запропонує оптимальний варіант.
            </p>
          </div>
          <Link href="/contacts" className={styles.btn}>
            Отримати консультацію
          </Link>
        </div>
      </div>
    </section>
  );
};
