import { ROUTES, pageMeta, serviceSchema } from "@/lib/seo";
import JsonLd from "@/components/SEO/JsonLd";
import type { Metadata } from "next";
import BasHero from "./sections/BasHero/BasHero";
import Configurations from "./sections/Configurations/Configurations";
import Services from "./sections/Services/Services";
import SolutionsCatalog from "./sections/SolutionsCatalog/SolutionsCatalog";
import PromoGift from "@/components/UI/PromoGift/PromoGift";
// Форма заявки та сама, що на головній
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";

export const metadata: Metadata = pageMeta({
  title: "Обслуговування BAS: встановлення, супровід і доробки",
  description:
    "Встановлення BAS на комп'ютер або в хмару, супровід, оновлення і доробки: інтеграції, звіти, друковані форми. Бухгалтерія, КОРП, АГРО, Малий бізнес, Торгівля, УТП.",
  path: ROUTES.bas,
  keywords: ["BAS Бухгалтерія", "BAS КОРП", "BAS АГРО", "BAS Малий бізнес", "BAS Управління торгівлею", "оновлення BAS", "перехід з 1С 7.7 на BAS"],
});

export default function BasPage() {
  return (
    <>
      <JsonLd data={serviceSchema({
          name: "Обслуговування BAS",
          serviceType: "Обслуговування бухгалтерського програмного забезпечення BAS",
          description: "Встановлення BAS на комп'ютер або в хмару, супровід, оновлення і доробки під облік компанії.",
          path: ROUTES.bas,
          offers: [
            { name: "Встановлення BAS", minPrice: 1500, unit: "разово" },
            { name: "Супровід BAS", minPrice: 1200, unit: "на місяць" },
            { name: "Доробки для BAS" },
            { name: "BAS у хмарі", price: 700, unit: "робоче місце на місяць" },
          ],
        })} />
      <BasHero />
      <Configurations />
      <Services />
      {/* Акція: доробка в подарунок при підключенні хмари, одразу перед каталогом доробок */}
      <PromoGift />
      <SolutionsCatalog />
      {/* Секція доробок закінчується білим, тож перехід у форму теж від білого */}
      <ApplicationForm fromColor="#ffffff" />
    </>
  );
}
