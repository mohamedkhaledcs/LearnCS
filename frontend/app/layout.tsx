import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { AuthProvider } from "@/lib/auth/auth-context";
import { I18nProvider } from "@/lib/i18n/i18n-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | LearnCS",
    default: "LearnCS - Computer Science Learning OS",
  },
  description: "An adaptive, premium Computer Science learning platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-neutral-950 text-neutral-50 selection:bg-indigo-500/30 selection:text-indigo-200">
        <MotionProvider>
          <LenisProvider>
            <QueryProvider>
              <I18nProvider>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </I18nProvider>
            </QueryProvider>
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
