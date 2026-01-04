import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LoadingProvider from "@/componentes/LoadingProvider";

export const viewport: Viewport = {
  themeColor: 'white',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: "Groupe Allanic Energie",
  description: "Groupe Allanic Energie - Expertise en solutions énergétiques",
};

const futura = localFont({
  src: [
    {
      path: "../public/font/Futura.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/FuturaBT-Book.otf",
      weight: "450",
      style: "normal",
    },
    {
      path: "../public/font/FuturaBT-BookItalic.otf",
      weight: "450",
      style: "italic",
    },
    {
      path: "../public/font/Futura-CondensedBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/Futura-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-futura",
});

const futuraCondensed = localFont({
  src: [
    {
      path: "../public/font/Futura-Condensed.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-futura-condensed",
});

const syntha = localFont({
  src: "../public/font/Syntha.ttf",
  variable: "--font-syntha",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${futura.variable} ${futuraCondensed.variable} ${syntha.variable} font-futura`}>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
