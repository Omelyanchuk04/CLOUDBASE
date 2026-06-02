import { WORK_STEPS } from "@/lib/constants";
import styles from "./HowWeWork.module.scss";

export function HowWeWork() {
  return (
    <section className={`section ${styles.how}`}>
      <div className="container">
        <div className={styles.how__layout}>
          {/* Left — sticky header */}
          <div className={styles.how__left}>
            <p className="t-label">Як ми працюємо</p>
            <h2 className={`t-headline ${styles.how__title}`}>
              Просто.
              <br />
              <span className={styles.how__titleDim}>Прозоро.</span>
            </h2>
            <p className={`t-body-lg ${styles.how__sub}`}>
              Жодної бюрократії. Пояснюємо що і чому, погоджуємо вартість до
              початку робіт.
            </p>
            <a
              href="/contacts"
              className={`btn btn--primary ${styles.how__cta}`}
            >
              Почати роботу
            </a>
          </div>

          {/* Right — steps */}
          <ol className={`stagger ${styles.how__steps}`}>
            {WORK_STEPS.map((step) => (
              <li key={step.step} className={styles.step}>
                <span className={styles.step__num}>{step.step}</span>
                <div className={styles.step__body}>
                  <h3 className={`t-title-2 ${styles.step__title}`}>
                    {step.title}
                  </h3>
                  <p className={`t-caption ${styles.step__detail}`}>
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
