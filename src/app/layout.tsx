import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

// Імпортуємо компонент шапки (перевірте, чи правильний шлях до вашого компонента)
import Header from "../components/Layout/Header/Header";

// Підключення шрифту (оптимізовано Next.js)
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter", // CSS-змінна для прокидання в SCSS
  display: "swap",
});

// ПРИМУСОВИЙ БІЛИЙ КОЛІР ДЛЯ СТАТУС-БАРУ (Світла і темна теми)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  // Заміни на реальний домен після деплою. Це обов'язково для коректної роботи OpenGraph
  metadataBase: new URL("https://cloudbase.ua"),
  title: {
    default: "CloudBASe | Енергонезалежні хмарні сервери для бізнесу",
    template: "%s | CloudBASe",
  },
  description:
    "Оренда програм BAS у хмарі з автономним живленням та підтримкою. Ваш бізнес працює стабільно навіть під час блекауту. Надійні сервери в Україні.",
  keywords: [
    "BAS",
    "хмарний сервер",
    "VPS Україна",
    "1С хмара",
    "енергонезалежність",
    "оренда сервера",
    "хмарна інфраструктура",
    "бухгалтерія онлайн",
  ],
  authors: [{ name: "CloudBASe" }],
  creator: "CloudBASe",
  openGraph: {
    title: "CloudBASe | Енергонезалежні хмарні сервери",
    description:
      "Оренда програм BAS у хмарі з автономним живленням та підтримкою.",
    url: "/",
    siteName: "CloudBASe",
    locale: "uk_UA",
    type: "website",
    // Розкоментуй та додай шлях до картинки, коли вона буде готова
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "CloudBASe банер",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Змінна inter.variable додає клас, який ми використовуємо в globals.scss
    <html lang="uk" className={inter.variable}>
      <body>
        {/* Додаємо компонент шапки перед основним контентом */}
        <Header />

        <main className="app-wrapper">{children}</main>
      </body>
    </html>
  );
}
