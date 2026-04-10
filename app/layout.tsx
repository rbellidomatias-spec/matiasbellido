import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { ModalProvider } from "@/context/ModalContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matías Bellido — Optimizing Reality through Data & AI",
  description:
    "Actuario & Data Scientist. Automatización, modelos estadísticos y ejecución con IA.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <ModalProvider>{children}</ModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}