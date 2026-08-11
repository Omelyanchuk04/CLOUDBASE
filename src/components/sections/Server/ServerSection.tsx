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
    title: "Працює 24/7 без вихідних",
    description:
      'Програми не "виснуть" і не відключаються. Навіть якщо в офісі зникне світло або інтернет, ваші бази та звіти продовжать надійно працювати.',
    imageSrc: "/server-sequence/0001.png",
  },
  {
    id: "ddos-protection",
    title: "Захист від хакерів та вірусів",
    description:
      "Ваша бухгалтерія надійно захована від зловмисників. Ніхто сторонній не зможе вкрасти, заблокувати або пошкодити ваші робочі документи.",
    imageSrc: "/server-sequence/0020.png",
  },
  {
    id: "nvme-storage",
    title: "Миттєве формування звітів",
    description:
      "Забудьте про очікування під час закриття місяця чи завантаження великих баз. Усе відкривається і працює блискавично швидко.",
    imageSrc: "/server-sequence/0040.png",
  },
  {
    id: "scalability",
    title: "Місця вистачить на всі роки",
    description:
      "Якщо обсяг документів зросте або з'являться нові компанії — ми просто додамо більше пам'яті. Ніяких перевстановлень чи зупинок у роботі.",
    imageSrc: "/server-sequence/0060.png",
  },
  {
    id: "backups",
    title: "Щоденні запасні копії",
    description:
      "Ми щоночі автоматично зберігаємо копії ваших баз. Навіть якщо ви випадково видалите важливий документ, ми допоможемо його швидко відновити.",
    imageSrc: "/server-sequence/0080.png",
  },
  {
    id: "hardware-raid",
    title: "Подвійна надійність збереження",
    description:
      "Всі дані записуються одразу на кілька дисків одночасно. Якщо один диск раптом вийде з ладу, інший миттєво збереже всі ваші цифри в безпеці.",
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
