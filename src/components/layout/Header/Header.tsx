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

  interface InavItem {
    label: string;
    href: string;
  }

  const navList: InavItem[] = [
    { label: "Хмара", href: "!#" },
    { label: "BAS", href: "!#" },
    { label: "Послуги", href: "!#" },
    { label: "Про нас", href: "!#" },
    { label: "Контакти", href: "!#" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Логотип */}
        <Link href="/" className={styles.logo}>
          <span>CLOUD</span>
          <span className={styles.accent}>BASE</span>
        </Link>

        <nav className={styles.nav}>
          {navList.map((item, index) => (
            <Link key={item.label} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
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
