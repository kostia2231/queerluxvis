'use client'

import { useState } from "react";
import useCartStore from "../store/store";
import type { Product } from "../types";

interface Props {
  product: Product;
}

export default function ProductBuySection({ product }: Props) {
  const [selectedType, setSelectedType] = useState<"print" | "digital">("print");
  const addItem = useCartStore((s) => s.addItem);

  const variants = (product?.variants?.edges || []).filter(v => v?.node && v.node.title);
  const selectedVariant =
    selectedType === "print"
      ? variants.find(v => v.node.title.toLowerCase().includes("print"))?.node
      : variants.find(v => v.node.title.toLowerCase().includes("digital"))?.node;

  if (!selectedVariant) return <p>No variant found</p>;

  const handleAddToCart = () => {
    addItem({
      id: selectedVariant.id,
      title: `${product.title} — ${selectedVariant.title}`,
      price: Number(selectedVariant.price.amount),
      quantity: 1,
      image: product.images?.edges?.[0]?.node?.src || "",
      variants: product.variants,
      lineId: "",
      isPreorder: selectedVariant.quantityAvailable,
    });
  };

  const isPreorder = selectedVariant.availableForSale && selectedVariant.quantityAvailable === 0

  return (
    <div className="flex flex-col w-full">

      <div className="grid grid-cols-2 text-[18px]">
        <button
          onClick={() => setSelectedType("print")}
          className={`flex items-center gap-2.5 text-left py-2.5 cursor-pointer border-t border-l ${selectedType === "print"
            ? "bg-gray-100 text-black"
            : "bg-white hover:text-black text-black/30 "
            }`}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${selectedType === "print" ? "bg-black" : "bg-gray-100"}`}></div>
          <p>Print</p>
        </button>
        <button
          onClick={() => setSelectedType("digital")}
          className={`flex items-center gap-2.5 text-left py-2.5 cursor-pointer border-t border-r ${selectedType === "digital"
            ? "bg-gray-100 text-black"
            : "bg-white hover:text-black text-black/30 "
            }`}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${selectedType === "digital" ? "bg-black" : "bg-gray-100"}`}></div>
          <p>E-Book</p>
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="flex justify-between pr-5 text-left w-full py-5 bg-gray-100 hover:bg-[#FF59A8] text-black transition-colors cursor-pointer"
      >
        <p className="">
          {isPreorder ? "Pre-Order" : "Add To Cart"}
        </p>
        <p>
          — €{selectedVariant.price.amount}
        </p>
      </button>
    </div>
  );
}
