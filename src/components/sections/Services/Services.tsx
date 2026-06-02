import { SERVICES } from "@/lib/constants";
import styles from "./Services.module.scss";

export function Services() {
  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container">
        {/* Header */}
        <header className={styles.services__header}>
          <p className="t-label">Послуги</p>
          <h2 className={`t-headline ${styles.services__title}`}>
            Що ми робимо.
          </h2>
          <p className={`t-body-lg ${styles.services__sub}`}>
            Від встановлення BAS на локальному комп'ютері до повного
            IT-аутсорсингу підприємства — беремо на себе будь-яку задачу.
          </p>
        </header>

        {/* Grid */}
        <div className={`stagger ${styles.services__grid}`}>
          {SERVICES.map((svc) => (
            <article
              key={svc.id}
              className={`${styles.serviceCard} ${svc.isCloud ? styles.serviceCard__cloud : ""}`}
            >
              {svc.isCloud && (
                <span className={styles.serviceCard__cloudBadge}>
                  Власна інфраструктура
                </span>
              )}

              <div className={styles.serviceCard__top}>
                <span className={styles.serviceCard__icon} aria-hidden="true">
                  {svc.icon}
                </span>
                <h3 className={`t-title-2 ${styles.serviceCard__title}`}>
                  {svc.title}
                </h3>
                <p className={`t-caption ${styles.serviceCard__desc}`}>
                  {svc.description}
                </p>
              </div>

              <div className={styles.serviceCard__footer}>
                <div className={styles.serviceCard__tags}>
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`badge badge--outline ${styles.serviceCard__tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={`/contacts?service=${svc.id}`}
                  className={`btn btn--ghost ${styles.serviceCard__link}`}
                >
                  Дізнатись більше →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
