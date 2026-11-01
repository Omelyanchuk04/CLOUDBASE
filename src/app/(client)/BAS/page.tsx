import type { Metadata } from "next";
import BasHero from "./sections/BasHero/BasHero";
import Configurations from "./sections/Configurations/Configurations";
import Services from "./sections/Services/Services";
import SolutionsCatalog from "./sections/SolutionsCatalog/SolutionsCatalog";
// Форма заявки та сама, що на головній
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";

export const metadata: Metadata = {
  title: "BAS: встановлення, супровід і доробки",
  description:
    "Встановлення BAS, супровід і доробки під ваші процеси, BAS у хмарі. Конфігурації: Бухгалтерія, Малий бізнес, Управління торгівлею, КУП, ERP, Документообіг.",
};

export default function BasPage() {
  return (
    <>
      <BasHero />
      <Configurations />
      <Services />
      <SolutionsCatalog />
      {/* Секція доробок закінчується білим, тож перехід у форму теж від білого */}
      <ApplicationForm fromColor="#ffffff" />
    </>
  );
}
