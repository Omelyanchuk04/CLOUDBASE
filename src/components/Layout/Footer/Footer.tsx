"use client";

import Link from "next/link";

// Дані дублюють меню шапки. Якщо міняєте там, змініть і тут
const navLinks = [
  { label: "Головна", href: "/", color: "#6f86d6" },
  { label: "BAS", href: "/BAS", color: "#48c6ef" },
  { label: "KBS", href: "/KBS", color: "#84fab0" },
  { label: "Хмара", href: "/cloud", color: "#d57eeb" },
  { label: "Про нас", href: "/about", color: "#fde047" },
  { label: "Контакти", href: "/#application", color: "#fca5a5" },
];

const contacts = [
  { label: "+380 00 000 00 00", href: "tel:+380000000000", external: false },
  { label: "@cloudbase", href: "https://t.me/cloudbase", external: true },
  {
    label: "info@cloudbase.ua",
    href: "mailto:info@cloudbase.ua",
    external: false,
  },
];

// Посилання на соцмережі. Замініть на реальні
const socials = [
  { label: "Telegram", href: "https://t.me/cloudbase" },
  { label: "Instagram", href: "https://instagram.com/cloudbase" },
];

const IconSend = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
);

const IconInstagram = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);

// Скляна панель: на телефоні без blur, на ПК з blur як у шапці
const glassPanel =
  "rounded-[28px] border border-white/15 bg-white/[0.05] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_0_0_1px_rgba(255,255,255,0.05),0_30px_60px_-30px_rgba(0,0,0,0.6)] md:rounded-[36px] md:p-12 md:backdrop-blur-xl";

const columnTitle =
  "text-xs font-medium uppercase tracking-[0.2em] text-white/40";

const linkClass =
  "group inline-flex items-center gap-2.5 text-sm text-white/60 transition-colors duration-200 hover:text-white";

const dotClass =
  "h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125";

const socialClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors duration-200 hover:bg-white/[0.14] hover:text-white";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      data-theme="dark"
      className="relative w-full overflow-hidden bg-[#08080c] px-6 pb-8 pt-16 text-white md:pb-12 md:pt-24"
    >
      {/* Світло тільки знизу, і воно повністю всередині футера. Верх
          має той самий колір, що й низ форми, тож між ними немає шва */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 h-[320px] w-[480px] bg-[radial-gradient(closest-side,rgba(213,126,235,0.10),transparent)]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[480px] bg-[radial-gradient(closest-side,rgba(72,198,239,0.08),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className={glassPanel}>
          {/* Колонки: бренд, навігація, контакти */}
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="CloudBASE" className="h-8 w-auto" />
                <span className="text-xl font-bold tracking-wide">
                  CloudBASE
                </span>
              </div>
            </div>

            <div>
              <p className={columnTitle}>Навігація</p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>
                      <span
                        className={dotClass}
                        style={{ backgroundColor: l.color }}
                        aria-hidden="true"
                      />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={columnTitle}>Контакти</p>
              <ul className="mt-5 space-y-3">
                {contacts.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-white/40">Пн–Пт, 9:00–18:00</p>
            </div>
          </div>

          {/* Нижній рядок: копірайт і соцмережі */}
          <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/35">
              © {year} CloudBASE. Усі права захищено.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socials[0].label}
                className={socialClass}
              >
                <IconSend />
              </a>
              <a
                href={socials[1].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socials[1].label}
                className={socialClass}
              >
                <IconInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
