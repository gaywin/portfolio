import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://gaywinwalters.com"),
  title: { default: "Gaywin Walters — Senior Product Designer", template: "%s | Gaywin Walters" },
  description: "Senior product designer in Cape Town shaping complex digital products, zero-to-one concepts and scalable design systems.",
  keywords: ["senior product designer", "product design", "UX design", "design systems", "Cape Town"],
  authors: [{ name: "Gaywin Walters" }], creator: "Gaywin Walters",
  openGraph: { type: "website", locale: "en_ZA", title: "Gaywin Walters — Senior Product Designer", description: "Complex products, made clear and scalable.", siteName: "Gaywin Walters", images: [{ url: "/og-v2.png", width: 1659, height: 948, alt: "Gaywin Walters — Complex products, made clear and scalable." }] },
  twitter: { card: "summary_large_image", title: "Gaywin Walters — Senior Product Designer", description: "Complex products, made clear and scalable.", images: ["/og-v2.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
