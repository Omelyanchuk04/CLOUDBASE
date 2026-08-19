import React from "react";
import styles from "./BasSteps.module.scss";

const STEPS = [
  {
    num: "01",
    title: "Аудит",
    text: "Вивчаємо процеси компанії та збираємо вимоги.",
  },
  {
    num: "02",
    title: "Складання ТЗ",
    text: "Формуємо технічне завдання з фіксованою вартістю.",
  },
  {
    num: "03",
    title: "Розробка",
    text: "Програмуємо модулі та налаштовуємо інтеграції.",
  },
  {
    num: "04",
    title: "Впровадження",
    text: "Переносимо дані, навчаємо та підтримуємо.",
  },
];

export const BasSteps = () => {
  return (
    <section className={styles.steps}>
      <div className={styles.container}>
        <h2 className={styles.title}>Як ми працюємо</h2>

        <div className={styles.grid}>
          {STEPS.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.num}>{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
