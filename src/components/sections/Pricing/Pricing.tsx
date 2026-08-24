import { PRICING_TIERS } from "@/lib/constants";
import styles from "./Pricing.module.scss";

export function Pricing() {
  return (
    <section className={styles.pricing}>
      {/* Великі розмиті плями на фоні (Apple Music style) */}
      <div className={styles.blobContainer} aria-hidden="true">
        <div className={styles.blobPink} />
        <div className={styles.blobPurple} />
        <div className={styles.blobBlue} />
      </div>

      <div className={styles.container}>
        <header className={styles.pricing__header}>
          <h2 className={styles.pricing__title}>Вартість послуг</h2>
          <p className={styles.pricing__sub}>
            Прозорі умови на впровадження, підтримку та хмарний хостинг. Без
            прихованих платежів.
          </p>
        </header>

        <div className={styles.pricing__grid}>
          {PRICING_TIERS.map((tier) => (
            <article
              key={tier.id}
              className={`${styles.pricingCard} ${
                tier.highlight ? styles.pricingCard__highlighted : ""
              }`}
            >
              {tier.highlight && (
                <div className={styles.pricingCard__badge}>Популярно</div>
              )}

              <div className={styles.pricingCard__header}>
                <h3 className={styles.pricingCard__name}>{tier.name}</h3>

                <p className={styles.pricingCard__desc}>{tier.description}</p>

                <div className={styles.pricingCard__price}>
                  {tier.price !== null ? (
                    <>
                      {tier.prefix && (
                        <span className={styles.pricingCard__pricePrefix}>
                          {tier.prefix}
                        </span>
                      )}
                      <span className={styles.pricingCard__priceNum}>
                        {tier.price.toLocaleString("uk-UA")}
                      </span>
                      <span className={styles.pricingCard__pricePer}>
                        грн {tier.period ? `/ ${tier.period}` : ""}
                      </span>
                    </>
                  ) : (
                    <span className={styles.pricingCard__priceCustom}>
                      {tier.priceNote}
                    </span>
                  )}
                </div>
              </div>

              <ul className={styles.pricingCard__features}>
                {tier.features.map((f, index) => (
                  <li key={index} className={styles.pricingCard__feature}>
                    <svg
                      className={styles.pricingCard__check}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* НОВА ЗАГАЛЬНА КНОПКА ПІД КАРТКАМИ */}
        <div className={styles.pricing__footer}>
          <a href="/contacts" className={styles.pricing__globalBtn}>
            Залишити заявку
          </a>
        </div>
      </div>
    </section>
  );
}
