// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from '../components/sidebar';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartBeehive",
  description: "SmartBeehive Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-6">
        {children}
      </div>
    </div>
      </body>
    </html>
  );
}
