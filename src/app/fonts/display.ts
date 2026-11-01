import localFont from "next/font/local";

// Шрифт заголовків: Onest (OFL), локальний файл з латиницею і кирилицею.
// Використання: className={display.className}
export const display = localFont({
  src: "./Onest-Variable.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});
