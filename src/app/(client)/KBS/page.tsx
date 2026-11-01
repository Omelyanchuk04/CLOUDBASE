import type { Metadata } from "next";
import KbsHero from "./sections/KbsHero/KbsHero";
import KbsProduct from "./sections/KbsProduct/KbsProduct";
// Секція послуг і форма заявки ті самі, що на сторінці BAS і головній
import Services from "../BAS/sections/Services/Services";
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";
import { KBS_SERVICES } from "./kbsData";

export const metadata: Metadata = {
  title: "KBS: встановлення, супровід і хмара",
  description:
    "Встановлення та супровід програми «KBS. Облік бюджетної установи», робота бази даних, розміщення KBS у хмарі.",
};

export default function KbsPage() {
  return (
    <>
      <KbsHero />
      <KbsProduct />
      <Services services={KBS_SERVICES} product="KBS" accent="#6ee7a8" fadeToWhite={false} />
      {/* Над формою темні «Послуги», тож перехід від темного і без світлої шапки */}
      <ApplicationForm fromColor="#07070d" defaultService="kbs" lightTop={false} />
    </>
  );
}
