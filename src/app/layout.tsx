import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header/Header";
import "./global.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "CloudBASe | Енергонезалежні хмарні сервери",
    template: "%s | CloudBASe",
  },
  description:
    "Оренда програм BAS у хмарі з автономним живленням та підтримкою. Ваш бізнес працює навіть під час блекауту.",
  keywords: [
    "BAS",
    "хмарний сервер",
    "VPS Україна",
    "1С хмара",
    "енергонезалежність",
  ],
  authors: [{ name: "CloudBASe" }],
  openGraph: {
    title: "CloudBASe | Енергонезалежні хмарні сервери",
    description:
      "Оренда програм BAS у хмарі з автономним живленням та підтримкою.",
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main style={{ paddingTop: "var(--header-h)" }}>{children}</main>
        <footer className="footer">
          <div className="container footer__inner">
            <span className="t-caption">
              © {new Date().getFullYear()} CloudBASe. Усі права захищені.
            </span>
            <nav className="footer__nav" aria-label="Footer navigation">
              <a href="/privacy" className="t-caption footer__link">
                Конфіденційність
              </a>
              <a href="/terms" className="t-caption footer__link">
                Умови
              </a>
              <a href="/contacts" className="t-caption footer__link">
                Контакти
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
