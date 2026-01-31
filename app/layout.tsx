import type { Metadata } from "next";
import "./globals.css";
import { fontDisplay, fontMono, fontSans } from "./fonts";
import { ThemeProvider } from "./providers/theme-provider";
import LenisProvider from "./providers/lenis-provider";

export const metadata: Metadata = {
  title: "Luji | Portfolio",
  description: "Personal portfolio of Zulfajri (a.k.a Luji), a software engineer specializing in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} antialiased`}>
        <LenisProvider />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
