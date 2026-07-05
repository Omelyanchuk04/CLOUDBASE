"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
// LOGO та logo імпортуються як у вас
import logo from "../../ui/icons/Logo/logo-img.png";
import styles from "./Header.module.scss";

interface INavItem {
  label: string;
  href: string;
}

const navList: INavItem[] = [
  { label: "Хмара", href: "!#" },
  { label: "BAS", href: "!#" },
  { label: "Послуги", href: "!#" },
  { label: "Про нас", href: "!#" },
  { label: "Контакти", href: "!#" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerContent = (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      {/* Видалено: &__top_shadow - вона більше не потрібна */}

      <div className={styles.header__container}>
        {/* Логотип */}
        <div className={styles.header__logo_container}>
          <Link href="/" className={styles.header__logo}>
            <img src={logo.src} alt="CloudBase Logo" />
          </Link>
        </div>

        {/* Навігація (Острівець зі склом) */}
        <nav className={styles.header__nav}>
          {navList.map((item) => (
            <Link key={item.label} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Кнопка дії */}
        <div className={styles.header__actions}>
          <Link
            href="https://t.me/androniv"
            target="_blank"
            className={styles.header__button}
          >
            Зв'язатися
          </Link>
        </div>
      </div>
    </header>
  );

  if (!isMounted) {
    return headerContent;
  }

  return createPortal(headerContent, document.body);
};
