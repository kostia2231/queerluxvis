'use client'

import type { CartProduct } from "../types"
import { motion, AnimatePresence } from "motion/react"
import { useEffect, useRef, useState } from "react"
import useCartStore from "../store/store"
import Image from "next/image"
import { createCart } from "../lib/shopifyCart"

export default function Cart() {
  const cartRef = useRef<HTMLDivElement>(null)
  const cart: CartProduct[] = useCartStore((state) => state.cart)
  const { isCartOpen, closeCart, addItem, removeItem, getTotalPrice } = useCartStore()
  const totalPrice: number = getTotalPrice()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        closeCart()
      }
    }

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCartOpen, closeCart])

  const handleCheckout = async () => {
    if (!cart.length) return
    setLoading(true)
    try {
      const newCart = await createCart(cart)
      localStorage.setItem("cartId", newCart.id)
      window.open(newCart.checkoutUrl, "_self")
    } catch (err) {
      console.error("Checkout error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring", duration: 0.55, bounce: 0.25
            }}
            className="h-screen bg-white/60 fixed w-full left-0 z-50 backdrop-blur-sm"
          />
          <motion.div
            ref={cartRef}
            key="cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring", duration: 0.55, bounce: 0.25
            }}
            className="h-screen w-1/2 bg-white fixed right-0 border-l z-50 max-[450px]:w-full max-[450px]:border-0"
          >
            <div>
              <div className="flex justify-between border-b">
                <div className="py-5">
                  <p>
                    Cart
                  </p>
                </div>
                <div className="p-5">
                  <p onClick={closeCart} className="cursor-pointer">
                    Close
                  </p>
                </div>
              </div>
              {totalPrice != 0 && (
                <div className="pt-5">
                  <div className="">
                    <span className="font-light">Subtotal — </span>{`€${totalPrice}`}
                  </div>
                  <p className="text-gray-200 pb-5">Shipping calculated at checkout</p>

                  <div
                    className="py-5 bg-black w-full cursor-pointer hover:bg-[#FF59A8] text-white text-[18px] leading-[27px] text-center"
                    onClick={handleCheckout}
                  >
                    <p className="font-bold">
                      {loading ? "Proceed To Checkout..." : "Proceed To Checkout"}
                    </p>
                  </div>
                </div>
              )}

              <div className="pb-5 overflow-y-auto h-[calc(100vh-245px)] ">
                <div>
                  {totalPrice != 0 && (<p className="py-5 text-gray-200 text">All Items</p>)}
                  {totalPrice === 0 && (<div className="pt-5">Cart is empty</div>)}
                </div>
                <div className="flex flex-col">
                  {cart.map(p => (
                    <div key={p.id} className="flex gap-5 border-t max-[450px]:text-[18px] max-[450px]:leading-[27px]">
                      <div className="h-[200px] w-[200px] relative bg-gray-100">
                        <Image
                          src={p.image || ""}
                          alt={`Book Cover - ${p.id}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="pt-5">
                        {p.isPreorder === 0 && (<p>⁂ Pre-order ⁂</p>)}
                        <p>Title: {p.title}</p>
                        <p>Price: €{p.price}</p>
                        <div>
                          <p>Quantity:{" "}
                            {p.quantity}{" /"}
                            <span
                              onClick={() => removeItem(p.id)}
                              className="cursor-pointer hover:text-[#FF59A8]">
                              {" Less "}
                            </span>
                            {" / "}
                            <span
                              onClick={() => addItem(p)}
                              className="cursor-pointer hover:text-[#FF59A8]">
                              {" More "}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
