"use client";

import React from "react";
import { MacbookScroll } from "@/components/ui/MacbookScroll/MacbookScroll";

export const MacbookSection = () => {
  return (
    <div className="overflow-hidden bg-[#0B0B0F] w-full">
      <MacbookScroll
        title={
          <span className="text-white text-4xl font-bold text-center block">
            BAS завжди під рукою. <br /> No kidding.
          </span>
        }
        src={`/main/BAS-img.jpg`} // Шлях до вашого фото в папці public
        showGradient={false}
      />
    </div>
  );
};
