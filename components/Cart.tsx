'use client'
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect, useRef } from "react"

type CartProps = {
  toggleCartAction: () => void
  isClosed: boolean
}

export default function Cart({
  toggleCartAction,
  isClosed,
}: CartProps) {
  const [isVisible, setIsVisible] = useState(!isClosed)
  const cartRef = useRef<HTMLDivElement>(null)

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
          <div className="flex justify-between border-b">
            <div></div>
            <div className="p-5">
              <p onClick={toggleCartAction} className="cursor-pointer">
                Close
              </p>
            </div>
          </div>
          <div className="py-5 overflow-y-auto h-[calc(100vh-154px)] ">
            <p>Empty</p>
            <p className="absolute bottom-0 py-5 bg-gray-200 w-full cursor-pointer font-bold border-b">Proceed To Checkout</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
