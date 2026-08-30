import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cosmolix.com"),
  title: {
    default: "Cosmolix | Beyond Limits",
    template: "%s | Cosmolix",
  },
  description:
    "Custom Software Development, AI Solutions, Cloud Platforms and IT Services.",
  keywords: [
    "AI Development",
    "Software Company",
    "Cloud Solutions",
    "IT Services",
    "Cosmolix",
  ],
  openGraph: {
    title: "Cosmolix Private Limited",
    description:
      "Custom Software Development, AI Solutions, Cloud Platforms and IT Services.",
    url: "https://cosmolix.com",
    siteName: "Cosmolix",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmolix Private Limited",
    description:
      "Custom Software Development, AI Solutions, Cloud Platforms and IT Services.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/brand/cosmolix-mark.png",
    shortcut: "/brand/cosmolix-mark.png",
    apple: "/brand/cosmolix-mark.png",
  },
  alternates: {
    canonical: "https://cosmolix.com",
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
      className={`${openSans.variable} h-full antialiased scroll-smooth`}
    >
      <body
        className={`font-sans bg-[#F5F1EA] text-neutral-900 h-full flex flex-col`}
      >
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}