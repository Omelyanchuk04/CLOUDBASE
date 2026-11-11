import styles from "./page.module.css";
// Ніяких фігурних дужок. Тільки прямий імпорт.
import MacbookSection from "./sections/MacbookSection/MacbookSection";
import ServicesScroll from "./sections/ServicesScroll/ServicesScroll";
import Steps from "./sections/Steps/Steps";
import ApplicationForm from "./sections/ApplicationForm/ApplicationForm";
import PromoGift from "@/components/UI/PromoGift/PromoGift";

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
