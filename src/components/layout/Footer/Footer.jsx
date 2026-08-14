import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Тонка градієнтна лінія для візуального відділення футера */}
      <div className={styles.footer__topGlow} aria-hidden="true" />

      <div className={`container ${styles.footer__container}`}>
        <div className={styles.footer__grid}>
          {/* Блок з логотипом та описом */}
          <div className={styles.footer__brand}>
            <div className={styles.footer__logo}>
              {/* Іконка хмари (можете замінити на свій SVG логотип) */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
              <span>CloudBASE</span>
            </div>
            <p className={styles.footer__desc}>
              Професійний хмарний хостинг та технічна підтримка рішень BAS для
              вашого бізнесу. Працюйте звідусіль надійно та без перебоїв.
            </p>
          </div>

          {/* Навігація */}
          <div className={styles.footer__nav}>
            <h4 className={styles.footer__title}>Навігація</h4>
            <ul className={styles.footer__list}>
              <li>
                <Link href="/">Головна</Link>
              </li>
              <li>
                <Link href="/cloud">Хмара</Link>
              </li>
              <li>
                <Link href="/bas">BAS</Link>
              </li>
              <li>
                <Link href="/about">Про нас</Link>
              </li>
            </ul>
          </div>

          {/* Послуги */}
          <div className={styles.footer__nav}>
            <h4 className={styles.footer__title}>Послуги</h4>
            <ul className={styles.footer__list}>
              <li>
                <Link href="/services#cloud">Оренда сервера</Link>
              </li>
              <li>
                <Link href="/services#install">Встановлення ПЗ</Link>
              </li>
              <li>
                <Link href="/services#support">Супровід баз</Link>
              </li>
              <li>
                <Link href="/services#backup">Резервне копіювання</Link>
              </li>
            </ul>
          </div>

          {/* Контакти */}
          <div className={styles.footer__nav}>
            <h4 className={styles.footer__title}>Контакти</h4>
            <ul className={styles.footer__list}>
              <li>
                <a href="tel:+380000000000">+38 (000) 000-00-00</a>
              </li>
              <li>
                <a href="mailto:info@cloudbase.ua">info@cloudbase.ua</a>
              </li>
              <li className={styles.footer__socials}>
                {/* Соціальні мережі (TG / Viber) */}
                <a href="#" aria-label="Telegram">
                  TG
                </a>
                <a href="#" aria-label="Viber">
                  VB
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижній рядок з копірайтом */}
        <div className={styles.footer__bottom}>
          <p>© {currentYear} CloudBASE. Всі права захищено.</p>
          <div className={styles.footer__legal}>
            <Link href="/privacy">Політика конфіденційності</Link>
            <Link href="/terms">Договір оферти</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
