"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const White = () => {
  const ref = useRef<HTMLElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 900);
      setWindowWidth(w);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ["start 170%", "start start"],
  });

  // ОПТИМІЗАЦІЯ 2: Використовуємо звичайний vh замість svh, щоб уникнути лагів при скролі на iOS
  const yEnter = useTransform(enterProgress, [0, 1], ["-100vh", "0vh"]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const xProgress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const xEnter = useTransform(xProgress, (v) => {
    if (isMobile) return `0px`;
    return `calc(${v * 50}vw - ${v * 50}% - ${v * 32}px)`;
  });

  const scaleEnter = useTransform(scrollYProgress, (v) => {
    if (isMobile) return 1;

    const minW = 900,
      maxW = 1600;
    const minT = 0.55,
      maxT = 0.85;
    const boundedW = Math.min(Math.max(windowWidth, minW), maxW);
    const target = minT + ((boundedW - minW) / (maxW - minW)) * (maxT - minT);

    const p = Math.min(Math.max(v / 0.25, 0), 1);
    return 1 - p * (1 - target);
  });

  const opacity1 = useTransform(scrollYProgress, (v) => {
    if (isMobile) return 1;
    if (v < 0.05) return 0;
    if (v > 0.25) return 1;
    return (v - 0.05) / (0.25 - 0.05);
  });

  const clip2Val = useTransform(scrollYProgress, (v) => {
    const start = isMobile ? 0 : 0.25;
    const end = isMobile ? 0.3333 : 0.5;
    const p = Math.min(Math.max((v - start) / (end - start), 0), 1);
    return 100 - p * 100;
  });
  const clip3Val = useTransform(scrollYProgress, (v) => {
    const start = isMobile ? 0.3333 : 0.5;
    const end = isMobile ? 0.6666 : 0.75;
    const p = Math.min(Math.max((v - start) / (end - start), 0), 1);
    return 100 - p * 100;
  });
  const clip4Val = useTransform(scrollYProgress, (v) => {
    const start = isMobile ? 0.6666 : 0.75;
    const end = isMobile ? 1.0 : 1.0;
    const p = Math.min(Math.max((v - start) / (end - start), 0), 1);
    return 100 - p * 100;
  });

  const clip2 = useTransform(clip2Val, (v) => `inset(${v}% 0 0 0)`);
  const clip3 = useTransform(clip3Val, (v) => `inset(${v}% 0 0 0)`);
  const clip4 = useTransform(clip4Val, (v) => `inset(${v}% 0 0 0)`);

  // === ВЕРТИКАЛЬНЕ ВИРІВНЮВАННЯ ТЕКСТІВ ===
  // svh змінено на vh
  const textLayerClasses =
    "sticky top-0 h-[100vh] w-full flex flex-col max-[899px]:justify-end max-[899px]:pb-[10vh] min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-start px-6 min-[900px]:px-10 lg:px-[5%] xl:px-[8%]";

  const exactWidths =
    "w-[361px] min-[390px]:w-[376px] min-[428px]:w-[407px] min-[458px]:w-[438px] sm:w-[538px] md:w-[691px]";

  const textWrapperClasses =
    "flex flex-col items-start text-left z-20 pointer-events-auto " +
    `max-[899px]:mx-auto ${exactWidths} ` +
    "min-[900px]:w-full min-[900px]:max-w-[340px] lg:max-w-[380px] xl:max-w-[440px]";

  const baseLogoClasses = "w-auto mb-3 md:mb-5 object-contain object-left";

  const paragraphClasses =
    "text-[19px] min-[900px]:text-xl lg:text-3xl font-semibold tracking-tight leading-snug";
  const inlineTitleClasses = "text-black";
  const inlineDescClasses = "text-black/60";

  const linkClasses =
    "mt-3 md:mt-5 inline-flex items-center text-[#0066cc] font-semibold text-[17px] min-[900px]:text-lg lg:text-xl hover:opacity-80 transition-opacity group cursor-pointer tracking-tight";

  const chevronIcon = (
    <svg
      className="ml-1 w-4 h-4 min-[900px]:w-4 min-[900px]:h-4 lg:w-5 lg:h-5 transition-transform group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      ></path>
    </svg>
  );

  // svh змінено на vh
  const imgLayerClasses =
    "absolute inset-0 flex max-[899px]:items-start max-[899px]:pt-[18vh] min-[900px]:pt-0 min-[900px]:items-center justify-center pointer-events-none";

  // ОПТИМІЗАЦІЯ 3: Відключено тінь на мобільному (max-[899px]:shadow-none)
  const wrapperClasses =
    "relative aspect-video max-[899px]:rounded-none min-[900px]:rounded-xl md:rounded-2xl overflow-hidden border border-gray-200/60 bg-white max-[899px]:shadow-none min-[900px]:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] shrink-0 pointer-events-auto " +
    "max-[899px]:origin-top min-[900px]:origin-right " +
    `${exactWidths} min-[900px]:w-[691px] lg:w-[845px] xl:w-[998px] 2xl:w-[1152px]`;

  const imgClasses = "w-full h-full object-fill block absolute inset-0";

  return (
    <section ref={ref} data-theme="light" className="relative w-full">
      <div className="relative w-full z-0">
        {/* ШАР 1 (Білий) */}
        <div className="max-[899px]:h-[100vh] min-[900px]:h-[200vh] w-full bg-[#f5f5f7]">
          <div className={textLayerClasses}>
            <motion.div
              style={{ opacity: opacity1 }}
              className={textWrapperClasses}
            >
              <img
                src="/main/BAS-logo.png"
                alt="BAS Logo"
                className={`h-9 lg:h-12 ${baseLogoClasses}`}
              />
              <div className={paragraphClasses}>
                <span className={inlineTitleClasses}>
                  Супровід та підтримка BAS.{" "}
                </span>
                <span className={inlineDescClasses}>
                  Професійне обслуговування, регулярні оновлення та тонке
                  налаштування конфігурацій для безперебійної роботи вашого
                  бізнесу.
                </span>
              </div>
              <a href="#" className={linkClasses}>
                Дізнатись більше {chevronIcon}
              </a>
            </motion.div>
          </div>
        </div>

        {/* ШАР 2 (Зелений) */}
        <div className="h-[100vh] w-full bg-[#6ee7b7]">
          <div className={textLayerClasses}>
            <div className={textWrapperClasses}>
              <img
                src="/main/KBS-logo.png"
                alt="KBS Logo"
                className={`h-9 lg:h-12 ${baseLogoClasses}`}
              />
              <div className={paragraphClasses}>
                <span className={inlineTitleClasses}>
                  Обслуговування систем KBS.{" "}
                </span>
                <span className={inlineDescClasses}>
                  Надійний супровід програмних продуктів. Гарантуємо
                  актуальність звітних форм та стабільність роботи ваших баз
                  даних.
                </span>
              </div>
              <a href="#" className={linkClasses}>
                Дізнатись більше {chevronIcon}
              </a>
            </div>
          </div>
        </div>

        {/* ШАР 3 (Жовтий) */}
        <div className="h-[100vh] w-full bg-[#fde047]">
          <div className={textLayerClasses}>
            <div className={textWrapperClasses}>
              <img
                src="/main/extention-logo.png"
                alt="Extensions Logo"
                className={`h-11 lg:h-20 ${baseLogoClasses}`}
              />
              <div className={paragraphClasses}>
                <span className={inlineTitleClasses}>
                  Індивідуальні допрацювання.{" "}
                </span>
                <span className={inlineDescClasses}>
                  Розробка нестандартних звітів, специфічних обробок, нових
                  друкованих форм та розширення функціоналу під ваші процеси.
                </span>
              </div>
              <a href="#" className={linkClasses}>
                Дізнатись більше {chevronIcon}
              </a>
            </div>
          </div>
        </div>

        {/* ШАР 4 (Червоний) */}
        <div className="h-[100vh] w-full bg-[#fca5a5]">
          <div className={textLayerClasses}>
            <div className={textWrapperClasses}>
              <img
                src="/main/rdp-logo.png"
                alt="RDP Cloud Logo"
                className={`h-10 lg:h-16 ${baseLogoClasses}`}
              />
              <div className={paragraphClasses}>
                <span className={inlineTitleClasses}>Надійна хмара. </span>
                <span className={inlineDescClasses}>
                  Безпечний віддалений доступ до ваших баз 24/7. Розгортання,
                  адміністрування та щоденне резервне копіювання на наших
                  серверах.
                </span>
              </div>
              <a href="#" className={linkClasses}>
                Дізнатись більше {chevronIcon}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
          <div className={imgLayerClasses}>
            <motion.div
              style={{
                y: yEnter,
                x: xEnter,
                scale: scaleEnter,
                willChange: "transform",
              }}
              className={wrapperClasses}
            >
              {/* ОПТИМІЗАЦІЯ 1: Прибрали loading="lazy". Усі картинки вантажаться одразу, тому затримок при анімації не буде. */}
              <img
                src="/main/BAS-img.jpg"
                alt="Підтримка BAS"
                className={imgClasses}
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
          </div>

          <motion.div
            style={{
              clipPath: clip2,
              WebkitClipPath: clip2,
              transform: "translateZ(0)",
              willChange: "clip-path",
            }}
            className={imgLayerClasses}
          >
            <motion.div
              style={{
                y: yEnter,
                x: xEnter,
                scale: scaleEnter,
                willChange: "transform",
              }}
              className={wrapperClasses}
            >
              <img
                src="/main/BAS-img2.jpg"
                alt="Системи KBS"
                className={imgClasses}
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{
              clipPath: clip3,
              WebkitClipPath: clip3,
              transform: "translateZ(0)",
              willChange: "clip-path",
            }}
            className={imgLayerClasses}
          >
            <motion.div
              style={{
                y: yEnter,
                x: xEnter,
                scale: scaleEnter,
                willChange: "transform",
              }}
              className={wrapperClasses}
            >
              <img
                src="/main/BAS-img3.jpg"
                alt="Індивідуальні допрацювання"
                className={imgClasses}
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{
              clipPath: clip4,
              WebkitClipPath: clip4,
              transform: "translateZ(0)",
              willChange: "clip-path",
            }}
            className={imgLayerClasses}
          >
            <motion.div
              style={{
                y: yEnter,
                x: xEnter,
                scale: scaleEnter,
                willChange: "transform",
              }}
              className={wrapperClasses}
            >
              <img
                src="/main/BAS-img4.jpg"
                alt="Хмара для бухгалтерії"
                className={imgClasses}
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default White;
