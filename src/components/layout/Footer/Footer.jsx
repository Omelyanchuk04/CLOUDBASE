"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Декорації з вашого фону */}
      <div className={styles.decorPill} aria-hidden="true" />
      <div className={styles.decorDot} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.footer__main}>
          {/* Логотип та Копірайт */}
          <div className={styles.footer__brand}>
            <Link href="/" className={styles.footer__logo}>
              <div className={styles.footer__logoIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
                  <polyline points="12 12 12 21" />
                  <polyline points="8 17 12 21 16 17" />
                </svg>
              </div>
              <span className={styles.footer__logoText}>CLOUDBASE</span>
            </Link>
            <p className={styles.footer__copyright}>
              © {new Date().getFullYear()} Cloudbase. Всі права захищені.
            </p>
          </div>

          {/* Головне меню (без зайвих посилань) */}
          <nav className={styles.footer__nav}>
            <Link href="/cloud" className={styles.footer__link}>
              Хмара
            </Link>
            <Link href="/bas" className={styles.footer__link}>
              BAS/KBS
            </Link>
            <Link href="/about" className={styles.footer__link}>
              Про нас
            </Link>
          </nav>

          {/* Контакти та Кнопка */}
          <div className={styles.footer__contacts}>
            <div className={styles.footer__contactLinks}>
              <a href="tel:+380000000000" className={styles.footer__linkLight}>
                +38 (000) 000-00-00
              </a>
              <a
                href="mailto:info@cloudbase.com.ua"
                className={styles.footer__linkLight}
              >
                info@cloudbase.com.ua
              </a>
            </div>
            <Link href="/contacts" className={styles.btnPrimary}>
              Зв'язатися
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
