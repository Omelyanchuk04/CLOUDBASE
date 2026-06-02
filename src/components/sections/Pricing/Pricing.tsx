import { PRICING_TIERS } from "@/lib/constants";
import styles from "./Pricing.module.scss";

export function Pricing() {
  return (
    <section className={`section ${styles.pricing}`}>
      <div className="container">
        {/* Header */}
        <header className={styles.pricing__header}>
          <p className="t-label">Тарифи</p>
          <h2 className={`t-headline ${styles.pricing__title}`}>
            Прозора ціна.
          </h2>
          <p className={`t-body-lg ${styles.pricing__sub}`}>
            Абонентське обслуговування або разові роботи — погоджуємо вартість
            до початку, без сюрпризів.
          </p>
        </header>

        {/* Cards — 4 columns */}
        <div className={`stagger ${styles.pricing__grid}`}>
          {PRICING_TIERS.map((tier) => (
            <article
              key={tier.id}
              className={`${styles.pricingCard} ${
                tier.highlight ? styles.pricingCard__highlighted : ""
              }`}
            >
              {tier.highlight && (
                <div className={styles.pricingCard__badge}>Популярний</div>
              )}

              <div className={styles.pricingCard__header}>
                <h3 className={`${styles.pricingCard__name}`}>{tier.name}</h3>

                <div className={styles.pricingCard__price}>
                  {tier.price !== null ? (
                    <>
                      <span className={styles.pricingCard__priceNum}>
                        {tier.price.toLocaleString("uk-UA")}
                      </span>
                      <span className={styles.pricingCard__pricePer}>
                        грн / {tier.period}
                      </span>
                    </>
                  ) : (
                    <span className={styles.pricingCard__priceCustom}>
                      {tier.priceNote}
                    </span>
                  )}
                </div>

                <p className={`t-caption ${styles.pricingCard__desc}`}>
                  {tier.description}
                </p>
              </div>

              <ul className={styles.pricingCard__features}>
                {tier.features.map((f) => (
                  <li key={f} className={styles.pricingCard__feature}>
                    <span
                      className={styles.pricingCard__check}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="t-caption">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`/contacts?plan=${tier.id}`}
                className={`btn w-full ${
                  tier.highlight ? "btn--primary" : "btn--outline"
                } ${styles.pricingCard__cta}`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        <p className={`t-caption text-center ${styles.pricing__note}`}>
          Потрібна кастомна конфігурація або разова робота?{" "}
          <a href="/contacts" className={styles.pricing__noteLink}>
            Напишіть нам →
          </a>
        </p>
      </div>
    </section>
  );
}
