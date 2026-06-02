"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import type { ParallaxProduct } from "@/lib/constants";
import styles from "./HeroParallax.module.scss";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroParallaxProps {
  products: ParallaxProduct[];
}

interface ProductCardProps {
  product: ParallaxProduct;
  translate: MotionValue<number>;
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, translate }: ProductCardProps) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -8 }}
      className={styles.card}
    >
      <div className={styles.card__inner}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 280px, 360px"
          className={styles.card__image}
          // Fallback поки немає реальних скріншотів
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Placeholder якщо скріншот ще не завантажено */}
        <div className={styles.card__placeholder} aria-hidden="true">
          <span className={styles.card__placeholderIcon}>◈</span>
          <span className={styles.card__placeholderText}>{product.title}</span>
        </div>
      </div>
      <div className={styles.card__label}>
        <p className={styles.card__labelText}>{product.title}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HeroParallax({ products }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const spring = { stiffness: 300, damping: 30, bounce: 0 };

  // Row 1 — рухається ліворуч
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400]),
    spring,
  );
  // Row 2 — рухається праворуч
  const translateXRight = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 300]),
    spring,
  );
  // Row 3 — рухається ліворуч повільніше
  const translateXSlow = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    spring,
  );

  // Rotate та opacity для ефекту «відкидання»
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    spring,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.3, 1]),
    spring,
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.85, 1]),
    spring,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-100, 0]),
    spring,
  );

  // Ділимо продукти на 3 ряди
  const row1 = products.slice(0, 5);
  const row2 = products.slice(5, 10);
  const row3 = products.slice(10, 15);

  return (
    <div ref={ref} className={styles.wrapper}>
      {/* Sticky header — заголовок залишається поки скролиш крізь блок */}
      <div className={styles.header}>
        <div className="container">
          <p className={`t-label ${styles.header__label}`}>
            Приклади нашої роботи в BAS
          </p>
          <h2 className={`t-headline ${styles.header__title}`}>
            Усе, з чим
            <br />
            <span className={styles.header__titleDim}>ви щодня працюєте.</span>
          </h2>
          <p className={`t-body-lg ${styles.header__sub}`}>
            Облік, зарплата, звіти, банк — ми знаємо BAS зсередини і швидко
            вирішуємо будь-яку задачу.
          </p>
        </div>
      </div>

      {/* Parallax grid */}
      <motion.div
        style={{
          rotateX,
          opacity,
          scale,
          y: translateY,
        }}
        className={styles.grid}
      >
        {/* Row 1 */}
        <div className={styles.row}>
          {row1.map((p) => (
            <ProductCard key={p.title} product={p} translate={translateX} />
          ))}
        </div>

        {/* Row 2 */}
        <div className={styles.row}>
          {row2.map((p) => (
            <ProductCard
              key={p.title}
              product={p}
              translate={translateXRight}
            />
          ))}
        </div>

        {/* Row 3 */}
        <div className={styles.row}>
          {row3.map((p) => (
            <ProductCard key={p.title} product={p} translate={translateXSlow} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
