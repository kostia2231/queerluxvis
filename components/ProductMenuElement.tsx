'use client'
import PlusIcon from "./PlusIcon"
import MinusIcon from "./MinusIcon"
import { motion } from "motion/react"
import useStore from "../store/store"

export default function ProductMenuElement() {
  //test
  const product = { id: 1, title: 'Товар 1', price: 50 }
  const add = useStore(state => state.addItem)
  const remove = useStore(state => state.removeItem)
  const productCount = useStore(state => state.getItemQuantity(product.id))
  return (
    <>
      <div className="grid-wrapper pt-[77px]">
        <div>
          <div className="h-[400px] w-full bg-gray-200"></div>
          <div className="flex justify-between pt-5 pr-5">
            <div>
              <p>Book Title Here</p>
              <p>— €{product.price}</p>
            </div>


            <div className="flex gap-5">
              <motion.div className="w-fit h-fit cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {productCount > 0 && <MinusIcon onClick={() => { remove(product.id) }} />}
              </motion.div>

              <motion.div className="w-fit h-fit cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusIcon onClick={() => add(product)} />
              </motion.div>
            </div>
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
