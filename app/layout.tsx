import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.developer }],
  keywords: [
    "GitHub widget",
    "contribution graph",
    "commit streak",
    "iOS widget",
    "Home Screen widget",
  ],
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.siteUrl,
    siteName: site.name,
    images: [{ url: "/icon.png", width: 512, height: 512, alt: `${site.name} app icon` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/icon.png"],
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-level-4 focus:px-4 focus:py-2 focus:font-medium focus:text-surface"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
