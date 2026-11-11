"use client";

import Link from "next/link";

// Сторінки. Кольори і нахил ті самі, що в пігулках шапки
const links = [
  { label: "BAS", href: "/BAS", color: "#48c6ef", tilt: "1deg" },
  { label: "KBS", href: "/KBS", color: "#84fab0", tilt: "-1deg" },
  { label: "Хмара", href: "/Cloud", color: "#d57eeb", tilt: "2deg" },
  { label: "Про нас", href: "/About", color: "#fde047", tilt: "-1.5deg" },
];

// Контакти. Telegram і пошта справжні, телефон ще тимчасовий (ті самі дані на «Про нас» і в шапці)
const contacts = [
  { label: "+380 00 000 00 00", href: "tel:+380000000000", icon: "phone" },
  { label: "@CLOUDBASE_CHAT", href: "https://t.me/CLOUDBASE_CHAT", icon: "telegram", external: true },
  { label: "cloudbase.com.ua@gmail.com", href: "mailto:cloudbase.com.ua@gmail.com", icon: "mail" },
] as const;

const ContactIcon = ({ name }: { name: (typeof contacts)[number]["icon"] }) => {
  if (name === "telegram")
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2AABEE]">
        <svg width="11" height="11" viewBox="4 5 15 15" fill="#fff" aria-hidden="true">
          <path d="M5.4 11.7 16.9 7.3c.5-.2 1 .1.8.9l-1.9 9.2c-.1.6-.5.8-1 .5l-2.9-2.2-1.4 1.4c-.2.2-.3.3-.6.3l.2-3 5.5-5c.2-.2 0-.3-.4-.1l-6.8 4.3-2.9-.9c-.6-.2-.7-.6.1-.9z" />
        </svg>
      </span>
    );
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "phone" ? (
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z" />
      ) : (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </>
      )}
    </svg>
  );
};

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

      {/* Рядок футера трохи заходить на нижню частину назви */}
      <div className="relative mx-auto -mt-[5vw] w-full max-w-[1200px] px-6 pb-8 lg:px-10 xl:-mt-[70px]">
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
        </div>

        {/* Нижній рядок: copyright ліворуч, контакти праворуч */}
        <div className="mt-6 flex flex-col-reverse gap-4 border-t border-white/[0.08] pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-white/30">© {year} CloudBASE</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {contacts.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  {...("external" in c && c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
                >
                  <ContactIcon name={c.icon} />
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
