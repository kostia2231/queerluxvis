'use client'

import { useRef } from "react"
import { useRouter } from "next/navigation"
import useStore from "../store/store"

export default function Header({ toggleCartAction, toggleDonationAction }: {
  toggleCartAction: () => void
  toggleDonationAction: () => void
}) {
  const headerRef = useRef<HTMLDivElement>(null)
  const count = useStore((state) => state.getCartCount())
  const router = useRouter()

  return (
    <>
      <div
        className="grid-wrapper sticky top-0 z-3 transition-all duration-400"
        id="header"
        ref={headerRef}>
        <div className="cursor-pointer py-5 border-b bg-white border-x" onClick={() => router.push("/")}>
          {/*font-serif tracking-[1.5] font-serif text-[24px] tracking-[1] font-bold*/}
          <p className="">QueerLuxVis</p>
          {/*<p className="">Q<span className="opacity-20 hover:opacity-100 transition-all duration-300">ueer</span>L<span className="opacity-20 hover:opacity-100 transition-all duration-300">ux</span>V<span className="opacity-20 hover:opacity-100 transition-all duration-300">is</span></p>*/}
        </div>

        <div className="border-b bg-white"></div>

        <div
          className=" bg-white border-b py-5 flex gap-2.5 border-x hover:bg-[#FF59A8] hover:text-white cursor-pointer items-center"
          onClick={toggleDonationAction}
        >
          <p>Support us!</p>
        </div>

        <div className="bg-white border-b"></div>

        <div className="justify-between items-center border-b">

          <div onClick={() => toggleCartAction()} className="bg-gray-100 py-5 flex gap-2.5 items-center cursor-pointer hover:bg-black hover:text-white hover:border-bottom-black">
            <p>Cart</p>
            <div className={`${count > 0 ? "bg-[#FF59A8]" : "bg-white"} h-8 w-8 text-center justify-center flex items-center text-black`}>
              {count}
            </div >
          </div>
        </div>
      </div >
    </>
  )
}
