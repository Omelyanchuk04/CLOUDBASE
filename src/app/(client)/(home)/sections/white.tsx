"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const White = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ["start 122%", "start start"],
  });

  const yEnter = useTransform(enterProgress, [0, 1], ["-100vh", "0vh"]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const clip2Val = useTransform(scrollYProgress, [0.15, 0.3], [100, 0]);
  const clip3Val = useTransform(scrollYProgress, [0.45, 0.6], [100, 0]);
  const clip4Val = useTransform(scrollYProgress, [0.75, 0.9], [100, 0]);

  const clip2 = useTransform(clip2Val, (v) => `inset(${v}% 0 0 0)`);
  const clip3 = useTransform(clip3Val, (v) => `inset(${v}% 0 0 0)`);
  const clip4 = useTransform(clip4Val, (v) => `inset(${v}% 0 0 0)`);

  const layerClasses =
    "absolute inset-0 w-full h-full flex flex-col items-center justify-center pt-28 pb-10 px-4 md:px-10";

  const textWrapperClasses =
    "flex flex-col items-center text-center mb-8 md:mb-12 max-w-3xl z-20 pointer-events-auto";
  const titleClasses =
    "text-3xl md:text-5xl font-bold text-black tracking-tight";
  const descClasses =
    "mt-3 md:mt-4 text-base md:text-lg text-black/70 font-medium leading-relaxed";

  // Змінили ширину на max-w-[960px]
  const wrapperClasses =
    "relative w-full max-w-[960px] aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-gray-200/60 bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] shrink-0 z-10 pointer-events-auto";

  const imgClasses = "w-full h-full object-fill block absolute inset-0";

  return (
    <section
      ref={ref}
      data-theme="light"
      className="relative w-full h-[500vh] z-20"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ШАР 1 (БАЗОВИЙ) */}
        <div className={`${layerClasses} bg-[#f5f5f7] z-0`}>
          <div className={textWrapperClasses}>
            <h2 className={titleClasses}>BAS Бухгалтерія</h2>
            <p className={descClasses}>
              Налаштування, оновлення та підтримка стабільної роботи головної
              програми для ведення бухгалтерського та податкового обліку.
            </p>
          </div>
          <motion.div style={{ y: yEnter }} className={wrapperClasses}>
            <img
              src="/main/BAS-img.jpg"
              alt="BAS Бухгалтерія"
              className={imgClasses}
            />
          </motion.div>
        </div>

        {/* ШАР 2: ЗЕЛЕНИЙ ФОН */}
        <motion.div
          style={{ clipPath: clip2 }}
          className={`${layerClasses} bg-[#6ee7b7] z-10`}
        >
          <div className={textWrapperClasses}>
            <h2 className={titleClasses}>BAS Малий бізнес</h2>
            <p className={descClasses}>
              Комплексне рішення для управління продажами, закупівлями,
              виробництвом та фінансами. Інтеграція з іншими сервісами.
            </p>
          </div>
          <motion.div style={{ y: yEnter }} className={wrapperClasses}>
            <img
              src="/main/BAS-img2.jpg"
              alt="BAS Малий бізнес"
              className={imgClasses}
            />
          </motion.div>
        </motion.div>

        {/* ШАР 3: ЖОВТИЙ ФОН */}
        <motion.div
          style={{ clipPath: clip3 }}
          className={`${layerClasses} bg-[#fde047] z-20`}
        >
          <div className={textWrapperClasses}>
            <h2 className={titleClasses}>BAS Управління торгівлею</h2>
            <p className={descClasses}>
              Оптимізація складського обліку, ціноутворення, автоматизація
              торгових операцій та підключення торгового обладнання.
            </p>
          </div>
          <motion.div style={{ y: yEnter }} className={wrapperClasses}>
            <img
              src="/main/BAS-img3.jpg"
              alt="BAS Управління торгівлею"
              className={imgClasses}
            />
          </motion.div>
        </motion.div>

        {/* ШАР 4: ЧЕРВОНИЙ ФОН */}
        <motion.div
          style={{ clipPath: clip4 }}
          className={`${layerClasses} bg-[#fca5a5] z-30`}
        >
          <div className={textWrapperClasses}>
            <h2 className={titleClasses}>Звіти та друковані форми</h2>
            <p className={descClasses}>
              Розробка індивідуальних друкованих форм, специфічних звітів та
              нестандартних обробок чітко під потреби вашого бізнесу.
            </p>
          </div>
          <motion.div style={{ y: yEnter }} className={wrapperClasses}>
            <img
              src="/main/BAS-img4.jpg"
              alt="Кастомні модулі та друковані форми"
              className={imgClasses}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default White;
