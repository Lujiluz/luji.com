import type { Metadata } from "next";
import "./globals.css";
import { fontDisplay, fontMono, fontSans } from "./fonts";
import { ThemeProvider } from "./providers/theme-provider";
import LenisProvider from "./providers/lenis-provider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Zulfajri (Luji) | Backend & Full-Stack Developer",
  description: "Backend-focused Web Developer with experience in building scalable systems (100K+ users) and AI-driven microservices.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://luji-space.vercel.app"),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://luji-space.vercel.app/#person",
        name: "Zulfajri",
        alternateName: "Luji",
        url: "https://luji-space.vercel.app",
        image: "https://luji-space.vercel.app/og-image.png",
        jobTitle: "Backend Developer",
        description: "Backend-focused developer with 3 years of experience in building scalable REST APIs and HLS video streaming.",
        sameAs: ["https://linkedin.com/in/luji-space", "https://github.com/Lujiluz", "https://www.instagram.com/luji.archive"],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universitas Insan Pembangunan Indonesia",
        },
        knowsAbout: ["Backend Engineering", "Next.js", "Golang", "PostgreSQL", "HLS Video Streaming", "Microservices"],
      },
      {
        "@type": "WebSite",
        "@id": "https://luji-space.vercel.app/#website",
        url: "https://luji-space.vercel.app",
        name: "Luji Space",
        // Nge-link ke data Person di atas
        publisher: { "@id": "https://luji-space.vercel.app/#person" },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://luji-space.vercel.app/#profile",
        url: "https://luji-space.vercel.app",
        // Halaman ini profilnya si Person
        mainEntity: { "@id": "https://luji-space.vercel.app/#person" },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} antialiased`}>
        <LenisProvider />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
