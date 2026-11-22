import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solfa — Music theory, made playable",
  description: "Build fluent note-reading skills through quick, focused music theory games.",
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
