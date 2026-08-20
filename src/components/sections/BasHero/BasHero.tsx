import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BasHero.module.scss";

export const BasHero = () => {
  // Масив з 6 картинками
  const floatingImages = [
    {
      src: "/bas/bas-img-1.png",
      className: styles.img1,
      alt: "BAS interface 1",
    },
    {
      src: "/bas/bas-img-2.png",
      className: styles.img2,
      alt: "BAS interface 2",
    },
    {
      src: "/bas/bas-img-3.png",
      className: styles.img3,
      alt: "BAS interface 3",
    },
    {
      src: "/bas/bas-img-4.png",
      className: styles.img4,
      alt: "BAS interface 4",
    },
    {
      src: "/bas/bas-img-5.png",
      className: styles.img5,
      alt: "BAS interface 5",
    },
    {
      src: "/bas/bas-img-6.png",
      className: styles.img6,
      alt: "BAS interface 6",
    },
  ];

  return (
    <section className={styles.hero}>
      {/* Контейнер для статичних картинок (позаду тексту) */}
      <div className={styles.imagesContainer} aria-hidden="true">
        {floatingImages.map((img, index) => (
          <div key={index} className={`${styles.floatingImg} ${img.className}`}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 0px, 200px"
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Оренда, впровадження та доопрацювання систем BAS і KBS
          </h1>
          <p className={styles.subtitle}>
            Адаптуємо типові конфігурації під специфіку вашого бізнесу.
            Налаштуємо обмін даними, створимо кастомні звіти та автоматизуємо
            рутину.
          </p>
          <div className={styles.actions}>
            <Link href="/contacts" className={styles.btnPrimary}>
              Замовити консультацію
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
