import { HeroParallax } from "@/components/ui/HeroParallax/HeroParallax";
import { PARALLAX_PRODUCTS } from "@/lib/constants";

// "use client" не потрібно тут — він є в HeroParallax.tsx
export function ParallaxSection() {
  return <HeroParallax products={PARALLAX_PRODUCTS} />;
}
