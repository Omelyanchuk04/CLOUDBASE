import React from "react";
import styles from "./AboutPage.module.scss";

export const metadata = {
  title: "Про нас | CloudBASE",
  description: "Надійні хмарні рішення та підтримка систем BAS.",
};

export default function AboutPage() {
  return (
    <>
      {/* ПОВЕРНУЛИ СТАРИЙ ФОН ІЗ ПЛЯМАМИ */}
      <div className={styles.fixedBackground} aria-hidden="true">
        <div className={styles.blobPink} />
        <div className={styles.blobPurple} />
        <div className={styles.blobBlue} />
      </div>

      <main className={styles.mainContent}>
        {/* Декоративні фігури */}
        <div className={styles.bgDecorations} aria-hidden="true">
          <div className={styles.pillYellow}></div>
          <div className={styles.dotRed}></div>
          <div className={styles.dotGreen}></div>
          <div className={styles.dotBlue}></div>
          <div className={styles.ringPurple}></div>
          <div className={styles.triangleOrange}></div>
        </div>

        <div className={styles.container}>
          {/* ВЕРХНІЙ БЛОК: Два великі тексти З ЛІНІЄЮ */}
          <section className={styles.heroSection}>
            <div className={styles.heroLeft}>
              Ми помітили проблему: малому бізнесу дістаються складні тарифи,
              черги в підтримці та перекидання відповідальності між адмінами і
              програмістами.
            </div>

            {/* Вертикальна лінія */}
            <div className={styles.heroDivider}></div>

            <div className={styles.heroRight}>
              CLOUDBASE ДАЄ ВСЕ З ОДНИХ РУК. МИ РОЗГОРТАЄМО ХМАРУ, НАЛАШТОВУЄМО
              BAS ТА ВИРІШУЄМО ПРОБЛЕМИ БЕЗ БЮРОКРАТІЇ.
            </div>
          </section>

          {/* НИЖНІЙ БЛОК: 3 колонки з реальними іконками */}
          <section className={styles.featuresSection}>
            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                {/* Іконка: Хмара / Сервер */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              </div>
              <h3>Хмарні сервери</h3>
              <p>
                Надаємо готові потужності. Налаштуємо віддалені робочі місця для
                безпечної та швидкої роботи вашої команди з будь-якої точки.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                {/* Іконка: Налаштування / BAS */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3>Підтримка BAS</h3>
              <p>
                Повністю супроводжуємо облік: оновлюємо конфігурації, створюємо
                індивідуальні звіти та налаштовуємо необхідні обміни даними.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.iconWrapper}>
                {/* Іконка: Захист / Бекапи */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Копії та безпека</h3>
              <p>
                Щоночі автоматично робимо бекапи ваших баз даних. Важливі
                документи завжди в безпеці, і ми зможемо їх швидко відновити.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
