import type { Metadata } from "next";
import { Space_Mono } from 'next/font/google';
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: "Ghibli Timer",
  description: "Focus timer with Ghibli backgrounds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} font-mono`}>{children}</body>
    </html>
  );
}
