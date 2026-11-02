import type { Metadata } from "next";
import KbsHero from "./sections/KbsHero/KbsHero";
// Секції конфігурацій, послуг і форма заявки ті самі, що на сторінці BAS і головній
import Configurations from "../BAS/sections/Configurations/Configurations";
import Services from "../BAS/sections/Services/Services";
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";
import { KBS_CONFIGS, KBS_SERVICES } from "./kbsData";

export const metadata: Metadata = {
  title: "KBS: встановлення, супровід і хмара",
  description:
    "Встановлення та супровід програм «KBS. Облік бюджетної установи» і «KBS. Бухгалтерія комунального підприємства», розміщення KBS у хмарі.",
};

export default function KbsPage() {
  return (
    <>
      <KbsHero />
      <Configurations configs={KBS_CONFIGS} product="KBS" accentFrom="#3fcf8e" accentTo="#14805a" />
      <Services services={KBS_SERVICES} product="KBS" accent="#6ee7a8" fadeToWhite={false} />
      {/* Над формою темні «Послуги», тож перехід від темного і без світлої шапки */}
      <ApplicationForm fromColor="#07070d" defaultService="kbs" lightTop={false} />
    </>
  );
}
