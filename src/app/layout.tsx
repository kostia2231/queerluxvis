'use client'

import "./globals.css";
import Footer from "../../components/Footer";
import GridElement from "../../components/GridElement";
import dynamic from 'next/dynamic'
import { motion } from "motion/react"

const Cart = dynamic(() => import("../../components/Cart"), { ssr: true })
const Header = dynamic(() => import("../../components/Header"), { ssr: false })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <motion.body
        className="px-5 flex flex-col min-h-screen"
      >
        <div className="max-[450px]:hidden">
          <GridElement />
        </div>

        <Cart />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </motion.body>
    </html>
  );
}
