'use client'

import { CartProps, CartProduct } from "../types"
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect, useRef } from "react"
import useStore from "../store/store"
import useCartStore from "../store/store"
import Image from "next/image"

export default function Cart({
  toggleCartAction,
  isClosed,
}: CartProps) {
  const [isVisible, setIsVisible] = useState(!isClosed)
  const cartRef = useRef<HTMLDivElement>(null)
  const cart: CartProduct[] = useStore(state => state.cart)
  const totalPrice: number = useStore((state) => state.getTotalPrice())
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        toggleCartAction()
      }
    }

    if (!isClosed) {
      document.addEventListener("mousedown", handleClickOutside)
      setIsVisible(true)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
      setIsVisible(false)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isClosed, toggleCartAction])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={cartRef}
          key="cart"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring", duration: 0.55, bounce: 0.25
          }}
          className="h-screen w-1/2 bg-white fixed right-0 border-l z-50"
        >
          <div>


            <div className="flex justify-between border-b">
              <div></div>
              <div className="p-5">
                <p onClick={toggleCartAction} className="cursor-pointer">
                  Close
                </p>
              </div>
            </div>
            {totalPrice != 0 && (<div className="pt-5">
              <div className=""><span className="font-light">Subtotal — </span>{`€${totalPrice}`}</div>
              <p className="text-gray-300 pb-5">Shipping calculated at checkout</p>

              <div
                className="py-5 bg-gray-200 w-full cursor-pointer hover:bg-black hover:text-white"
                onClick={() => {
                  const checkoutUrl = useStore.getState().checkoutUrl
                  if (checkoutUrl) {
                    window.location.href = checkoutUrl
                  }
                }}
              >
                <div>Proceed To Checkout</div>
              </div>
            </div>)}

            <div className="pb-5 overflow-y-auto h-[calc(100vh-245px)] ">
              <div>
                {totalPrice != 0 && (<p className="py-5 text-gray-200 text">Cart</p>)}
                {totalPrice === 0 && (<div className="pt-5">Cart is empty</div>)}
              </div>
              <div className="flex flex-col">
                {cart.map(p => (
                  <div key={p.id} className="flex gap-5 border-t">
                    <div className="h-[200px] w-[200px] relative bg-gray-200">
                      <Image
                        src={p.image || ""}
                        alt={`Book Cover - ${p.id}`}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <p>Title: {p.title}</p>
                      <p>Price: €{p.price}</p>
                      <div>
                        <p>Qty: <span onClick={() => removeItem(p.id)} className="text-gray-200 cursor-pointer">(less)</span> {p.quantity} <span onClick={() => addItem(p)} className="text-gray-200 cursor-pointer">(more)</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
