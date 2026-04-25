import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";

export const metadata: Metadata = {
  title: {
    default: "Astralearnia — Engineering Intelligence. Empowering Minds.",
    template: "%s | Astralearnia",
  },
  description:
    "Enterprise AI systems, secure cloud infrastructure, and next-generation education technology — built for organizations ready to scale globally.",
  keywords: [
    "AI Integration",
    "Enterprise Technology",
    "Cloud Infrastructure",
    "Cybersecurity",
    "EdTech",
    "Smart School AI",
    "Blockchain",
    "IoT",
    "Robotics",
    "Digital Transformation",
  ],
  authors: [{ name: "Astralearnia Technologies" }],
  creator: "Astralearnia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://astralearnia.com",
    title: "Astralearnia — Engineering Intelligence. Empowering Minds.",
    description:
      "Enterprise AI systems, secure cloud infrastructure, and next-generation education technology.",
    siteName: "Astralearnia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astralearnia",
    description: "Engineering Intelligence. Empowering Minds.",
    creator: "@astralearnia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#03050A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}