import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import DashboardWrapper from "./(components)/Dashboard/dashboardWrapper";
import ThemeProvider from "./themeprovider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "Osemlabs Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body>
        <Providers>
          <ThemeProvider>
            <DashboardWrapper>{children}</DashboardWrapper>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
