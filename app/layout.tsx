import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050708",
};

export const metadata: Metadata = {
  title: "Firas Rihan | Senior Full-Stack Engineer",
  description:
    "Senior Full-Stack Engineer (L3) & Team Lead building business-critical retail platforms used daily across 6,000+ U.S. retail stores. React, Next.js, Angular, .NET Core, Node.js, Azure & AWS.",
  keywords: [
    "Firas Rihan",
    "Senior Full-Stack Engineer",
    "Team Lead",
    "React",
    "Next.js",
    "Angular",
    ".NET Core",
    "Node.js",
    "Azure",
    "AWS",
  ],
  authors: [{ name: "Firas Rihan" }],
  openGraph: {
    title: "Firas Rihan | Senior Full-Stack Engineer",
    description:
      "Senior Full-Stack Engineer (L3) & Team Lead building business-critical retail platforms used daily across 6,000+ U.S. retail stores.",
    type: "website",
    locale: "en_US",
    siteName: "Firas Rihan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Firas Rihan | Senior Full-Stack Engineer",
    description:
      "Senior Full-Stack Engineer (L3) & Team Lead building business-critical retail platforms used daily across 6,000+ U.S. retail stores.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
