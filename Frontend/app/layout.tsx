import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Shree Ganesh Collections";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shreeganeshcollections.com";

export const metadata: Metadata = {
  title: `${COMPANY_NAME} | Premium Mithai Hampers & Handcrafted Jewelry`,
  description:
    "Discover exquisite handcrafted mithai hampers and jewelry. From traditional sweets collections to custom engagement trays, create unforgettable moments with our premium gift solutions.",
  keywords:
    "luxury hampers, handcrafted jewelry, premium gifts, mithai hampers, sweets hampers, engagement trays, custom jewelry, anniversary gifts, birthday collections, indian sweets",
  authors: [{ name: COMPANY_NAME }],
  openGraph: {
    title: `${COMPANY_NAME} | Premium Hampers & Handcrafted Jewelry`,
    description:
      "Premium gift collections featuring exquisite hampers and handcrafted jewelry",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} | Premium Hampers & Handcrafted Jewelry`,
    description:
      "Premium gift collections featuring exquisite hampers and handcrafted jewelry",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-montserrat">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
