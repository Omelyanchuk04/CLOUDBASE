import type { Metadata } from "next";
import CloudHero from "./sections/CloudHero/CloudHero";
// Секції тарифів і послуг та форма заявки ті самі, що на сторінках BAS, KBS і головній
import Configurations from "../BAS/sections/Configurations/Configurations";
import Services from "../BAS/sections/Services/Services";
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";
import { CLOUD_PLANS, CLOUD_SERVICES } from "./cloudData";
import PromoGift from "@/components/UI/PromoGift/PromoGift";

export const metadata: Metadata = {
  title: "Хмара для BAS, KBS та інших програм",
  description:
    "Віддалений доступ 24/7, щоденне резервне копіювання, орендовані сервери за кордоном. 700 грн на місяць за робоче місце, додаткова база — 200 грн.",
};

export default function CloudPage() {
  return (
    <>
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
