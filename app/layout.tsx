import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import FloatingHomeButton from "@/components/FloatingHomeButton";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SalsaBerlin 2026 — קונגרס סלסה + רכיבת אופנוע",
  description:
    "מרכז שליטה אישי לטיול קונגרס הסלסה ורכיבת האופנוע בגרמניה, אוגוסט–ספטמבר 2026.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SalsaBerlin 2026",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <ServiceWorkerRegister />
        <Nav />
        <FloatingHomeButton />
        <main className="flex-1 lg:mr-64 pb-24 lg:pb-8 pt-safe">
          <div className="mx-auto w-full max-w-3xl lg:max-w-5xl px-4 py-4 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
