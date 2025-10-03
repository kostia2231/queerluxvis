'use client'

import "./globals.css";
import { useState } from "react"
import Footer from "../../components/Footer";
import GridElement from "../../components/GridElement";
import dynamic from 'next/dynamic'
// import { usePathname } from 'next/navigation'


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
  // const path = usePathname()
  // const isHome = path === '/'

  return (
    <html lang="en">
      <body className="px-5 flex flex-col min-h-screen">
        <GridElement />
        <Cart toggleCartAction={toggleCartAction} isClosed={isClosed} />
        <Header toggleCartAction={toggleCartAction} />
        <main className="flex-grow">{children}</main>

        {/*{isHome && (<div className="sticky bottom-5 grid-wrapper pointer-events-none">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div
            className="bg-[#FF59A8] py-5 cursor-pointer hover:bg-black hover:text-white pointer-events-auto"
          >
            Support us!
          </div>
        </div>)}*/}
        <Footer />
      </body>
    </html>
  );
}
