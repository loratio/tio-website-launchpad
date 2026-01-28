import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "tio Website LookBook | Design Brief Wizard",
  description: "Discover your website's visual identity through an interactive design brief experience. Select styles, colors, and define your brand personality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${lato.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen bg-background pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
