"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./header.module.scss";

interface NavItem {
  id: string;
  label: string;
  hasIcon?: boolean;
}

const navItems: NavItem[] = [
  { id: "home", label: "Головна" },
  { id: "bas", label: "BAS" },
  { id: "kbs", label: "KBS" },
  { id: "cloud", label: "Хмара" },
  { id: "about", label: "Про нас" },
  { id: "contacts", label: "Контакти" },
];

// Колір суцільного фону під шапкою на рівні верхнього краю екрана.
const getUnderColor = (): string => {
  const x = document.documentElement.clientWidth / 2;
  const elements = document.elementsFromPoint(x, 2);

  for (const el of elements) {
    if (el.closest("header")) continue;
    if (el === document.documentElement || el === document.body) break;

    const style = getComputedStyle(el);
    if (style.backgroundImage !== "none") return "";

    const bg = style.backgroundColor;
    if (bg === "rgba(0, 0, 0, 0)" || bg === "transparent") continue;
    if (/,\s*0?\.\d+\)$/.test(bg)) return "";

    return bg;
  }

  return "";
};

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("home");
  const [showTop, setShowTop] = useState<boolean>(true);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const headerRef = useRef<HTMLElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);

  // ЄДИНА, НАДІЙНА І ОПТИМІЗОВАНА ЛОГІКА СКРОЛУ
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // 1. Логіка ховання верхньої панелі
          if (currentScrollY > lastScrollY && currentScrollY > 60) {
            setShowTop((prev) => (prev ? false : prev));
          } else {
            setShowTop((prev) => (!prev ? true : prev));
          }
          lastScrollY = currentScrollY;

          // 2. Зміна теми шапки
          const sections = document.querySelectorAll("[data-theme]");
          let foundLight = false;

          sections.forEach((sec) => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= 65 && rect.bottom >= 65) {
              if (sec.getAttribute("data-theme") === "light") {
                foundLight = true;
              }
            }
          });

          setIsLightTheme((prev) => (prev !== foundLight ? foundLight : prev));

          // 3. Динамічний колір для мобільних
          const underColor = getUnderColor();
          if (headerRef.current) {
            if (underColor) {
              headerRef.current.style.setProperty("--header-solid", underColor);
            } else {
              headerRef.current.style.removeProperty("--header-solid");
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ЛОГІКА СКРОЛУ МЕНЮ НА МОБАЙЛІ
  const checkNavScroll = useCallback(() => {
    if (navListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navListRef.current;

      const newCanScrollLeft = scrollLeft > 10;
      const newCanScrollRight =
        Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10;

      setCanScrollLeft((prev) =>
        prev !== newCanScrollLeft ? newCanScrollLeft : prev,
      );
      setCanScrollRight((prev) =>
        prev !== newCanScrollRight ? newCanScrollRight : prev,
      );
    }
  }, []);

  useEffect(() => {
    setTimeout(checkNavScroll, 100);
    window.addEventListener("resize", checkNavScroll);
    return () => window.removeEventListener("resize", checkNavScroll);
  }, [checkNavScroll]);

  const scrollNav = (direction: "left" | "right") => {
    if (navListRef.current) {
      const scrollAmount = 150;
      navListRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`${styles["hero-header"]} ${
        !showTop ? styles["hero-header--hidden-top"] : ""
      } ${isLightTheme ? styles["hero-header--light"] : ""}`}
    >
      <div className={styles["hero-header__top"]}>
        <div className={styles["hero-header__global"]}>
          <div className={styles["hero-header__logo-wrapper"]}>
            <img
              src="/logo.png"
              alt="Cloudbase Logo"
              className={styles["hero-header__logo"]}
              style={{ filter: "var(--logo-filter)" }}
            />
            <span className={styles["hero-header__logo-text"]}>CloudBASE</span>
          </div>

          <div className={styles["hero-header__actions-wrapper"]}>
            <button className={styles["hero-header__contact-button"]}>
              {/* Іконка гарнітури */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
                <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
              </svg>
              Заявка
              {/* Стрілочка вниз */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <nav className={styles["hero-header__local"]}>
          {canScrollLeft && (
            <div
              className={`${styles["hero-header__scroll-indicator"]} ${styles["hero-header__scroll-indicator--left"]}`}
              onClick={() => scrollNav("left")}
            >
              <svg
                viewBox="0 0 12 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 2L2 10L10 18" />
              </svg>
            </div>
          )}

          <ul
            className={styles["hero-header__nav-list"]}
            ref={navListRef}
            onScroll={checkNavScroll}
          >
            {navItems.map((item) => (
              <li key={item.id} className={styles["hero-header__nav-item"]}>
                <button
                  className={`${styles["hero-header__nav-button"]} ${
                    activeItem === item.id
                      ? styles["hero-header__nav-button--active"]
                      : ""
                  }`}
                  onClick={() => setActiveItem(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {canScrollRight && (
            <div
              className={`${styles["hero-header__scroll-indicator"]} ${styles["hero-header__scroll-indicator--right"]}`}
              onClick={() => scrollNav("right")}
            >
              <svg
                viewBox="0 0 12 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 2L10 10L2 18" />
              </svg>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
