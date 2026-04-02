import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMUT — smutlabel",
  description: "SMUTLABEL — home on the web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
