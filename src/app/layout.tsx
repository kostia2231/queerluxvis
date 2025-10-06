'use client'

import "./globals.css";
import { useState } from "react"
import Footer from "../../components/Footer";
import GridElement from "../../components/GridElement";
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from "motion/react"
import SupportSlider from "../../components/SupportSlider";

const Cart = dynamic(() => import("../../components/Cart"), { ssr: false })
const Header = dynamic(() => import("../../components/Header"), { ssr: false })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClosed, setIsClosed] = useState<boolean>(true);
  function toggleCartAction() {
    setIsClosed(prev => !prev);
  }

  const [donationIsOpen, setDonationOpen] = useState<boolean>(false)
  function toggleDonationAction() {
    setDonationOpen(prev => !prev);
  }

  return (
    <html lang="en">
      <motion.body
        className="px-5 flex flex-col min-h-screen"
      >
        <GridElement />
        <Cart toggleCartAction={toggleCartAction} isClosed={isClosed} />
        <Header toggleCartAction={toggleCartAction} toggleDonationAction={toggleDonationAction} />
        <AnimatePresence mode="wait">
          {donationIsOpen && (
            <SupportSlider
              key="support-slider"
            />
          )}
        </AnimatePresence>
        <main className="flex-grow">{children}</main>
        <Footer />
      </motion.body>
    </html>
  );
}
