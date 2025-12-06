import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CookieConsent from "@/components/common/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CalcBox - Free Online Calculators & Tools",
    template: "%s | CalcBox",
  },
  description: "Free online calculators and tools for everyday use. Calculate BMI, due dates, loans, age, and more. Fast, accurate, and easy to use.",
  keywords: "calculator, online calculator, BMI calculator, loan calculator, due date calculator, age calculator, free tools, pregnancy calculator, tip calculator",
  authors: [{ name: "CalcBox Team" }],
  creator: "CalcBox",
  publisher: "CalcBox",
  metadataBase: new URL("https://calcbox.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calcbox.com",
    siteName: "CalcBox",
    title: "CalcBox - Free Online Calculators & Tools",
    description: "Free online calculators and tools for everyday use. Calculate BMI, due dates, loans, age, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcBox - Free Online Calculators & Tools",
    description: "Free online calculators and tools for everyday use.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
