import type { Metadata } from "next";
import CloudHero from "./sections/CloudHero/CloudHero";
import CloudSteps from "./sections/CloudSteps/CloudSteps";
// Секції тарифів і послуг та форма заявки ті самі, що на сторінках BAS, KBS і головній
import Configurations from "../BAS/sections/Configurations/Configurations";
import Services from "../BAS/sections/Services/Services";
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";
import { CLOUD_PLANS, CLOUD_SERVICES } from "./cloudData";

export const metadata: Metadata = {
  title: "Хмара для баз BAS і KBS",
  description:
    "Віддалений доступ до баз BAS і KBS 24/7, щоденне резервне копіювання, сервер з автономним живленням. Від 650 грн на місяць за робоче місце.",
};

export default function CloudPage() {
  return (
    <>
      <CloudHero />
      <Configurations configs={CLOUD_PLANS} product="" title="Тарифи" />
      <Services services={CLOUD_SERVICES} product="" accent="#d57eeb" title="Що входить у хмару" />
      <CloudSteps />
      <ApplicationForm fromColor="#ffffff" defaultService="cloud" />
    </>
  );
}
