import React from "react";
import styles from "./BasServices.module.scss";

const SERVICES_CATEGORIES = [
  {
    id: "integration",
    title: "Інтеграції та обмін даними",
    features: [
      "Автоматичне завантаження банківських виписок",
      "Завантаження вхідних податкових накладних (XML)",
      "Формування рахунків із сервісу Вчасно",
      "Завантаження прайсів/інвойсів",
      "Надходження з Excel / Вчасно / Кашалот / Чекбокс",
      "Модуль обміну із KeyCRM та іншими CRM",
      "Обмін даними з Google Таблицями",
      "Синхронізація баз 1С/BAS",
    ],
  },
  {
    id: "forms",
    title: "Друковані форми",
    features: [
      "Акт наданих послуг з розбивкою",
      "Накладна на передачу матеріалів у виробництво",
      "Оптимізація ПКО/ВКО (два ордери на А4)",
      "Авансовий звіт (оновлений)",
      "Оновлена форма ТТН та Акт А5",
      "Друк Інвойсів та Договорів контрагентів",
      "Видаткова накладна з кодом УКТЗЕД",
    ],
  },
  {
    id: "automation",
    title: "Спец. модулі та автоматизація",
    features: [
      "Модуль Транспорт та Модуль ТТН",
      "Модуль сканування товарів і друк штрих-кодів",
      "Обробка для закриття рахунків",
      "Автоматичне формування рахунків з відправкою на пошту",
      "Накладна на передачу у виробництво",
      "Перевірка списання товарів",
      "Формування зведених податкових накладних",
    ],
  },
  {
    id: "reports",
    title: "Звітність та регуляторні форми",
    features: [
      "Вивантаження податкових накладних списком у XML",
      "Об’єднаний звіт ЄСВ та 1ДФ",
      "Табель обліку робочого часу",
      "Відомість по розрахункам з контрагентами",
      "Звіт з прибутковості видаткових накладних",
      "Звіт з продажу (товари та послуги)",
      "Рух ТМЦ (матеріальний звіт)",
    ],
  },
];

export const BasServices = () => {
  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Можливості доопрацювання</h2>
        </div>

        {/* НОВИЙ СКЛЯНИЙ КОНТЕЙНЕР-ОБГОРТКА */}
        <div className={styles.glassWrapper}>
          <div className={styles.grid}>
            {SERVICES_CATEGORIES.map((category) => (
              <div key={category.id} className={styles.card}>
                <h3 className={styles.cardTitle}>{category.title}</h3>
                <ul className={styles.list}>
                  {category.features.map((feature, idx) => (
                    <li key={idx} className={styles.feature}>
                      <svg
                        className={styles.check}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
