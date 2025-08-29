'use client'

import { Product } from "../types";
import PlusIcon from "./PlusIcon";
import useCartStore from "../store/store";

export default function AddToCart({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)
  const firstVariant = product?.variants?.edges?.[0]?.node

  return (
    <>
      <div
        className="flex gap-5"
        onClick={() =>
          firstVariant &&
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
    </>)
}
