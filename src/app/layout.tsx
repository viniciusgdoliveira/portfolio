import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
    default: "Vinícius Guimarães de Oliveira - Software Engineer",
    template: "%s | Vinícius Guimarães de Oliveira"
  },
  description: "Software Engineer specializing in Shopify, Hydrogen, TypeScript, ReactJS, Next.js, and Firebase. Creating beautiful, functional, and user-centered digital experiences with modern technologies.",
  keywords: [
    "Software Engineer",
    "Shopify Developer",
    "Hydrogen",
    "TypeScript",
    "ReactJS",
    "Next.js",
    "Firebase",
    "Frontend Developer",
    "Full Stack Developer",
    "Web Development",
    "Portfolio",
    "Vinícius Guimarães de Oliveira"
  ],
  authors: [{ name: "Vinícius Guimarães de Oliveira" }],
  creator: "Vinícius Guimarães de Oliveira",
  publisher: "Vinícius Guimarães de Oliveira",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://viniciusgdoliveira.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viniciusgdoliveira.vercel.app",
    title: "Vinícius Guimarães de Oliveira - Software Engineer",
    description: "Software Engineer specializing in Shopify, Hydrogen, TypeScript, ReactJS, Next.js, and Firebase. Creating beautiful, functional, and user-centered digital experiences.",
    siteName: "Vinícius Guimarães de Oliveira Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vinícius Guimarães de Oliveira - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinícius Guimarães de Oliveira - Software Engineer",
    description: "Software Engineer specializing in Shopify, Hydrogen, TypeScript, ReactJS, Next.js, and Firebase.",
    images: ["/og-image.png"],
    creator: "@viniciusgdoliveira",
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
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
