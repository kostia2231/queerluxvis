'use client'

import { Product } from "../types"
import PlusIcon from "./PlusIcon"
import MinusIcon from "./MinusIcon"
import useCartStore from "../store/store"
import { useState, useEffect } from "react"

interface AddToCartProps {
  product: Product
}

export default function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const [hydrated, setHydrated] = useState(false)

  const firstVariant = product?.variants?.edges?.[0]?.node
  const quantity = useCartStore(
    (state) =>
      firstVariant && hydrated ? state.getItemQuantity(firstVariant.id) : 0
  )

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!firstVariant) return null

  return (
    <div className="flex gap-5">
      {hydrated && quantity > 0 && (
        <div
          className="cursor-pointer"
          onClick={() => removeItem(firstVariant.id)}
        >
          <MinusIcon />
        </div>
      )}
      <div
        className="cursor-pointer"
        onClick={() =>
          addItem({
            id: firstVariant.id,
            title: product.title,
            price: Number(firstVariant.price.amount),
            image: product.images?.edges?.[0]?.node?.src || "",
          })
        }
      >
        <PlusIcon />
      </div>
    </div>
  )
}
