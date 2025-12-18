import localFont from "next/font/local";
import "./globals.css";
import LayoutClient from "@/componentes/LayoutClient";

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
      <body className={`${futura.variable} ${futuraCondensed.variable} ${syntha.variable} font-sans`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
