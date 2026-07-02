"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import logoPic from "../../ui/icons/Logo/logo.png";

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
      <div className={styles.header__container}>
        {/* Логотип */}
        <div className={styles.header__logo_container}>
          <Link href="/" className={styles.header__logo}>
            <Image src={logoPic} alt="Logo" height={45} />
          </Link>
        </div>

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
};
