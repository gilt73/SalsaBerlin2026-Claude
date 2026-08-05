import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "קונגרס סלסה + רכיבת אופנוע — ברלין 2026",
    short_name: "SalsaBerlin 2026",
    description:
      "מרכז שליטה אישי לטיול: טיסות, לינה, לו״ז קונגרס, מסלולי רכיבה, כספים, מוזיקה, ניידות וקולינריה.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#faf7f5",
    theme_color: "#f97316",
    lang: "he",
    dir: "rtl",
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
