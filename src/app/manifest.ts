import type { MetadataRoute } from "next";

// /manifest.webmanifest: назва й іконки для «Додати на головний екран»
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CloudBASE — обслуговування BAS і KBS, оренда хмари",
    short_name: "CloudBASE",
    description: "Обслуговування бухгалтерських програм BAS і KBS, оренда хмари для їх роботи.",
    start_url: "/",
    display: "standalone",
    lang: "uk",
    background_color: "#07070d",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
