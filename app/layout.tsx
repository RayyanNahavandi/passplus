import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.studypassplus.com"),
  title: "PassPlus | Free CompTIA Practice Questions",
  description:
    "Pass your CompTIA cert with 1,480 practice questions across Security+ SY0-701, Network+ N10-009, and A+ Core 1 & 2. Free questions, no signup required.",
  openGraph: {
    siteName: "PassPlus",
    type: "website",
    url: "https://www.studypassplus.com",
    title: "PassPlus | Free CompTIA Practice Questions",
    description:
      "Pass your CompTIA cert with 1,480 practice questions across Security+ SY0-701, Network+ N10-009, and A+ Core 1 & 2. Free questions, no signup required.",
  },
  twitter: {
    card: "summary",
    title: "PassPlus | Free CompTIA Practice Questions",
    description:
      "Pass your CompTIA cert with 1,480 practice questions across Security+, Network+, and A+. Free questions, no signup required.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
      <GoogleAnalytics gaId="G-QCCNLSKBDS" />
    </html>
  );
}
