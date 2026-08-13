"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import styles from "./ServerSection.module.scss";

export interface Feature {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

export interface ServerSectionProps {
  features?: Feature[];
  initialActiveIndex?: number;
}

const DEFAULT_FEATURES: Feature[] = [
  {
    id: "reliability",
    title: "Працює без перерви 24/7",
    description:
      "1С/BAS/KBS/MEDOC та всі необхідні програми доступні вам у будь-який час, cервер працює щодня цілодобово. Не потрібно чекати, поки хтось увімкне комп’ютер або сервер.",
    imageSrc: "/server-sequence/0001.png",
  },
  {
    id: "ddos-protection",
    title: "Усі дані в одному місці",
    description:
      "Документи, звіти, довідники та інша робоча інформація зберігаються на сервері. Усі працівники працюють з однією актуальною базою.",
    imageSrc: "/server-sequence/0020.png",
  },
  {
    id: "nvme-storage",
    title: "Усі працюють з однією базою",
    description:
      "Бухгалтерія, керівник та інші працівники бачать актуальні дані й можуть працювати з однією базою без постійного перенесення файлів.",
    imageSrc: "/server-sequence/0040.png",
  },
  {
    id: "scalability",
    title: "Дані надійно зберігаються",
    description:
      "Важливі дані регулярно копіюються, тому у разі несправності обладнання або іншої проблеми інформацію можна відновити.",
    imageSrc: "/server-sequence/0060.png",
  },
  {
    id: "backups",
    title: "Працюйте звідки завгодно",
    description:
      "Можна підключитися до робочої програми з дому, офісу або іншого місця. Ваше робоче середовище завжди залишається під рукою.",
    imageSrc: "/server-sequence/0080.png",
  },
  {
    id: "hardware-raid",
    title: "Вам не потрібно розбиратися в техніці",
    description:
      "Ми беремо на себе технічну частину: налаштування, обслуговування та контроль роботи сервера. Вам залишається просто працювати у звичних програмах.",
    imageSrc: "/server-sequence/0100.png",
  },
];

export function ServerSection({
  features = DEFAULT_FEATURES,
  initialActiveIndex = 0,
}: ServerSectionProps) {
  const baseId = useId();
  const titleId = `${baseId}-title`;

  const [activeIndex, setActiveIndex] = useState(() =>
    features.length === 0
      ? 0
      : Math.min(Math.max(initialActiveIndex, 0), features.length - 1),
  );

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < features.length - 1;

  const goPrev = useCallback(
    () => setActiveIndex((current) => Math.max(0, current - 1)),
    [],
  );
  const goNext = useCallback(
    () =>
      setActiveIndex((current) => Math.min(features.length - 1, current + 1)),
    [features.length],
  );
  const goTo = useCallback((index: number) => setActiveIndex(index), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  if (features.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.content}>
        <div className={styles.navControls}>
          <button
            type="button"
            className={styles.navControlButton}
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Попередня функція"
          >
            <ChevronIcon direction="up" />
          </button>
          <button
            type="button"
            className={styles.navControlButton}
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Наступна функція"
          >
            <ChevronIcon direction="down" />
          </button>
        </div>

        <div className={styles.grid}>
          <div className={styles.leftPanel}>
            <ul className={styles.list}>
              {features.map((feature, index) => {
                const isActive = index === activeIndex;
                return (
                  <li
                    key={feature.id}
                    className={`${styles.featureItem} ${isActive ? styles.active : ""}`}
                    onClick={() => goTo(index)}
                  >
                    <button
                      type="button"
                      className={styles.cardHeader}
                      aria-expanded={isActive}
                    >
                      <div className={styles.plusIconWrapper}>
                        <PlusIcon />
                      </div>
                      <span className={styles.cardTitle}>{feature.title}</span>
                    </button>
                    <div className={styles.descWrapper}>
                      <div className={styles.descInner}>
                        <p className={styles.descText}>{feature.description}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.rightPanel}>
            <div className={styles.imageWrapper}>
              {features.map((feature, index) => (
                <Image
                  key={feature.id}
                  src={feature.imageSrc}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`${styles.image} ${index === activeIndex ? styles.activeImage : ""}`}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 4V20M4 12H20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
      style={{ transform: direction === "down" ? "rotate(180deg)" : undefined }}
    >
      <path
        d="M6 15L12 9L18 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
