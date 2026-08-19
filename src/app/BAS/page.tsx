import React from "react";
import styles from "./BasPage.module.scss";
import { BasHero } from "@/components/sections/BasHero/BasHero";
import { BasServices } from "@/components/sections/BasServices/BasServices";
import { BasSteps } from "@/components/sections/BasSteps/BasSteps";
import { BasCta } from "@/components/sections/BasCta/BasCta";

export const metadata = {
  title: "Послуги BAS | CloudBASE",
  description:
    "Інтеграції, друковані форми, звіти та автоматизація процесів для вашої облікової системи BAS.",
};

export default function BasPage() {
  return (
    <>
      <div className={styles.fixedBackground} aria-hidden="true">
        <div className={styles.blobCyan} />
        <div className={styles.blobBlue} />
        <div className={styles.blobLightBlue} />
      </div>

      <main className={styles.mainContent}>
        <BasHero />
        <BasServices />
        <BasSteps />
        <BasCta />
      </main>
    </>
  );
}
