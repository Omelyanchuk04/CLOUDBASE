"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";
import logoPic from "../../ui/icons/Logo/logo.png";

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
      {/* Окремий шар для тіні, щоб вона не блокувала блюр у Chrome */}
      <div className={styles.header__top_shadow}></div>

      <div className={styles.header__container}>
        {/* Логотип */}
        <div className={styles.header__logo_container}>
          <Link href="/" className={styles.header__logo}>
            <Image src={logoPic} alt="Logo" height={45} />
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

  // До маунту і на сервері (SSR) рендеримо як звичайно: document
  // ще не існує на сервері, і без цього був би флеш/стрибок шапки
  // при першому кадрі.
  if (!isMounted) {
    return headerContent;
  }

  // Після маунту переносимо шапку порталом напряму в <body> — в обхід
  // УСІХ батьківських обгорток застосунку (лейаути, анімації переходів
  // між сторінками, теми). Якщо хоч одна з них має opacity, filter,
  // mask/clip-path, mix-blend-mode або will-change з цими властивостями,
  // вона стає "backdrop root" і зрізає backdrop-filter ще до того, як
  // він дістанеться реального фону сторінки. Портал робить цю обгортку
  // неважливою: шапка тепер прямий нащадок body.
  return createPortal(headerContent, document.body);
};
