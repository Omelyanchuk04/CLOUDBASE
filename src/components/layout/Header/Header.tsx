"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Відстежуємо скрол для ефекту "скла"
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Логотип */}
        <Link href="/" className={styles.logo}>
          <span>CLOUD</span>
          <span className={styles.accent}>BASE</span>
        </Link>

        {/* Навігація */}
        <nav className={styles.nav}>
          <Link href="#services" className={styles.link}>
            Послуги
          </Link>
          <Link href="#infrastructure" className={styles.link}>
            Інфраструктура
          </Link>
          <Link href="#pricing" className={styles.link}>
            Тарифи
          </Link>
        </nav>

        {/* Кнопка дії */}
        <div className={styles.actions}>
          <Link
            href="https://t.me/androniv"
            target="_blank"
            className={styles.button}
          >
            Зв'язатися
          </Link>
        </div>
      </div>
    </header>
  );
};
