// Прокрутка до секції з урахуванням фіксованої шапки.
// Якщо в секції є елемент з data-scroll-anchor (наприклад заголовок форми
// після довгого градієнтного переходу), прокручуємо до нього, а не до верху секції.
// Так секцію видно повністю: не обрізається під шапкою і не лишається півекрана переходу

export const HEADER_OFFSET = 100;

export const scrollToSection = (id: string, behavior: ScrollBehavior = "smooth"): boolean => {
  const section = document.getElementById(id);
  if (!section) return false;
  const target = section.querySelector<HTMLElement>("[data-scroll-anchor]") ?? section;
  // data-scroll-offset на якорі задає власний відступ (наприклад 0 для блоків на весь екран)
  const offset = target.dataset.scrollOffset !== undefined ? Number(target.dataset.scrollOffset) : HEADER_OFFSET;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
};
