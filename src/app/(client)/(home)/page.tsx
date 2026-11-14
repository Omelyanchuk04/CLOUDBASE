import type { Metadata } from "next";
import { ROUTES, pageMeta } from "@/lib/seo";
import styles from "./page.module.css";
// Ніяких фігурних дужок. Тільки прямий імпорт.
import MacbookSection from "./sections/MacbookSection/MacbookSection";
import ServicesScroll from "./sections/ServicesScroll/ServicesScroll";
import Steps from "./sections/Steps/Steps";
import ApplicationForm from "./sections/ApplicationForm/ApplicationForm";
import PromoGift from "@/components/UI/PromoGift/PromoGift";

export const metadata: Metadata = pageMeta({
  title: "CloudBASE — обслуговування BAS і KBS, оренда хмари",
  absoluteTitle: true,
  description:
    "Обслуговування бухгалтерських програм BAS і KBS: встановлення, супровід, доробки. Оренда хмари для BAS, KBS, M.E.Doc — доступ 24/7, щоденні резервні копії, від 700 грн/міс.",
  path: ROUTES.home,
});

export default function Home() {
  return (
    <>
      <MacbookSection />
      <ServicesScroll />
      {/* Нижній відступ менший: одразу за етапами йде блок акції */}
      <Steps padding="6rem 0 1.5rem" />
      {/* Акція: доробка для BAS у подарунок. Фон як у «Як ми працюємо», щоб не було шва */}
      <PromoGift bg="#ebebf0" />
      <ApplicationForm />
    </>
  );
}
