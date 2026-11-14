import type { Metadata } from "next";

// Спільні SEO-налаштування сайту.
// Адреса сайту береться з NEXT_PUBLIC_SITE_URL, на Vercel — з основного домену проєкту.
// Якщо жодної змінної немає, використовується домен нижче: замініть його на свій.

const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");

export const SITE_URL = (fromEnv || "https://cloudbase.com.ua").replace(/\/+$/, "");
export const SITE_NAME = "CloudBASE";

export const CONTACTS = {
  phone: "+380930692626",
  phoneDisplay: "+38 093 069 26 26",
  email: "cloudbase.com.ua@gmail.com",
  telegram: "https://t.me/CLOUDBASE_CHAT",
};

// Адреси сторінок. Регістр важливий: саме так названі папки маршрутів
export const ROUTES = {
  home: "/",
  bas: "/BAS",
  kbs: "/KBS",
  cloud: "/Cloud",
  about: "/About",
} as const;

export const abs = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

export const BASE_KEYWORDS = [
  "обслуговування BAS",
  "обслуговування KBS",
  "супровід BAS",
  "встановлення BAS",
  "встановлення KBS",
  "доробки BAS",
  "бухгалтерське програмне забезпечення",
  "обслуговування бухгалтерських програм",
  "оренда хмари",
  "хмара для BAS",
  "BAS у хмарі",
  "KBS у хмарі",
  "хмара для бухгалтерії",
  "оренда хмарного сервера",
  "CloudBASE",
];

// Метадані сторінки: заголовок, опис, канонічна адреса, картка для соцмереж.
// Картинку для соцмереж Next підставляє сам з файла opengraph-image у папці сторінки
export const pageMeta = ({
  title,
  description,
  path,
  keywords = [],
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean; // true — заголовок без «| CloudBASE» в кінці
}): Metadata => {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...keywords, ...BASE_KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
};

/* ---------------- Структуровані дані (schema.org) ---------------- */

const ORG_ID = `${SITE_URL}/#organization`;

// Компанія і сайт: виводиться на всіх сторінках
export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icons/icon-512.png`,
      image: `${SITE_URL}/opengraph-image.jpg`,
      description:
        "Обслуговування бухгалтерського програмного забезпечення BAS і KBS: встановлення, супровід, доробки. Оренда хмари для роботи бухгалтерських програм.",
      telephone: CONTACTS.phone,
      email: CONTACTS.email,
      sameAs: [CONTACTS.telegram],
      areaServed: { "@type": "Country", name: "Україна" },
      knowsAbout: ["BAS Бухгалтерія", "KBS", "Бухгалтерське програмне забезпечення", "Хмарний хостинг"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: CONTACTS.phone,
        email: CONTACTS.email,
        contactType: "customer service",
        areaServed: "UA",
        availableLanguage: ["uk"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "uk-UA",
      publisher: { "@id": ORG_ID },
    },
  ],
});

// price — точна ціна, minPrice — ціна «від»
type Offer = { name: string; price?: number; minPrice?: number; unit?: string };

// Послуга сторінки + «хлібні крихти»
export const serviceSchema = ({
  name,
  description,
  path,
  serviceType,
  offers = [],
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  offers?: Offer[];
}) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${abs(path)}#service`,
      name,
      description,
      serviceType,
      url: abs(path),
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "Україна" },
      ...(offers.length
        ? {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name,
              itemListElement: offers.map((o) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: o.name },
                ...(o.price || o.minPrice
                  ? {
                      priceSpecification: {
                        "@type": "UnitPriceSpecification",
                        ...(o.price ? { price: o.price } : { minPrice: o.minPrice }),
                        priceCurrency: "UAH",
                        ...(o.unit ? { unitText: o.unit } : {}),
                      },
                    }
                  : {}),
              })),
            },
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
        { "@type": "ListItem", position: 2, name, item: abs(path) },
      ],
    },
  ],
});
