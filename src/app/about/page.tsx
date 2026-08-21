import React from "react";
import Link from "next/link";
import styles from "./AboutPage.module.scss";

export const metadata = {
  title: "Про нас | CloudBASE",
  description: "Хмарні рішення та підтримка систем BAS для вашого бізнесу.",
};

export default function AboutPage() {
  return (
    <>
      <div className={styles.fixedBackground} aria-hidden="true">
        <div className={styles.blobPink} />
        <div className={styles.blobPurple} />
        <div className={styles.blobBlue} />
      </div>

      <main className={styles.mainContent}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.header}>
              <span className={styles.badge}>Про компанію</span>
              <h1 className={styles.title}>CloudBASE</h1>
              <p className={styles.subtitle}>
                Ми — команда технічних спеціалістів, яка бере на себе всі
                питання з серверами та обліковими системами. Вам не потрібно
                купувати власне дороге обладнання чи шукати окремих програмістів
                — ми забезпечимо стабільну роботу в хмарі та професійне
                обслуговування вашої BAS.
              </p>
            </div>

            <div className={styles.glassWrapper}>
              <div className={styles.grid}>
                {/* Картка 1 (Хмара) */}
                <div className={styles.card}>
                  <div className={styles.icon}>☁️</div>
                  <h3>Хмарні сервери</h3>
                  <p>
                    Надаємо готові потужності для ваших бухгалтерських програм.
                    Налаштуємо віддалені робочі місця, щоб ваша команда могла
                    безпечно працювати з будь-якого комп'ютера чи ноутбука.
                  </p>
                </div>

                {/* Картка 2 (BAS) */}
                <div className={styles.card}>
                  <div className={styles.icon}>⚙️</div>
                  <h3>Підтримка BAS</h3>
                  <p>
                    Не просто здаємо сервер в оренду, а й повністю супроводжуємо
                    вашу облікову систему. Оновлюємо конфігурації, створюємо
                    нові звіти, друковані форми та налаштовуємо обмін даними.
                  </p>
                </div>

                {/* Картка 3 (Бекапи) */}
                <div className={styles.card}>
                  <div className={styles.icon}>📁</div>
                  <h3>Копії та відновлення</h3>
                  <p>
                    Кожної ночі ми автоматично робимо запасні копії всіх ваших
                    файлів та баз даних. Якщо хтось випадково видалить важливий
                    документ — ми швидко його відновимо. Ваша інформація в
                    безпеці.
                  </p>
                </div>

                {/* Картка 4 (АКЦЕНТНА - 2 колонки) */}
                <div className={`${styles.card} ${styles.highlightCard}`}>
                  <h3>Працюємо навіть без світла</h3>
                  <p>
                    Ваші програми працюватимуть стабільно під час тривалих
                    відключень електроенергії. Наші сервери знаходяться у
                    надійних дата-центрах із потужними генераторами та одразу
                    кількома лініями інтернету. Ми гарантуємо, що зв'язок не
                    зникне.
                  </p>
                </div>

                {/* Картка 5 (Контакти) */}
                <div className={styles.card}>
                  <div className={styles.icon}>📞</div>
                  <h3>Наші контакти</h3>
                  <div className={styles.contactsList}>
                    <a href="tel:+380000000000" className={styles.contactLink}>
                      <span>Телефон:</span> +38 (000) 000-00-00
                    </a>
                    <a
                      href="mailto:info@cloudbase.com"
                      className={styles.contactLink}
                    >
                      <span>Email:</span> info@cloudbase.com
                    </a>
                    <div className={styles.socials}>
                      <a href="#" className={styles.socialBtn}>
                        Telegram
                      </a>
                      <a href="#" className={styles.socialBtn}>
                        Viber
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* СПЕЦІАЛЬНИЙ БЛОК CTA ДЛЯ ЦІЄЇ СТОРІНКИ */}
            <div className={styles.cta}>
              <div className={styles.glassWrapper}>
                <div className={styles.ctaBox}>
                  <div className={styles.ctaContent}>
                    <h2>Потрібна надійна хмара чи будь-яка допомога з BAS?</h2>
                    <p>
                      Залиште заявку на безкоштовну консультацію. Ми підберемо
                      необхідні сервери для вашої компанії та вирішимо будь-яке
                      завдання з обліковою системою: від встановлення до
                      виправлення помилок.
                    </p>
                  </div>
                  <Link href="/contacts" className={styles.ctaBtn}>
                    Залишити заявку
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
