import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Music Theory",
  description: "Making music theory fun and easy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 