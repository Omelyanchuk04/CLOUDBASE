import React from "react";
import styles from "./BasSteps.module.scss";

const STEPS = [
  {
    num: "01",
    title: "Заявка на сайті",
    text: "Залиште свої контактні дані у формі зворотного зв'язку або зателефонуйте нам.",
  },
  {
    num: "02",
    title: "Попередня консультація",
    text: "Обговоримо ваші потреби, проаналізуємо задачі та підберемо оптимальне рішення.",
  },
  {
    num: "03",
    title: "Підписання договору",
    text: "Узгоджуємо технічне завдання та фіксуємо терміни й вартість робіт офіційно.",
  },
  {
    num: "04",
    title: "Оплата послуг",
    text: "Після проведення оплати згідно з договором, наші спеціалісти розпочинають роботу.",
  },
];

export const BasSteps = () => {
  return (
    <section className={styles.steps}>
      <div className={styles.container}>
        <h2 className={styles.title}>Етапи</h2>

        {/* НОВИЙ СКЛЯНИЙ КОНТЕЙНЕР-ОБГОРТКА */}
        <div className={styles.glassWrapper}>
          <div className={styles.grid}>
            {STEPS.map((step, index) => (
              <div key={index} className={styles.stepCard}>
                <div className={styles.num}>{step.num}</div>
                <h3>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
