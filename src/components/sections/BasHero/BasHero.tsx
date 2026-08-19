import React from "react";
import Link from "next/link";
import styles from "./BasHero.module.scss";

export const BasHero = () => {
  return (
    <section className={styles.hero}>
      {/* Плями звідси ПРИБРАНО, вони тепер глобальні у page.tsx */}
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Комплексна автоматизація</span>
          <h1 className={styles.title}>
            Впровадження та доопрацювання систем BAS
          </h1>
          <p className={styles.subtitle}>
            Адаптуємо типові конфігурації під специфіку вашого бізнесу.
            Налаштуємо обмін даними, створимо кастомні звіти та автоматизуємо
            рутину.
          </p>
          <div className={styles.actions}>
            <Link href="/contacts" className={styles.btnPrimary}>
              Замовити консультацію
            </Link>
            <Link href="#services" className={styles.btnSecondary}>
              Переглянути послуги
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
