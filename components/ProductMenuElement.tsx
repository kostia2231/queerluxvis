'use client'
import PlusIcon from "./PlusIcon"
import { motion } from "motion/react"

export default function ProductMenuElement() {
  return (
    <>
      <div className="grid-wrapper pt-15">
        <div>
          <div className="h-[400px] w-full bg-gray-200"></div>
          <div className="flex justify-between pt-5 pr-5">
            <div>
              <p>Book Title Here</p>
              <p>— €50.0</p>
            </div>
            <motion.div className="w-fit h-fit cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon />
            </motion.div>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
