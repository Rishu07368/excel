import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchModal } from "@/components/layout/search-modal";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Excel Mastery Academy - The Definitive Excel Learning Platform",
  description: "Learn Excel from beginner to master. Comprehensive tutorials, 300+ formulas, 500+ shortcuts, interactive practice, and real-world projects.",
  keywords: ["Excel", "Spreadsheets", "Microsoft Excel", "Excel Tutorial", "Excel Formulas", "Excel Learning"],
  authors: [{ name: "Excel Mastery Academy" }],
  openGraph: {
    title: "Excel Mastery Academy",
    description: "The definitive Excel learning platform - from beginner to master",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <TooltipProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 md:ml-64 pb-20 md:pb-0">
                {children}
              </main>
              <MobileNav />
              <SearchModal />
            </div>
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}