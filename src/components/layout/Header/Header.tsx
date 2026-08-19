"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import logo from "../../ui/icons/Logo/logo-single.png";
import styles from "./Header.module.scss";

interface INavItem {
  label: string;
  href: string;
}

const navList: INavItem[] = [
  { label: "Хмара", href: "!#" },
  { label: "BAS", href: "/BAS" },
  // { label: "Послуги", href: "!#" },
  { label: "Про нас", href: "!#" },
  { label: "Контакти", href: "!#" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Блокуємо скрол сторінки при відкритому меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const headerContent = (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.header__container}>
          {/* Логотип */}
          <div className={styles.header__logo_container}>
            <Link href="/" className={styles.header__logo} onClick={closeMenu}>
              <img src={logo.src} alt="CloudBase Logo" />
              <span className={styles.header__logo_text}>CLOUDBASE</span>
            </Link>
          </div>

          {/* Десктопна навігація */}
          <nav className={styles.header__nav}>
            {navList.map((item) => (
              <Link key={item.label} href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.header__actions}>
            {/* Кнопка зв'язку (тепер видима і на мобільних) */}
            <Link
              href="https://t.me/androniv"
              target="_blank"
              className={styles.header__button}
            >
              Зв'язатися
            </Link>

            {/* Футуристичний бургер */}
            <button
              className={`${styles.header__burger} ${isMenuOpen ? styles.open : ""}`}
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <div className={styles.burger__lines}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* === ПОВНОЕКРАННЕ ФУТУРИСТИЧНЕ МЕНЮ === */}
      <div
        className={`${styles.fullscreenMenu} ${isMenuOpen ? styles.open : ""}`}
      >
        {/* Неонове світіння на фоні меню */}
        <div className={styles.fullscreenMenu__glow} />

        <div className={styles.fullscreenMenu__inner}>
          <nav className={styles.fullscreenMenu__nav}>
            {navList.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.fullscreenMenu__link}
                onClick={closeMenu}
                style={{ "--i": index + 1 } as React.CSSProperties}
              >
                <span className={styles.link__text}>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div
            className={styles.fullscreenMenu__footer}
            style={{ "--i": navList.length + 1 } as React.CSSProperties}
          >
            <Link
              href="https://t.me/androniv"
              target="_blank"
              className={styles.fullscreenMenu__btn}
              onClick={closeMenu}
            >
              <span className={styles.btn__text}>Отримати консультацію</span>
              <span className={styles.btn__icon}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  if (!isMounted) return headerContent;
  return createPortal(headerContent, document.body);
};
