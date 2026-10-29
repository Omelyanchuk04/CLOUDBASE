"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "./Steps.module.scss";

type IconProps = { color: string };

const Icons = {
  Form: ({ color }: IconProps) => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
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
  Chat: ({ color }: IconProps) => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </svg>
  ),
  PC: ({ color }: IconProps) => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
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
  Contract: ({ color }: IconProps) => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Card: ({ color }: IconProps) => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
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
    icon: Icons.Form,
    color: "#007AFF",
  },
  {
    title: "Консультація",
    desc: "Уточнюємо деталі та потреби бізнесу.",
    icon: Icons.Chat,
    color: "#AF52DE",
  },
  {
    title: "Обстеження ПК",
    desc: "Аудит конфігурацій BAS та робочих місць.",
    icon: Icons.PC,
    color: "#FF2D55",
  },
  {
    title: "Договір",
    desc: "Узгоджуємо умови співпраці та SLA.",
    icon: Icons.Contract,
    color: "#FF9500",
  },
  {
    title: "Оплата",
    desc: "Розпочинаємо налаштування після оплати.",
    icon: Icons.Card,
    color: "#34C759",
  },
];

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

const headingContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stepContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const circlePop: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

const cardRise: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const Steps = () => {
  return (
    <section className={styles.section} data-theme="light" id="steps">
      <div className={styles.glowContainer}>
        <div className={styles.glow} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-10 w-full">
        <motion.div
          variants={headingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-12 md:mb-20 text-left"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900"
          >
            Як ми працюємо
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-lg text-neutral-500 max-w-2xl"
          >
            Прозорий та швидкий процес підключення вашого бізнесу.
          </motion.p>
        </motion.div>

        <div
          className={styles.track}
          style={{ "--count": stepsData.length } as React.CSSProperties}
        >
          {stepsData.map((step, index) => {
            const isFirst = index === 0;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                variants={stepContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={styles.step}
                style={
                  {
                    "--i": index,
                    "--z": index + 1,
                  } as React.CSSProperties
                }
              >
                {/* ЗНАЧОК НОМЕРА ВІДІРВАНИЙ ВІД КАРТКИ */}
                <motion.div
                  variants={circlePop}
                  className={styles.badge}
                  style={{
                    backgroundColor: step.color,
                    boxShadow: `0 8px 20px -6px ${step.color}99`,
                  }}
                >
                  {isFirst ? <CheckIcon /> : index + 1}
                </motion.div>

                {/* БІЛА КАРТКА */}
                <motion.div
                  variants={cardRise}
                  className={`${styles.contentBox} w-full`}
                >
                  <div className="mb-4 mt-2">
                    <Icon color={step.color} />
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-2 tracking-tight ${isFirst ? "text-neutral-900" : "text-neutral-700"}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-neutral-500 lg:pr-6">
                    {step.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Steps;
