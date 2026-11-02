// ─────────────────────────────────────────────────────────────────────────────
// Дані сторінки «Хмара». Змінюйте тексти й ціни тут.
// ─────────────────────────────────────────────────────────────────────────────

import type { BasConfig, BasService } from "../BAS/basData";

// Знімок віддаленого робочого столу без IP-адреси в заголовку вікна
export const CLOUD_IMAGE = "/main/cloud-desktop.jpg";

const PRICE = "700 грн на місяць. За перше робоче місце, кожне наступне — 500 грн на місяць. Додаткова база — 200 грн на місяць";

// Тарифи
export const CLOUD_PLANS: BasConfig[] = [
  {
    id: "bas-cloud",
    name: "BAS у хмарі",
    short: "BAS у хмарі",
    description:
      "Одне робоче місце: 5 ГБ пам'яті, 1 база. Доступ 24/7 з будь-якого пристрою, щоденне резервне копіювання.",
    price: PRICE,
    gradient: ["#fccb90", "#d57eeb"],
    image: CLOUD_IMAGE,
    imageAlt: "Віддалений робочий стіл з базою в хмарі CloudBASe",
  },
  {
    id: "kbs-cloud",
    name: "KBS у хмарі",
    short: "KBS у хмарі",
    description:
      "Хмарне робоче місце для програм KBS. Доступ 24/7 з будь-якого пристрою, щоденне резервне копіювання.",
    price: PRICE,
    gradient: ["#c2e9fb", "#a18cd1"],
    image: CLOUD_IMAGE,
    imageAlt: "Віддалений робочий стіл з базою в хмарі CloudBASe",
  },
  {
    id: "other-cloud",
    name: "Інші програми",
    short: "Інші програми",
    description:
      "Хмарне робоче місце для інших програм, з якими ви працюєте, не лише BAS і KBS. Доступ 24/7 з будь-якого пристрою, щоденне резервне копіювання.",
    price: "700 грн на місяць. За перше робоче місце, кожне наступне — 500 грн на місяць",
    gradient: ["#d4fc79", "#96e6a1"],
    visual: "dashboard",
  },
];

// Що входить
export const CLOUD_SERVICES: BasService[] = [
  {
    id: "access",
    title: "Доступ",
    items: [
      "Доступ 24/7 з будь-якого пристрою",
      "Для BAS, KBS та інших ваших програм",
    ],
    icon: "cloud",
    gradient: ["#fccb90", "#d57eeb"],
  },
  {
    id: "backup",
    title: "Резервні копії",
    items: ["Щоденне резервне копіювання"],
    icon: "backup",
    gradient: ["#e0c3fc", "#8ec5fc"],
  },
  {
    id: "servers",
    title: "Сервери",
    items: ["Орендовані сервери за кордоном", "Працюють без вимкнень"],
    icon: "server",
    gradient: ["#fde68a", "#fccb90"],
  },
  {
    id: "admin",
    title: "Адміністрування",
    items: ["Розгортання бази на сервері", "Налаштування доступу", "Адміністрування сервера"],
    icon: "support",
    gradient: ["#c2e9fb", "#a18cd1"],
  },
];
