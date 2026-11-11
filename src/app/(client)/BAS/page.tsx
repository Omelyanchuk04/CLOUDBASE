import type { Metadata } from "next";
import BasHero from "./sections/BasHero/BasHero";
import Configurations from "./sections/Configurations/Configurations";
import Services from "./sections/Services/Services";
import SolutionsCatalog from "./sections/SolutionsCatalog/SolutionsCatalog";
import PromoGift from "@/components/UI/PromoGift/PromoGift";
// Форма заявки та сама, що на головній
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";

export const metadata: Metadata = {
  title: "BAS: встановлення, супровід, доробки і хмара",
  description:
    "Встановлення BAS на комп'ютер або в хмару, супровід і доробки під ваші процеси. Конфігурації: Бухгалтерія, КОРП, АГРО, Малий бізнес, Управління торгівлею, Управління торговим підприємством.",
};

export default function BasPage() {
  return (
    <>
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
