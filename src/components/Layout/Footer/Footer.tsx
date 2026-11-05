"use client";

import Link from "next/link";

// Сторінки. Кольори і нахил ті самі, що в пігулках шапки
const links = [
  { label: "BAS", href: "/BAS", color: "#48c6ef", tilt: "1deg" },
  { label: "KBS", href: "/KBS", color: "#84fab0", tilt: "-1deg" },
  { label: "Хмара", href: "/Cloud", color: "#d57eeb", tilt: "2deg" },
  { label: "Про нас", href: "/About", color: "#fde047", tilt: "-1.5deg" },
];

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

        <p className="mt-6 border-t border-white/[0.08] pt-5 text-[12px] text-white/30">
          © {year} CloudBASE
        </p>
      </div>
    </footer>
  );
};

export default Footer;
