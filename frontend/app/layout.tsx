import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import OnboardingModal from "@/components/OnboardingModal";

export const metadata: Metadata = {
  title: "PopSip - Professional Bartending Services",
  description: "Connect with professional bartenders and cocktail services for your next event.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* First-time user onboarding (client component, reads localStorage) */}
        <OnboardingModal />
        {/* Animated page transitions on every route change */}
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
