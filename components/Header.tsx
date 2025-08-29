'use client'

import { useRef, useEffect } from "react"
import useStore from "../store/store"

type HeaderProps = {
  toggleCartAction: () => void
}

export default function Header({ toggleCartAction }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef<number>(0)
  const count = useStore((state) => state.getCartCount());

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current
      if (!header) return

      const curentScroll = window.scrollY
      console.log(curentScroll)

      if (curentScroll > 77) {
        if (curentScroll > lastScrollY.current) {
          header.style.transform = "translateY(-100%)"
        } else {
          header.style.transform = "translateY(0)"
        }
      }
      lastScrollY.current = curentScroll <= 0 ? 0 : curentScroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  return (
    <>
      <div
        className="grid-wrapper sticky top-0 z-3 transition-all duration-400"
        id="header"
        ref={headerRef}>
        <div className="py-5 border-b border-r bg-white border-l">
          <p>QueerLuxVis</p>
        </div>

        <div className="border-b bg-white border-r"></div>

        <div className="bg-gray-200 py-5">
          <p>Publishing, Institute, About</p>
        </div>

        <div className="border-r bg-white border-b"></div>

        <div className="grid grid-cols-2 justify-between items-center border-b">
          <div className="py-5 bg-white h-full">
            {/*<p>DE</p>*/}
          </div>

          <div onClick={() => toggleCartAction()} className="bg-gray-200 py-5 flex gap-5 items-center cursor-pointer">
            <p>Cart</p>
            <div className="bg-white h-8 w-8 rounded-full text-center justify-center flex items-center">
              {count}
            </div >
          </div>
        </div>
      </div>
    </>
  )
}
