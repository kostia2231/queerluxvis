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
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
        </style>
      </head>
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
