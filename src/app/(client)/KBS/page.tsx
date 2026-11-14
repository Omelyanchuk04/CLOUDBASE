import { ROUTES, pageMeta, serviceSchema } from "@/lib/seo";
import JsonLd from "@/components/SEO/JsonLd";
import type { Metadata } from "next";
import KbsHero from "./sections/KbsHero/KbsHero";
// Секції конфігурацій, послуг і форма заявки ті самі, що на сторінці BAS і головній
import Configurations from "../BAS/sections/Configurations/Configurations";
import Services from "../BAS/sections/Services/Services";
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";
import { KBS_CONFIGS, KBS_SERVICES } from "./kbsData";

export const metadata: Metadata = pageMeta({
  title: "Обслуговування KBS: встановлення і технічна підтримка",
  description:
    "Встановлення і технічна підтримка KBS: «Облік бюджетної установи», «Бухгалтерія комунального підприємства». Оновлення, виправлення помилок, доробки, KBS у хмарі.",
  path: ROUTES.kbs,
  keywords: ["KBS Облік бюджетної установи", "KBS Бухгалтерія комунального підприємства", "технічна підтримка KBS", "оновлення KBS"],
});

export default function KbsPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
          name: "Обслуговування KBS",
          serviceType: "Обслуговування бухгалтерського програмного забезпечення KBS",
          description: "Встановлення KBS на комп'ютер або в хмару, технічна підтримка, оновлення, виправлення помилок і доробки на замовлення.",
          path: ROUTES.kbs,
          offers: [
            { name: "Встановлення KBS", minPrice: 1500, unit: "разово" },
            { name: "Технічна підтримка KBS", minPrice: 1200, unit: "на місяць" },
            { name: "Доробки KBS на замовлення" },
            { name: "KBS у хмарі", price: 700, unit: "робоче місце на місяць" },
          ],
        })} />
      <KbsHero />
      <Configurations configs={KBS_CONFIGS} product="KBS" accentFrom="#3fcf8e" accentTo="#14805a" />
      <Services services={KBS_SERVICES} product="KBS" accent="#6ee7a8" fadeToWhite={false} />
      {/* Над формою темні «Послуги», тож перехід від темного і без світлої шапки */}
      <ApplicationForm fromColor="#07070d" defaultService="kbs" lightTop={false} />
    </>
  );
}
