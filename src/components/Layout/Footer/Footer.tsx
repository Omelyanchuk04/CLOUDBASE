"use client";

import Link from "next/link";

// Сторінки. Кольори і нахил ті самі, що в пігулках шапки
const links = [
  { label: "BAS", href: "/BAS", color: "#48c6ef", tilt: "1deg" },
  { label: "KBS", href: "/KBS", color: "#84fab0", tilt: "-1deg" },
  { label: "Хмара", href: "/Cloud", color: "#d57eeb", tilt: "2deg" },
  { label: "Про нас", href: "/about", color: "#fde047", tilt: "-1.5deg" },
];

// Контакти. Замініть на реальні дані (вони ж є в меню кнопки «Заявка» в шапці)
const PHONE = { label: "+380 00 000 00 00", href: "tel:+380000000000" };
const EMAIL = { label: "info@cloudbase.ua", href: "mailto:info@cloudbase.ua" };
const TELEGRAM = "https://t.me/cloudbase";

const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" />
  </svg>
);

const IconMail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4 5h16a2 2 0 0 1 2 2v.4l-10 6.1L2 7.4V7a2 2 0 0 1 2-2zm-2 4.7 9.5 5.8c.3.2.7.2 1 0L22 9.7V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
  </svg>
);

// Логотип Telegram: паперовий літачок на блакитному колі
const IconTelegram = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#2AABEE" />
    <path
      fill="#fff"
      d="M5.4 11.7 16.9 7.3c.5-.2 1 .1.8.9l-1.9 9.2c-.1.6-.5.8-1 .5l-2.9-2.2-1.4 1.4c-.2.2-.3.3-.6.3l.2-3 5.5-5c.2-.2 0-.3-.4-.1l-6.8 4.3-2.9-.9c-.6-.2-.7-.6.1-.9z"
    />
  </svg>
);

const contactCls =
  "inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors duration-200 hover:text-white";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="dark" className="relative w-full overflow-hidden bg-[#08080c] text-white">
      {/* Велика назва у фоні зверху футера, ледь помітна і розчиняється донизу */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden pt-6 text-center md:pt-10">
        <span className="block whitespace-nowrap bg-gradient-to-b from-white/[0.06] to-white/0 bg-clip-text pb-[0.04em] text-[17.6vw] font-semibold leading-[0.85] tracking-[-0.06em] text-transparent xl:text-[236px]">
          CloudBASE
        </span>
      </div>

      {/* Рядки футера трохи заходять на нижню частину назви */}
      <div className="relative mx-auto -mt-[5vw] w-full max-w-[1200px] px-6 pb-8 lg:px-10 xl:-mt-[70px]">
        {/* Один рядок: логотип, сторінки, контакти */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 self-start md:self-auto">
            <img src="/logo.png" alt="" className="h-6 w-auto" />
            <span className="text-[16px] font-bold tracking-wide">CloudBASE</span>
          </Link>

          {/* Сторінки: пігулки з кольоровою рамкою, як у шапці */}
          <nav aria-label="Сторінки" className="flex flex-wrap gap-2.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full bg-white/[0.03] px-4 py-1.5 text-[13px] font-semibold text-white/85 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
                style={{ border: `1.5px solid ${l.color}`, rotate: l.tilt }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Контакти: телефон і пошта з іконками, Telegram — значком */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={PHONE.href} className={contactCls}>
              <IconPhone />
              {PHONE.label}
            </a>
            <a href={EMAIL.href} className={contactCls}>
              <IconMail />
              {EMAIL.label}
            </a>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="rounded-full transition-opacity duration-200 hover:opacity-85"
            >
              <IconTelegram />
            </a>
          </div>
        </div>

        <p className="mt-6 border-t border-white/[0.08] pt-5 text-[12px] text-white/30">
          © {year} CloudBASE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
