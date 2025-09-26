import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guess4 - 数字当てゲーム",
  description: "4桁の数字を当てるマルチプレイヤーゲーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
