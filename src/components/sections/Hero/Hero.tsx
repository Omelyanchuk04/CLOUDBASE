import { HERO } from "@/lib/constants";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__grid} aria-hidden="true" />

      <div className={`container ${styles.hero__inner}`}>
        {/* Eyebrow */}
        <div
          className={`badge badge--outline ${styles.hero__badge} animate-fade-up`}
        >
          <span className={styles.hero__dot} aria-hidden="true" />
          {HERO.badge}
        </div>

        {/* Heading */}
        <h1 className={`t-display ${styles.hero__heading} animate-fade-up`}>
          {HERO.heading[0]}
          <br />
          <span className={styles.hero__headingDim}>{HERO.heading[1]}</span>
        </h1>

        {/* Subheading — простіший текст */}
        <p className={`t-body-lg ${styles.hero__sub} animate-fade-up`}>
          {HERO.subheading}
        </p>

        {/* CTAs */}
        <div className={`${styles.hero__ctas} animate-fade-up`}>
          <a href={HERO.ctas.primary.href} className="btn btn--primary btn--lg">
            {HERO.ctas.primary.label}
          </a>
          <a
            href={HERO.ctas.secondary.href}
            className="btn btn--outline btn--lg"
          >
            {HERO.ctas.secondary.label}
          </a>
        </div>

        {/* Довіра — проста рядок */}
        <p className={`t-caption ${styles.hero__trust} animate-fade-up`}>
          Більше 150 підприємств вже працюють з нами
        </p>

        {/* Scroll indicator */}
        <div className={styles.hero__scroll} aria-hidden="true">
          <div className={styles.hero__scrollLine} />
        </div>
      </div>
    </section>
  );
}
