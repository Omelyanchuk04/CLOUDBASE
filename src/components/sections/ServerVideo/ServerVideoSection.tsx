"use client";

import { useId, useRef, useState } from "react";
import styles from "./ServerVideoSection.module.scss";

export interface ServerVideoSectionProps {
  title?: string;
  description?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export function ServerVideoSection({
  title = "Ваша бухгалтерія на надійних серверах",
  description = "Погляньте, де саме зберігаються та обробляються ваші документи. Ми використовуємо виключно професійне обладнання корпоративного класу, яке гарантує безперебійну роботу 24/7 без жодних зависань.",
  videoSrc = "/video/server-showcase.mp4",
  posterSrc = "/server-sequence/0001.png",
}: ServerVideoSectionProps) {
  const baseId = useId();
  const titleId = `${baseId}-title`;

  // Відстежуємо стан відео
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true); // autoPlay за замовчуванням
  const [isEnded, setIsEnded] = useState(false);

  // Логіка перемикання (Плей / Пауза / Повторити)
  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (isEnded) {
      // Якщо закінчилось - починаємо спочатку
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.videoWrapper}>
          <div className={styles.videoGlow} />

          <video
            ref={videoRef}
            className={styles.video}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            playsInline
            // Прибираємо loop, щоб воно зупинялось
            onEnded={() => setIsEnded(true)}
            onPlay={() => {
              setIsPlaying(true);
              setIsEnded(false);
            }}
            onPause={() => setIsPlaying(false)}
          >
            Ваш браузер не підтримує відтворення відео.
          </video>

          {/* Преміальна кнопка керування в стилі Apple */}
          <button
            className={styles.controlButton}
            onClick={handleTogglePlay}
            aria-label={
              isEnded ? "Повторити відео" : isPlaying ? "Пауза" : "Відтворити"
            }
          >
            {isEnded ? (
              <ReplayIcon />
            ) : isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ServerVideoSection;

/* ==========================================
   ІКОНКИ КЕРУВАННЯ
   ========================================== */
function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
