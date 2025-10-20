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
  const [selectedType, setSelectedType] = useState<"ebook" | "printed">("printed")

  if (!variants.length) return null

  const selectedVariant =
    selectedType === "printed"
      ? variants.find(v => v.node.title.toLowerCase().includes("print"))?.node
      : variants.find(v => v.node.title.toLowerCase().includes("digital"))?.node

  if (!selectedVariant) return null

  const isPreorder = selectedVariant.availableForSale && selectedVariant.quantityAvailable === 0

  return (
    <div className="flex w-full cursor-pointer justify-between flex-col">
      <BookTypeSelector onChange={setSelectedType} />

      <button
        className="text-[18px] text-white font-bold cursor-pointer flex justify-center items-center px-5 bg-black hover:bg-[#FF59A8] hover:text-white transition-colors w-full py-5"
        onClick={() =>
          addItem({
            id: selectedVariant.id,
            title: `${product.title} — ${selectedVariant.title}`,
            price: Number(selectedVariant.price.amount),
            image: product.images?.edges?.[0]?.node?.src || "",
            isPreorder: selectedVariant.quantityAvailable,
          })
        }
      >
        {isPreorder ? "Pre-Order" : "Add To Cart"}
      </button>
    </div>
  )
}
