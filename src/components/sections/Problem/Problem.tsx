import { PROBLEMS } from "@/lib/constants";
import styles from "./Problem.module.scss";

export function Problem() {
  return (
    <section className={`section ${styles.problem}`}>
      <div className="container">
        {/* Header */}
        <header className={styles.problem__header}>
          <p className="t-label">Проблема</p>
          <h2 className={`t-headline ${styles.problem__title}`}>
            Блекаут —<br />
            <span className={styles.problem__titleDim}>не ваша проблема.</span>
          </h2>
          <p className={`t-body-lg ${styles.problem__sub}`}>
            Ми взяли на себе безперебійну роботу інфраструктури, щоб ви
            зосередились на бізнесі.
          </p>
        </header>

        {/* Comparison grid */}
        <div className={styles.problem__grid}>
          {/* Column labels */}
          <div className={styles.problem__colHead}>
            <span className={`t-label ${styles.problem__colBad}`}>
              ✕ &nbsp;Без CloudBASe
            </span>
            <span className={`t-label ${styles.problem__colGood}`}>
              ✓ &nbsp;З CloudBASe
            </span>
          </div>

          {/* Rows */}
          {PROBLEMS.map((item, i) => (
            <div key={i} className={styles.problem__row}>
              <div
                className={`${styles.problem__cell} ${styles.problem__cell__bad}`}
              >
                <span className={styles.problem__cellIcon} aria-hidden="true">
                  ✕
                </span>
                <p className="t-body">{item.without}</p>
              </div>
              <div
                className={`${styles.problem__cell} ${styles.problem__cell__good}`}
              >
                <span className={styles.problem__cellIcon} aria-hidden="true">
                  ✓
                </span>
                <p className="t-body">{item.with}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
