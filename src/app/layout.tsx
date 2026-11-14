import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

// Імпортуємо компонент шапки (перевірте, чи правильний шлях до вашого компонента)
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import ScrollToTop from "@/components/Layout/ScrollToTop";
import JsonLd from "@/components/SEO/JsonLd";
import { BASE_KEYWORDS, SITE_NAME, SITE_URL, organizationSchema } from "@/lib/seo";

// Підключення шрифту (оптимізовано Next.js)
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter", // CSS-змінна для прокидання в SCSS
  display: "swap",
});

// ЖОРСТКО фіксуємо світлу тему для браузера, щоб статус-бар завжди був білим на iOS
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  viewportFit: "cover",
};

// Загальні метадані. Заголовок, опис і канонічну адресу кожна сторінка задає сама (lib/seo.ts).
// Іконки (icon.png, apple-icon.png, favicon.ico) і картинку для соцмереж (opengraph-image.jpg)
// Next підключає сам з файлів у папці app
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CloudBASE — обслуговування BAS і KBS, оренда хмари",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Обслуговування бухгалтерських програм BAS і KBS: встановлення, супровід, доробки. Оренда хмари для BAS, KBS, M.E.Doc — доступ 24/7, щоденні резервні копії.",
  keywords: BASE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  formatDetection: { telephone: true, email: true, address: false },
  // Спеціальні налаштування для iOS Safari
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: "uk_UA",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Коди підтвердження з Google Search Console і Bing Webmaster Tools (необов'язково)
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Змінна inter.variable додає клас, який ми використовуємо в globals.scss
    <html lang="uk" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        {/* Дані про компанію для пошукових систем */}
        <JsonLd data={organizationSchema()} />
        {/* Додаємо компонент шапки перед основним контентом */}
        {/* Перехід на іншу сторінку завжди починається з верху */}
        <ScrollToTop />
        <Header />

        <main className="app-wrapper">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
