import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MixMaster - Professional Cocktail Catering",
  description: "Elevate your events with expert bartending services and custom cocktail packages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
