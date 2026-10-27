import styles from "./page.module.css";
// Ніяких фігурних дужок. Тільки прямий імпорт.
import MacbookSection from "./sections/MacbookSection/MacbookSection";
import ServicesScroll from "./sections/ServicesScroll/ServicesScroll";
import Steps from "./sections/Steps/Steps";

export default function Home() {
  return (
    <>
      <MacbookSection />
      <ServicesScroll />
      <Steps />
    </>
  );
}
