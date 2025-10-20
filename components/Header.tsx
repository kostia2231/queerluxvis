import { useRef } from "react"
import { useRouter } from "next/navigation"
import useCartStore from "../store/store"
import Link from "next/link"

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const { openCart } = useCartStore()
  const count = useCartStore((state) => state.getCartCount())
  const router = useRouter()

  return (
    <>
      <div
        className="grid-wrapper sticky top-0 z-3 transition-all duration-400"
        id="header"
        ref={headerRef}>
        <div className="cursor-pointer py-5 border-b bg-white border-x hover:bg-gray-100" onClick={() => router.push("/")}>
          <p className="">QLV</p>
        </div>

        <div className="border-b bg-white max-[450px]:hidden"></div>

        <div className="max-[450px]:hidden">
          <div
            className="border-x cursor-pointer bg-white hover:bg-[#FF59A8] hover:text-white border-b hover:border-b-[#FF59A8] hover:border-x-0">
            <Link href={"/donation"} className="w-full h-full block py-5">Support us!</Link>
          </div>
        </div>

        <div className="bg-white border-b max-[450px]:hidden"></div>

        <div className="justify-between items-center">
          <div onClick={() => openCart()} className="bg-gray-100 py-5 flex gap-2.5 items-center cursor-pointer hover:bg-black hover:text-white border-b">
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
