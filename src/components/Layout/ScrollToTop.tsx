"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/utils/scrollToSection";

// Через scroll-behavior: smooth у globals.scss прокрутка вгору при переході
// анімувалась і обривалась посередині сторінки. Тут при зміні адреси
// сторінка миттєво стає на початок.
// Якщо в адресі є якір (/BAS#solutions, /#application), прокручуємо до секції самі,
// з урахуванням шапки: браузер ставить секцію впритул до верху, і її початок
// ховався під шапкою або було видно лише перехід над формою.
const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    // Двічі: одразу і після того, як догрузяться зображення й анімації вище,
    // бо від них змінюється висота сторінки
    const run = () => scrollToSection(id, "instant");
    const raf = requestAnimationFrame(run);
    const t = setTimeout(run, 450);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
