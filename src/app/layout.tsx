import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PersonaSwitcher } from "@/components/layout/PersonaSwitcher";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aurixify — The Professional Video Editor & Client Workspace",
  description: "Hire, manage, review with timestamped comments, revise, and deliver video projects — all in one centralized workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-background text-gray-100 min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-black`}>
        <AppProvider>
          <PersonaSwitcher />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
