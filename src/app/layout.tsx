import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GGEA — Checking Automobile à Domicile à Kinshasa | Diagnostic $35",
  description:
    "GGEA (Garage Général Electronique Automobile) — Service de checking et diagnostic automobile à domicile à Kinshasa, DRC. Déplacement gratuit ($0), diagnostic complet à $35. Évitez les mauvaises surprises avant d'acheter ou partir en voyage.",
  keywords: [
    "checking automobile Kinshasa",
    "diagnostic voiture Kinshasa",
    "inspection véhicule domicile",
    "OBD2 Kinshasa",
    "mécanique à domicile Kinshasa",
    "GGEA",
    "garage électronique automobile",
  ],
  authors: [{ name: "GGEA — Garage Général Electronique Automobile" }],
  openGraph: {
    title: "GGEA — Checking Automobile à Domicile à Kinshasa",
    description:
      "Diagnostic professionnel à votre domicile. Déplacement $0 | Diagnostic Complet $35. Kinshasa, DRC.",
    type: "website",
    locale: "fr_CD",
    siteName: "GGEA",
  },
  twitter: {
    card: "summary_large_image",
    title: "GGEA — Diagnostic Automobile à Domicile, Kinshasa",
    description: "Diagnostic professionnel $35. Déplacement gratuit. Kinshasa, DRC.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
