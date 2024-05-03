import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MetaMaskProvider } from "./providers/meta-mask-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BitBizaar Marketplace",
  description: "Example dApp marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MetaMaskProvider>
        <body className={inter.className}>{children}</body>
      </MetaMaskProvider>
    </html>
  );
}
