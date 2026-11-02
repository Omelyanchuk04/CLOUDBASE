"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Через scroll-behavior: smooth у globals.scss прокрутка вгору при переході
// анімувалась і обривалась посередині сторінки. Тут при зміні адреси
// сторінка миттєво стає на початок. Якщо в адресі є якір (#solutions),
// прокрутку до нього лишаємо браузеру.
const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
