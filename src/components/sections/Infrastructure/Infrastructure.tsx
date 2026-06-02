import { INFRASTRUCTURE, STATS, type InfraItem } from "@/lib/constants";
import styles from "./Infrastructure.module.scss";

export function Infrastructure() {
  return (
    <section className={`section ${styles.infra}`}>
      <div className="container">
        <header className={styles.infra__header}>
          <p className="t-label">Інфраструктура</p>
          <h2 className={`t-headline ${styles.infra__title}`}>
            Надійність —<br />
            <span className={styles.infra__titleDim}>не маркетинг.</span>
          </h2>
          <p className={`t-body-lg ${styles.infra__sub}`}>
            Два фізичних сервери, акумулятори LiFePO₄ та два незалежних
            інтернет-канали. Ось що стоїть за гарантованим аптаймом.
          </p>
        </header>

        {/* Stats bar */}
        <div className={styles.infra__statsBar}>
          {STATS.map((s) => (
            <div key={s.label} className={`stat ${styles.infra__statItem}`}>
              <span className="stat__number">{s.number}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Specs */}
        <div className={styles.infra__specs}>
          {INFRASTRUCTURE.map((spec: InfraItem) => (
            <div key={spec.label} className={styles.specRow}>
              <span className={`t-label ${styles.specRow__label}`}>
                {spec.label}
              </span>
              <span className={`t-title-2 ${styles.specRow__value}`}>
                {spec.value}
              </span>
              <span className={`t-caption ${styles.specRow__detail}`}>
                {spec.detail}
              </span>
            </div>
          ))}
        </div>

        <p className={`t-caption ${styles.infra__note}`}>
          Публічна сторінка статусу з графіком аптайму — доступна без
          реєстрації.{" "}
          <a href="/status" className={styles.infra__noteLink}>
            Переглянути статус →
          </a>
        </p>
      </div>
    </section>
  );
}
