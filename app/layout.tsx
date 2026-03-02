import type { Metadata } from "next";
import "./globals.css";
import { fontDisplay, fontMono, fontSans } from "./fonts";
import { ThemeProvider } from "./providers/theme-provider";
import LenisProvider from "./providers/lenis-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Zulfajri (Luji) | Backend & Full-Stack Developer",
  description: "Backend-focused Web Developer specializing in scalable systems (100K+ users), AI-powered media processing, and high-performance architecture.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://luji-space.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zulfajri (Luji) | Backend & Full-Stack Developer",
    description: "Expertise in Node.js, Golang, and Python. Proven track record in optimizing API performance and reducing infrastructure costs.",
    url: "https://luji-space.vercel.app",
    siteName: "Luji Space",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luji",
    alternateName: "Lj.",
    url: "https://luji-space.vercel.app",
    image: "https://luji-space.vercel.app/og-image.png",
    sameAs: ["https://linkedin.com/in/luji-space", "https://github.com/Lujiluz", "https://www.instagram.com/luji.archive"],
    jobTitle: "Backend Developer | Full-Stack Web Developer",
    description: "Backend-focused developer with 3 years of experience in building scalable systems and AI-driven microservices.",
    knowsAbout: [
      "Backend Engineering",
      "Full-Stack Web Development",
      "Node.js (Express & NestJS)",
      "Golang (GIN)",
      "Python (FastAPI & Flask)",
      "System Optimization",
      "Microservices Architecture",
      "HLS Video Streaming",
      "PostgreSQL & MongoDB",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Insan Pembangunan Indonesia",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} antialiased`}>
        {/* JSON-LD Script */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />.
        <LenisProvider />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
