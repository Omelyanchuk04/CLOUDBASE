import type { Metadata } from "next";
import AboutHero from "./sections/AboutHero/AboutHero";
import AboutText from "./sections/AboutText/AboutText";
import AboutContacts from "./sections/AboutContacts/AboutContacts";
// Етапи і форма заявки ті самі, що на головній
import Steps from "../(home)/sections/Steps/Steps";
import ApplicationForm from "../(home)/sections/ApplicationForm/ApplicationForm";
import PromoGift from "@/components/UI/PromoGift/PromoGift";

export const metadata: Metadata = {
  title: "Про компанію CloudBASE",
  description:
    "CloudBASE встановлює й супроводжує BAS і KBS, робить доробки і надає хмару для роботи програм. Контакти компанії.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutText />
      {/* Контакти і етапи на спільному фоні: під контактами #cdcdda з кольоровими
          плямами, від етапів плавно світлішає до білого внизу */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #cdcdda 0, #cdcdda 640px, #ffffff 100%)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 260px, #000 520px, transparent 860px)",
            maskImage: "linear-gradient(to bottom, transparent 0, #000 260px, #000 520px, transparent 860px)",
          }}
        >
          <div className="absolute -left-[8%] top-[60px] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(72,198,239,0.42),rgba(72,198,239,0.1)_60%,transparent)]" />
          <div className="absolute -right-[8%] top-[40px] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(213,126,235,0.4),rgba(213,126,235,0.1)_60%,transparent)]" />
          <div className="absolute left-1/2 top-[230px] h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(253,186,116,0.4),rgba(253,186,116,0.08)_60%,transparent)]" />
        </div>
        <AboutContacts />
        <Steps bg="transparent" seamFrom="transparent" padding="2.5rem 0 1rem" />
      </div>
      {/* Акція: доробка для BAS у подарунок. Над нею фон уже білий */}
      <PromoGift />
      <ApplicationForm fromColor="#ffffff" />
    </>
  );
}
