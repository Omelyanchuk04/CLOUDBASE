"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "./Steps.module.scss";

// Збільшені кольорові іконки (36x36)
const Icons = {
  // Планшет (Clipboard) - Синій
  Form: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#007AFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <line x1="12" y1="11" x2="16" y2="11" />
      <line x1="8" y1="11" x2="8.01" y2="11" />
      <line x1="12" y1="16" x2="16" y2="16" />
      <line x1="8" y1="16" x2="8.01" y2="16" />
    </svg>
  ),
  // Гарнітура - Фіолетовий
  Chat: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#AF52DE"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </svg>
  ),
  // Комп'ютер/ПК - Рожевий
  PC: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF2D55"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="M9 10h.01M15 10h.01M12 10h.01" />
    </svg>
  ),
  // Договір/Ручка - Помаранчевий
  Contract: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF9500"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  // Оплата/Картка - Зелений
  Card: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#34C759"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
};

const stepsData = [
  {
    title: "Заявка на сайті",
    desc: "Залиште заявку або зв'яжіться з нами.",
    icon: <Icons.Form />,
  },
  {
    title: "Консультація",
    desc: "Уточнюємо деталі та потреби бізнесу.",
    icon: <Icons.Chat />,
  },
  {
    title: "Обстеження ПК",
    desc: "Аудит конфігурацій BAS та робочих місць.",
    icon: <Icons.PC />,
  },
  {
    title: "Договір",
    desc: "Узгоджуємо умови співпраці та SLA.",
    icon: <Icons.Contract />,
  },
  {
    title: "Оплата",
    desc: "Розпочинаємо налаштування після оплати.",
    icon: <Icons.Card />,
  },
];

// Галочка для першого (виконаного) кроку
const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Steps = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.section} data-theme="light" id="steps">
      <div className={styles.glowContainer}>
        <div className={styles.glow} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10 w-full">
        {/* Заголовок */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 md:mb-20 text-center lg:text-left"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900"
          >
            Як ми працюємо
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-neutral-500 max-w-2xl mx-auto lg:mx-0"
          >
            Прозорий та швидкий процес підключення вашого бізнесу.
          </motion.p>
        </motion.div>

        {/* Таймлайн в один ряд */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col lg:flex-row items-start justify-between w-full lg:gap-4"
        >
          {stepsData.map((step, index) => {
            const isActive = index === 0;
            const isLast = index === stepsData.length - 1;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex-1 group w-full lg:w-auto pb-10 lg:pb-0"
              >
                {/* Горизонтальна лінія між кроками (ДЕСКТОП) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-[18px] left-[52px] right-2 h-[1px] bg-neutral-200 transition-colors group-hover:bg-neutral-300" />
                )}

                {/* Вертикальна лінія (МОБАЙЛ) */}
                {!isLast && (
                  <div className="lg:hidden absolute top-[44px] left-[18px] bottom-2 w-[1px] bg-neutral-200" />
                )}

                <div className="flex lg:flex-col items-start gap-5 lg:gap-0">
                  {/* Кружечок з цифрою */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-9 h-9 shrink-0 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-white border border-neutral-300 text-neutral-400 group-hover:border-neutral-500 group-hover:text-neutral-900"
                    }`}
                  >
                    {isActive ? <CheckIcon /> : index + 1}
                  </div>

                  {/* Контент: Іконка + Текст */}
                  <div className="lg:mt-8">
                    <div className="mb-4 transition-transform origin-left group-hover:scale-110 duration-300">
                      {step.icon}
                    </div>

                    <h3
                      className={`text-lg font-semibold mb-2 tracking-tight transition-colors ${isActive ? "text-neutral-900" : "text-neutral-700 group-hover:text-neutral-900"}`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-neutral-500 lg:pr-4">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;
