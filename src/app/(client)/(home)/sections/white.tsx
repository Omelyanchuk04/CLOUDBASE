"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const White = () => {
  const ref = useRef<HTMLElement>(null);

  // 1. Анімація виїзду картинки знизу
  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ["start 122%", "start start"],
  });

  const yEnter = useTransform(enterProgress, [0, 1], ["-100vh", "0vh"]);
  const scaleEnter = useTransform(enterProgress, [0, 1], [0.9, 1]);

  // 2. Трекер для плавної зміни текстів (без useSpring, щоб нічого не дьоргалось)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.48, 0.58],
    [0, 1, 1, 0],
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.81, 0.91],
    [0, 1, 1, 0],
  );
  const opacity4 = useTransform(scrollYProgress, [0.81, 0.91, 1], [0, 1, 1]);

  return (
    // Висота 400vh визначає тривалість скролу.
    <section
      ref={ref}
      data-theme="light"
      className="relative w-full h-[400vh] z-20"
    >
      {/* === ШАР 1: КОЛЬОРОВІ БЛОКИ (ФОН) === */}
      {/* Вони розтягнуті на 4 екрани вниз. Коли ти скролиш, вони природно їдуть вгору. */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="h-screen w-full bg-[#f5f5f7]"></div>
        <div className="h-screen w-full bg-[#d1fae5]"></div>
        <div className="h-screen w-full bg-[#fef08a]"></div>
        <div className="h-screen w-full bg-[#fee2e2]"></div>
      </div>

      {/* === ШАР 2: ЗАФІКСОВАНИЙ КОНТЕНТ === */}
      {/* sticky top-0 фіксує цей блок на екрані. Він СТРОГО нерухомий. */}
      <div className="sticky top-0 left-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden z-10 pointer-events-none">
        {/* КОНТЕЙНЕР ТЕКСТІВ */}
        <div className="absolute top-24 md:top-32 left-0 right-0 z-10 px-4 pointer-events-auto h-40">
          <motion.div
            style={{ opacity: opacity1 }}
            className="absolute inset-x-0 top-0 flex flex-col items-center text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
              Інтерфейс, який ви знаєте
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Зручна робота з документами, звітами та налаштуваннями у звичному
              середовищі BAS.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: opacity2 }}
            className="absolute inset-x-0 top-0 flex flex-col items-center text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
              Хмарна надійність
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Безпечний доступ до вашої бази 24/7. Автоматичне резервне
              копіювання та захист від втрати даних.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: opacity3 }}
            className="absolute inset-x-0 top-0 flex flex-col items-center text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
              Максимальна швидкість
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Система працює без затримок навіть при великій кількості
              користувачів та об'ємних базах даних.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: opacity4 }}
            className="absolute inset-x-0 top-0 flex flex-col items-center text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
              Підтримка завжди поруч
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Ми беремо на себе всі оновлення та допрацювання. Ви фокусуєтесь
              виключно на своєму бізнесі.
            </p>
          </motion.div>
        </div>

        {/* САМА КАРТИНКА */}
        <motion.div
          style={{ y: yEnter, scale: scaleEnter }}
          className="relative z-20 mt-32 md:mt-40 w-full max-w-5xl rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 bg-white pointer-events-auto"
        >
          <img
            src="/main/BAS-img.jpg"
            alt="BAS Interface"
            className="w-full h-auto object-cover block"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default White;
