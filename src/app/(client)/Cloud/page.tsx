import { ROUTES, pageMeta, serviceSchema } from "@/lib/seo";
import JsonLd from "@/components/SEO/JsonLd";
import type { Metadata } from "next";
import CloudHero from "./sections/CloudHero/CloudHero";
// Секції тарифів і послуг та форма заявки ті самі, що на сторінках BAS, KBS і головній
import Configurations from "../BAS/sections/Configurations/Configurations";
import Services from "../BAS/sections/Services/Services";
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";
import { CLOUD_PLANS, CLOUD_SERVICES } from "./cloudData";
import PromoGift from "@/components/UI/PromoGift/PromoGift";

export const metadata: Metadata = pageMeta({
  title: "Оренда хмари для BAS, KBS та бухгалтерських програм",
  description:
    "Оренда хмари для BAS, KBS, M.E.Doc, FREDO та інших програм. Віддалений доступ 24/7, щоденні резервні копії. 700 грн на місяць за робоче місце, наступні — по 500 грн.",
  path: ROUTES.cloud,
  keywords: ["оренда хмари для BAS", "хмарний сервер для бухгалтерії", "віддалений робочий стіл для бухгалтера", "M.E.Doc у хмарі", "резервне копіювання баз"],
});

export default function CloudPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
          name: "Оренда хмари для бухгалтерських програм",
          serviceType: "Оренда хмарного сервера",
          description: "Хмара для BAS, KBS, M.E.Doc та інших програм: віддалений доступ 24/7 і щоденні резервні копії.",
          path: ROUTES.cloud,
          offers: [
            { name: "Перше робоче місце в хмарі", price: 700, unit: "на місяць" },
            { name: "Кожне наступне робоче місце", price: 500, unit: "на місяць" },
            { name: "Додаткова база", price: 200, unit: "на місяць" },
          ],
        })} />
      <CloudHero />
      <Configurations configs={CLOUD_PLANS} product="" title="Тарифи" />
      {/* Акція: доробка в подарунок при підключенні хмари */}
      <PromoGift />
      <Services services={CLOUD_SERVICES} product="" accent="#d57eeb" title="Що входить у хмару" fadeToWhite={false} />
      {/* Над формою темні «Послуги», тож перехід від темного і без світлої шапки */}
      <ApplicationForm fromColor="#07070d" defaultService="cloud" lightTop={false} />
    </>
  );
}
