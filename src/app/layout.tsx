'use client'

import "./globals.css";
import { useState } from "react"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GridElement from "../../components/GridElement";
import Cart from "../../components/Cart";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClosed, setIsClosed] = useState<boolean>(true);
  function toggleCartAction() {
    setIsClosed(prev => !prev);
  }

  return (
    <html lang="en">
      <body className="px-5 flex flex-col min-h-screen">
        <GridElement />
        <Cart toggleCartAction={toggleCartAction} isClosed={isClosed} />
        <Header toggleCartAction={toggleCartAction} />
        <main className="flex-grow min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
