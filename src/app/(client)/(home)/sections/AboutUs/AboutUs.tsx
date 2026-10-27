"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./AboutUs.module.scss";

// Іконки (можеш замінити на свої з @tabler/icons-react, якщо використовуєш їх)
const ExperienceIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" />
  </svg>
);

const EnergyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const ModernIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const AboutUs = () => {
  // Налаштування для плавної появи елементів при скролі
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    // data-theme="dark" скаже шапці зробити текст білим, коли вона над цією секцією
    <section className={styles.section} data-theme="dark" id="about">
      <div className={styles.glowContainer}>
        <div className={styles.glow} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <motion.span
            variants={itemVariants}
            className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-4 block"
          >
            Про компанію
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl leading-tight"
          >
            Нове ім&apos;я на ринку. <br className="hidden md:block" />
            <span className="text-white/60">Роки бездоганної експертизи.</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed"
          >
            CloudBASE — це свіжий погляд на хмарний хостинг та супровід
            облікових систем. Ми — молода та амбітна компанія, але наш фундамент
            будується на фахівцях, які роками впроваджували, налаштовували та
            оптимізували системи BAS і KBS для українського бізнесу.
          </motion.p>
        </motion.div>

        {/* Bento Grid з перевагами */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Картка 1 */}
          <motion.div variants={itemVariants} className={styles.glassCard}>
            <div className={styles.iconWrapper}>
              <ExperienceIcon />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Досвід, якому довіряють
            </h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              Наші співробітники мають за плечима сотні успішних впроваджень та
              складних індивідуальних допрацювань. Ми знаємо всі підводні камені
              облікових систем зсередини.
            </p>
          </motion.div>

          {/* Картка 2 */}
          <motion.div variants={itemVariants} className={styles.glassCard}>
            <div className={styles.iconWrapper}>
              <ModernIcon />
            </div>
            <h3 className="text-xl font-semibold mb-3">Сучасний підхід</h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              Ми залишили застарілі корпоративні звички в минулому. Наша мета —
              надати максимально швидкий, прозорий та сучасний сервіс без
              бюрократії та зайвих очікувань.
            </p>
          </motion.div>

          {/* Картка 3 (Ширша на планшетах, щоб сітка була гарною) */}
          <motion.div
            variants={itemVariants}
            className={`${styles.glassCard} md:col-span-2 lg:col-span-1`}
          >
            <div className={styles.iconWrapper}>
              <EnergyIcon />
            </div>
            <h3 className="text-xl font-semibold mb-3">Енергія та інновації</h3>
            <p className="text-white/60 text-[15px] leading-relaxed">
              Будучи молодою компанією, ми використовуємо лише новітнє серверне
              обладнання та сучасні підходи до безпеки й енергонезалежності,
              гарантуючи роботу вашого бізнесу 24/7.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
