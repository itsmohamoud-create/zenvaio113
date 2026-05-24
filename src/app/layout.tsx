import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenvaio — AI Automation Systems for Growing Businesses",
  description:
    "Zenvaio designs and manages AI-powered automation systems tailored to your business — so every lead gets a response, every appointment gets booked, and you can focus on the work you love.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2300FF9D'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial,sans-serif' font-size='13' font-weight='800' fill='%23000000'%3EZV%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "Zenvaio — AI Automation Systems for Growing Businesses",
    description:
      "Zenvaio designs and manages AI-powered automation systems tailored to your business.",
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
      <body className={`${plusJakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
