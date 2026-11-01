"use client";

import React, { useState } from "react";
import { motion, MotionStyle, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import styles from "../../../BAS/sections/BasHero/BasHero.module.scss";

/* Вікно зі скриншотом. Кожне реагує на курсор окремо:
   нахиляється до мишки, виходить на передній план і світлішає */
export const TiltWindow = ({
  className,
  style,
  z,
  dim = false,
  src,
  title,
  alt,
}: {
  className: string;
  style: MotionStyle;
  z: number;
  dim?: boolean;
  src: string;
  title: string;
  alt: string;
}) => {
  const [hover, setHover] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.28), transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 18);
    rx.set(-(py - 0.5) * 14);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onLeave = () => {
    setHover(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div className={`absolute ${className}`} style={{ ...style, zIndex: hover ? 40 : z }}>
      <motion.div
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        animate={{
          scale: 1,
          filter: dim && !hover ? "brightness(0.7)" : "brightness(1)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className={styles.window}
      >
        <div className={styles.windowBar}>
          <i style={{ background: "#ff5f57" }} />
          <i style={{ background: "#febc2e" }} />
          <i style={{ background: "#28c840" }} />
          <span>{title}</span>
        </div>
        <img src={src} alt={alt} decoding="async" draggable={false} />
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: glare }}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};
