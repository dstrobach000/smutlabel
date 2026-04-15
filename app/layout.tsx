import type { Metadata } from "next";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SMUT — South Moravian Utility Tapes",
    template: "%s — SMUT",
  },
  description: "Hardcore punk / DIY tape label — South Moravian Utility Tapes.",
  icons: {
    icon: [
      { url: "/images/favicon/ikona_32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon/ikona_192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon/ikona_180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
