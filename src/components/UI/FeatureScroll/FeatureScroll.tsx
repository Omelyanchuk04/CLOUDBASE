"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Apple Fitness+",
    description:
      "Tap into the world’s largest library of 4K UHD fitness and wellness content. Try 12 workout types, from Strength to HIIT and Yoga to Meditation.",
    color: "#00d26a",
    icon: "🟢",
  },
  {
    id: 2,
    title: "Apple Music",
    description:
      "Listen to over 100 million songs and live radio on the big screen. You can even be your own video star with Apple Music Sing.",
    color: "#6c38cc",
    icon: "🎵",
  },
  {
    id: 3,
    title: "Apple Arcade",
    description:
      "Playing Apple Arcade games is even more immersive on your big screen. Multiuser support helps players keep track of their individual game levels.",
    color: "#e63946",
    icon: "🕹️",
  },
];

export const FeatureScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Точки відліку для 3 слайдів (0 - початок, 0.5 - середина, 1 - кінець)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [features[0].color, features[1].color, features[2].color],
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: "300vh" }}
      data-theme="dark"
    >
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden transition-colors duration-200"
      >
        <div className="mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-between px-6 md:flex-row md:px-20">
          {/* ЛІВА ЧАСТИНА: Текст */}
          <div className="relative flex h-1/2 w-full flex-col justify-center md:h-full md:w-1/2">
            {features.map((feature, index) => {
              // Жорстко задані (безпечні) межі від 0 до 1 для уникнення помилки Offsets
              const inputRange =
                index === 0
                  ? [0, 0.3]
                  : index === 1
                    ? [0.2, 0.5, 0.8]
                    : [0.7, 1];
              const opacityOutput =
                index === 0 ? [1, 0] : index === 1 ? [0, 1, 0] : [0, 1];
              const translateOutput =
                index === 0 ? [0, -50] : index === 1 ? [50, 0, -50] : [50, 0];

              const opacity = useTransform(
                scrollYProgress,
                inputRange,
                opacityOutput,
              );
              const translateY = useTransform(
                scrollYProgress,
                inputRange,
                translateOutput,
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{ opacity, translateY }}
                  className="absolute inset-x-0 flex flex-col pr-10 text-white"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black/20 text-3xl shadow-xl backdrop-blur-md">
                    {feature.icon}
                  </div>
                  <h2 className="mb-4 text-4xl font-bold tracking-tight">
                    {feature.title}
                  </h2>
                  <p className="text-lg font-medium leading-relaxed opacity-90">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ПРАВА ЧАСТИНА: Екран/Макбук */}
          <div className="relative flex h-1/2 w-full items-center justify-center md:h-full md:w-1/2">
            <div className="relative h-[300px] w-full max-w-[500px] overflow-hidden rounded-2xl bg-black shadow-2xl md:h-[400px]">
              {features.map((feature, index) => {
                // Ті самі безпечні межі для картинок
                const inputRange =
                  index === 0
                    ? [0, 0.3]
                    : index === 1
                      ? [0.2, 0.5, 0.8]
                      : [0.7, 1];
                const opacityOutput =
                  index === 0 ? [1, 0] : index === 1 ? [0, 1, 0] : [0, 1];

                const opacity = useTransform(
                  scrollYProgress,
                  inputRange,
                  opacityOutput,
                );

                return (
                  <motion.div
                    key={feature.id}
                    style={{ opacity }}
                    className="absolute inset-0 flex items-center justify-center bg-zinc-900"
                  >
                    <span className="text-2xl font-bold text-white/50">
                      {feature.title} Interface
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
