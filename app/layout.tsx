import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/layout/Header";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

// export const metadata: Metadata = {
//   title: "Meri Store",
//   description: "An E-commerce website",
// };
export const metadata: Metadata = {
  metadataBase: new URL("https://meri-store-nine.vercel.app"),
  title: {
    default: "MeriStore — Merch Store",
    template: "%s | MeriStore",
  },
  description:
    "Shop MeriStore for snowboards, apparel, and accessories. Browse our full catalog, filter by price and availability, and check out securely.",
  keywords: ["merch store", "snowboards", "apparel", "ecommerce"],
  openGraph: {
    title: "MeriStore",
    description: "Shop MeriStore for snowboards, apparel, and accessories.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
