'use client'

import type { Product } from "../types"
import useCartStore from "../store/store"
import { useState } from "react"
import BookTypeSelector from "./BookTypeSelector"

interface AddToCartProps {
  product: Product
}

export default function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem)
  const variants = product?.variants?.edges || []
  const [selectedType, setSelectedType] = useState<"ebook" | "printed">("ebook")

  if (!variants.length) return null

  const selectedVariant =
    selectedType === "printed"
      ? variants.find(v => v.node.title.toLowerCase().includes("print"))?.node
      : variants.find(v => v.node.title.toLowerCase().includes("digital"))?.node

  if (!selectedVariant) return null

  return (
    <div className="flex w-full cursor-pointer justify-between">
      <BookTypeSelector onChange={setSelectedType} />

      <button
        className="text-[18px] font-bold cursor-pointer w-fit flex justify-center items-center px-5 bg-gray-100 hover:bg-[#FF59A8] active:bg-[#FF85BF] transition-colors"
        onClick={() =>
          addItem({
            id: selectedVariant.id,
            title: `${product.title} — ${selectedVariant.title}`,
            price: Number(selectedVariant.price.amount),
            image: product.images?.edges?.[0]?.node?.src || "",
          })
        }
      >
        Add To Cart
      </button>
    </div>
  )
}
