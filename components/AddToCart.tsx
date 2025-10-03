'use client'

import type { Product } from "../types"
import PlusIcon from "./PlusIcon"
// import MinusIcon from "./MinusIcon"
import useCartStore from "../store/store"
// import { useState, useEffect } from "react"

interface AddToCartProps {
  product: Product
}

export default function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem)
  // const removeItem = useCartStore((state) => state.removeItem)
  // const [hydrated, setHydrated] = useState(false)

  const firstVariant = product?.variants?.edges?.[0]?.node
  // const quantity = useCartStore(
  //   (state) =>
  //     firstVariant && hydrated ? state.getItemQuantity(firstVariant.id) : 0
  // )

  // useEffect(() => {
  //   setHydrated(true)
  // }, [])

  if (!firstVariant) return null

  return (
    <div className="flex gap-5 border">
      <div
        className="justify-center items-center flex h-full w-[43px] cursor-pointer bg-gray-100 hover:bg-[#FF59A8] active:bg-[#FF85BF]"
        onClick={() =>
          addItem({
            id: firstVariant.id,
            title: product.title,
            price: Number(firstVariant.price.amount),
            image: product.images?.edges?.[0]?.node?.src || "",
          })
        }
      >
        <div className="active:rotate-90 transition-all duration-200 h-full w-full flex items-center justify-center">
          <PlusIcon />
        </div>
      </div>
    </div>
  )
}
