"use client";

import { useEffect, useRef, useState } from "react";
import { ServerSection } from "../Server/ServerSection";
import { ServerVideoSection } from "../ServerVideo/ServerVideoSection";
import styles from "./ServerShowcase.module.scss";

export function ServerShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Відстежуємо, чи видно блок із серверами на екрані (хоча б 5%)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* Рендеримо обидві секції */}
      <ServerVideoSection />

      <ServerSection />

      {/* Фіксована плаваюча кнопка */}
      <div className={`${styles.fixedCta} ${isVisible ? styles.visible : ""}`}>
        <button className={styles.pillButton}>
          Розпочати безкоштовний тест
          <span className={styles.pillIcon}>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default ServerShowcase;
