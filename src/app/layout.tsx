import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "GGEA — Garage & Services Automobiles",
  description:
    "GGEA — Garage Général Electronique Automobile à Kinshasa. Diagnostic professionnel et services automobiles à domicile, avec déplacement gratuit.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
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
    title: "GGEA — Garage & Services Automobiles",
    description:
      "Diagnostic professionnel et services automobiles à domicile à Kinshasa. Déplacement gratuit.",
    type: "website",
    locale: "fr_CD",
    siteName: "GGEA",
    images: [
      {
        url: "/opengraph-image.png",
        width: 512,
        height: 512,
        alt: "Logo GGEA — Garage Général Electronique Automobile",
      },
    ],
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
