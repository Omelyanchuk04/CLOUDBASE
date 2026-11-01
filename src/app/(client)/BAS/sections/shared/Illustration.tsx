"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

// Спільні частини схематичних ілюстрацій. Малюємо на полотні 480×340
// і масштабуємо під контейнер, тож ілюстрація завжди рівно по центру

export const CANVAS_W = 480;
export const CANVAS_H = 340;

export const ease = [0.22, 1, 0.36, 1] as const;

export const Fit = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setScale(Math.min(el.clientWidth / CANVAS_W, el.clientHeight / CANVAS_H));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Bar = ({ w, className = "" }: { w: string | number; className?: string }) => (
  <div className={`h-2.5 rounded-full bg-neutral-200 ${className}`} style={{ width: w }} />
);

export const AppWindow = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`overflow-hidden rounded-2xl bg-white shadow-[0_24px_50px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 ${className}`}
  >
    <div className="flex h-8 items-center gap-1.5 border-b border-neutral-100 px-3">
      <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </div>
    {children}
  </div>
);
