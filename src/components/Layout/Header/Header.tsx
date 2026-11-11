"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import ContactDrawer from "./ContactDrawer";
import { scrollToSection } from "@/lib/utils/scrollToSection";

interface NavItem {
  id: string;
  label: string;
  href: string; // адреса сторінки або якоря на головній
  color: string; // колір пігулки, як у секціях сервісів
  tilt: string; // постійний нахил пігулки
}

const navItems: NavItem[] = [
  { id: "home", label: "Головна", href: "/", color: "#6f86d6", tilt: "-2deg" },
  { id: "bas", label: "BAS", href: "/BAS", color: "#48c6ef", tilt: "1deg" },
  { id: "kbs", label: "KBS", href: "/KBS", color: "#84fab0", tilt: "-1deg" },
  { id: "cloud", label: "Хмара", href: "/Cloud", color: "#d57eeb", tilt: "2deg" },
  { id: "about", label: "Про нас", href: "/About", color: "#fde047", tilt: "-1.5deg" },
];

interface ContactItem {
  id: string;
  label: string;
  value: string;
  href: string | null; // null — пункт без посилання, наприклад графік
}

// Контакти в бічній панелі (стрілочка біля "Заявка"). Контакти справжні
const contacts: ContactItem[] = [
  {
    id: "phone",
    label: "Телефон",
    value: "+38 093 069 26 26",
    href: "tel:+380930692626",
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "@CLOUDBASE_CHAT",
    href: "https://t.me/CLOUDBASE_CHAT",
  },
  {
    id: "email",
    label: "Email",
    value: "cloudbase.com.ua@gmail.com",
    href: "mailto:cloudbase.com.ua@gmail.com",
  },
  {
    id: "hours",
    label: "Графік роботи",
    value: "Пн–Пт, 9:00–18:00",
    href: null,
  },
];

const Header: React.FC = () => {
  // Активний пункт визначаємо за адресою, тож після переходу пігулка сама перемикається
  const pathname = usePathname();
  const activeItem =
    navItems.find((item) => item.href !== "/" && pathname.startsWith(item.href))?.id ??
    (pathname === "/" ? "home" : "");
  const [showTop, setShowTop] = useState<boolean>(true);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const navListRef = useRef<HTMLUListElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // ХОВАННЯ ВЕРХНЬОГО РЯДКА. Обробник прокрутки лише читає позицію
  // і міняє стан, коли він справді змінився. Поріг 6px не дає шапці
  // смикатися туди-сюди при повільній прокрутці
  useEffect(() => {
    let ticking = false;
    let anchor = window.scrollY;
    let hidden = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;

      if (y <= 80) {
        if (hidden) {
          hidden = false;
          setShowTop(true);
        }
        anchor = y;
        return;
      }

      if (!hidden) {
        if (y > anchor + 6) {
          hidden = true;
          setShowTop(false);
          anchor = y;
        } else if (y < anchor) {
          anchor = y;
        }
      } else if (y < anchor - 6) {
        hidden = false;
        setShowTop(true);
        anchor = y;
      } else if (y > anchor) {
        anchor = y;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ТЕМА ШАПКИ. Слідкуємо за секціями з data-theme="light", які перетинають
  // лінію на 65px від верху. IntersectionObserver не змушує браузер
  // перераховувати верстку під час прокрутки, на відміну від читання
  // розмірів у обробнику скролу
  useEffect(() => {
    const lightSections = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    const applyTheme = () => {
      const light = lightSections.size > 0;
      setIsLightTheme((prev) => (prev !== light ? light : prev));
    };

    const build = () => {
      observer?.disconnect();
      lightSections.clear();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) lightSections.add(entry.target);
            else lightSections.delete(entry.target);
          });
          applyTheme();
        },
        // Смуга 1px на рівні 65–66px від верху. Елемент потрапляє в неї,
        // якщо перетинає лінію під шапкою
        { rootMargin: `-65px 0px ${-(window.innerHeight - 66)}px 0px` },
      );

      document
        .querySelectorAll('[data-theme="light"]')
        .forEach((el) => observer?.observe(el));
    };

    // Будуємо після відмальовування нової сторінки: шапка живе в layout
    // і не перезавантажується між сторінками, тому секції шукаємо щоразу
    const raf = requestAnimationFrame(build);
    // Висота вікна на телефоні змінюється, коли ховається адресний рядок,
    // тому смугу перебудовуємо при зміні розміру
    window.addEventListener("resize", build);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      observer?.disconnect();
    };
  }, [pathname]);

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
    const timer = setTimeout(checkNavScroll, 100);
    window.addEventListener("resize", checkNavScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkNavScroll);
    };
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

  // Ліва частина кнопки: якщо форма на цій сторінці, плавно до неї.
  // Інакше звичайний перехід на головну до форми (href="/#application")
  const handleApplicationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (!document.getElementById("application")) return;
    e.preventDefault();
    scrollToSection("application");
  };

  // Скляна кнопка: відблиск слідує за курсором.
  // Тільки для миші, на сенсорному екрані цей ефект не потрібен
  const handleGlassMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  };

  const handleGlassLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.removeProperty("--gx");
    el.style.removeProperty("--gy");
  };

  return (
    <header
      className={`${styles["hero-header"]} ${
        !showTop ? styles["hero-header--hidden-top"] : ""
      } ${isLightTheme ? styles["hero-header--light"] : ""}`}
    >
      <div className={styles["hero-header__top"]}>
        <div className={styles["hero-header__global"]}>
          <Link
            href="/"
            className={styles["hero-header__logo-wrapper"]}
            aria-label="CloudBASE, на головну"
          >
            <img
              src="/logo.png"
              alt="Cloudbase Logo"
              className={styles["hero-header__logo"]}
              style={{ filter: "var(--logo-filter)" }}
            />
            <span className={styles["hero-header__logo-text"]}>CloudBASE</span>
          </Link>

          <div className={styles["hero-header__actions-wrapper"]}>
            <div ref={menuRef} className={styles["hero-header__cta-wrap"]}>
              <div
                className={styles["hero-header__cta-group"]}
                onPointerMove={handleGlassMove}
                onPointerLeave={handleGlassLeave}
              >
                <Link
                  href="/#application"
                  className={styles["hero-header__cta-main"]}
                  onClick={handleApplicationClick}
                >
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
                </Link>

                <span
                  className={styles["hero-header__cta-divider"]}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  className={styles["hero-header__cta-toggle"]}
                  aria-label="Контакти і заявка"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {/* Стрілочка вниз, перевертається при відкритому меню */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${styles["hero-header__cta-arrow"]} ${
                      menuOpen ? styles["hero-header__cta-arrow--open"] : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

            </div>
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
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
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
                  </Link>
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

      {/* Бічна панель з контактами і формою заявки */}
      <ContactDrawer open={menuOpen} onClose={closeMenu} contacts={contacts} />
    </header>
  );
};

export default Header;
