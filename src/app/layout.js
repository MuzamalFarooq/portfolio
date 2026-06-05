import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { EasterEgg } from "@/components/ui/EasterEgg";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Muzamal Farooq | MERN Stack Developer",
    template: "%s | Muzamal Farooq",
  },
  description:
    "Premium portfolio of a MERN Stack Software Engineer specializing in React, Next.js, Node.js, and modern web experiences.",
  keywords: [
    "MERN Stack",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Muzamal Farooq" }],
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
    shortcut: "/icon",
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Muzamal Farooq | MERN Stack Developer",
    description: "Building immersive, award-worthy web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} font-body antialiased`}
      >
        <Providers>
          <LoadingScreen />
          <CustomCursor />
          <MouseGlow />
          <div className="noise-overlay" aria-hidden />
          <EasterEgg />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
