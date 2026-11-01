// Плавні переходи між секціями.
// Звичайний linear-gradient змінює колір по прямій, і на початку та в кінці
// переходу око бачить «злам» (різку лінію). Тут колір іде по S-кривій
// (smootherstep) через багато проміжних точок, тож межі не видно.

type RGBA = [number, number, number, number];

const parse = (c: string): RGBA => {
  const h = c.replace("#", "");
  const full = h.length === 3 ? h.split("").map((x) => x + x).join("") : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
    1,
  ];
};

const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

const stops = (from: RGBA, to: RGBA, steps: number) =>
  Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const e = smootherstep(t);
    const ch = (k: number) => from[k] + (to[k] - from[k]) * e;
    return `rgba(${Math.round(ch(0))}, ${Math.round(ch(1))}, ${Math.round(ch(2))}, ${ch(3).toFixed(3)}) ${(t * 100).toFixed(1)}%`;
  }).join(", ");

/** Перехід між двома суцільними кольорами (#hex) */
export const easedGradient = (from: string, to: string, direction = "to bottom", steps = 24) =>
  `linear-gradient(${direction}, ${stops(parse(from), parse(to), steps)})`;

/** Поява кольору з прозорості (накладка поверх фону секції) */
export const easedFade = (color: string, direction = "to bottom", steps = 24) => {
  const c = parse(color);
  return `linear-gradient(${direction}, ${stops([c[0], c[1], c[2], 0], c, steps)})`;
};

/** Маска, що м'яко гасить фонові плями біля верхнього й нижнього країв секції */
export const edgeMask = (top = 220, bottom = 260) => {
  const m = `linear-gradient(to bottom, transparent 0, #000 ${top}px, #000 calc(100% - ${bottom}px), transparent 100%)`;
  return { WebkitMaskImage: m, maskImage: m };
};
