import { DM_Sans, IBM_Plex_Mono, Outfit } from "next/font/google";

export const fontSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const fontDisplay = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});
