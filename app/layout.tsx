import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Esco Design System",
    template: "%s · Esco Design System",
  },
  description: "Foundations, components, and patterns for Esco Lifesciences digital products.",
  icons: {
    icon: [
      { url: "/Logo/Favicon/favicon.ico", sizes: "any" },
      { url: "/Logo/Favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/Logo/Favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/Logo/Favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={noto.variable}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
