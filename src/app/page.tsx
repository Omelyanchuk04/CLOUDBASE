// app/page.tsx
import { Hero } from "@/components/sections/Hero/Hero";
import { Problem } from "@/components/sections/Problem/Problem";
import { Services } from "@/components/sections/Services/Services";
import { ParallaxSection } from "@/components/sections/ParallaxSection/ParallaxSection";
import { MacbookSection } from "@/components/sections/MacbookSection/MacbookSection";
import { HowWeWork } from "@/components/sections/HowWeWork/HowWeWork";
import { Pricing } from "@/components/sections/Pricing/Pricing";
import { ServerSection } from "@/components/sections/Server/ServerSection";
import { ServerVideoSection } from "@/components/sections/ServerVideo/ServerVideoSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Хто ми і що робимо */}s
      <Hero />
      <ServerVideoSection />
      <ServerSection />
      {/* 5. MacBook-скрол — показуємо хмарну версію */}
      <MacbookSection />
      {/* 2. Проблеми клієнтів — дзеркало болю */}
      {/* <Problem /> */}
      {/* <Services />

    
      <ParallaxSection /> */}
      {/* 6. Як ми працюємо */}
      {/* <HowWeWork /> */}
      {/* 7. Ціни */}
      <Pricing />
    </>
  );
}
