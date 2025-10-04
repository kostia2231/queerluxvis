'use client'

import { useRef } from "react"
import useStore from "../store/store"
import { useRouter } from "next/navigation";


type HeaderProps = {
  toggleCartAction: () => void
}

export default function Header({ toggleCartAction }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  // const lastScrollY = useRef<number>(0)
  const count = useStore((state) => state.getCartCount());
  const router = useRouter();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const header = headerRef.current
  //     if (!header) return

  //     const curentScroll = window.scrollY
  //     // console.log(curentScroll)

  //     if (curentScroll > 77) {
  //       if (curentScroll > lastScrollY.current) {
  //         header.style.transform = "translateY(-100%)"
  //       } else {
  //         header.style.transform = "translateY(0)"
  //       }
  //     }
  //     lastScrollY.current = curentScroll <= 0 ? 0 : curentScroll
  //   }

  //   window.addEventListener("scroll", handleScroll)
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll)
  //   }
  // }, [])


  return (
    <>
      <div
        className="grid-wrapper sticky top-0 z-3 transition-all duration-400"
        id="header"
        ref={headerRef}>
        <div className="cursor-pointer py-5 border-b bg-white border-x" onClick={() => router.push("/")}>
          {/*font-serif tracking-[1.5] font-serif text-[24px] tracking-[1] font-bold*/}
          <p className="">QLV</p>
          {/*<p className="">Q<span className="opacity-20 hover:opacity-100 transition-all duration-300">ueer</span>L<span className="opacity-20 hover:opacity-100 transition-all duration-300">ux</span>V<span className="opacity-20 hover:opacity-100 transition-all duration-300">is</span></p>*/}
        </div>

        <div className="border-b bg-white"></div>

        <div className="bg-white border-b py-5 flex gap-2.5 border-x hover:bg-[#FF59A8] hover:text-white cursor-pointer items-center">
          <p>Support us!</p>
          {/*<p className="cursor-pointer">Books</p> <p>/</p> <p className="cursor-pointer opacity-30 hover:opacity-100">Newsletter</p>*/}
        </div>

        <div className="bg-white border-b"></div>

        <div className="justify-between items-center border-b">
          {/*<div className="grid grid-cols-2 justify-between items-center border-b">*/}
          {/*<div className="py-5 bg-white h-full">*/}
          {/*<p>DE</p>*/}
          {/*</div>*/}
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
