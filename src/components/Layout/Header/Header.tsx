"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./header.module.scss";

interface NavItem {
  id: string;
  label: string;
  color: string; // колір пігулки, як у секціях сервісів
  tilt: string; // постійний нахил пігулки
}

const navItems: NavItem[] = [
  { id: "home", label: "Головна", color: "#fccb90", tilt: "-2deg" },
  { id: "bas", label: "BAS", color: "#48c6ef", tilt: "1deg" },
  { id: "kbs", label: "KBS", color: "#84fab0", tilt: "-1deg" },
  { id: "cloud", label: "Хмара", color: "#d57eeb", tilt: "2deg" },
  { id: "about", label: "Про нас", color: "#fde047", tilt: "-1.5deg" },
  { id: "contacts", label: "Контакти", color: "#fca5a5", tilt: "1.5deg" },
];

// Суцільний фон елемента під шапкою на рівні верхнього краю екрана.
// Повертає колір і те, світлий він чи темний. Якщо колір визначити не можна
// (градієнт, картинка, напівпрозорий фон або лише body), повертає null
const getUnderBackground = (): { color: string; isLight: boolean } | null => {
  const x = document.documentElement.clientWidth / 2;
  const elements = document.elementsFromPoint(x, 2);

  for (const el of elements) {
    // Саму шапку пропускаємо, вона лежить зверху
    if (el.closest("header")) continue;
    // Дійшли до кореня сторінки: суцільного фону під шапкою немає
    if (el === document.documentElement || el === document.body) break;

    const style = getComputedStyle(el);
    if (style.backgroundImage !== "none") return null;

    const bg = style.backgroundColor;
    if (bg === "rgba(0, 0, 0, 0)" || bg === "transparent") continue;
    // Напівпрозорий фон дає змішаний колір, його не беремо
    if (/,\s*0?\.\d+\)$/.test(bg)) return null;

    const parts: string[] = bg.match(/\d+(?:\.\d+)?/g) ?? [];
    const [r, g, b] = parts.map(Number);
    // Відносна яскравість: 0 — чорний, 1 — білий
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return { color: bg, isLight: brightness > 0.5 };
  }

  return null;
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

          // 2. Тема за секцією під лінією 65px (для ПК і як запасний варіант)
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

          // 3. На смартфонах колір і тема беруться з однієї точки під шапкою.
          // На ПК цей блок не працює, тема береться з секцій (пункт 2)
          const isTouch = window.matchMedia(
            "(hover: none) and (pointer: coarse)",
          ).matches;
          const under = isTouch ? getUnderBackground() : null;

          if (headerRef.current) {
            if (under) {
              headerRef.current.style.setProperty(
                "--header-solid",
                under.color,
              );
            } else {
              headerRef.current.style.removeProperty("--header-solid");
            }
          }

          const light = under ? under.isLight : foundLight;
          setIsLightTheme((prev) => (prev !== light ? light : prev));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
            {navItems.map((item) => {
              const active = activeItem === item.id;

              return (
                <li key={item.id} className={styles["hero-header__nav-item"]}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveItem(item.id)}
                    style={
                      {
                        "--pill": item.color,
                        "--tilt": item.tilt,
                      } as React.CSSProperties
                    }
                    className={`${styles["hero-header__nav-button"]} ${
                      active ? styles["hero-header__nav-button--active"] : ""
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
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
