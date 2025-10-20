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

  return (
    <div className="flex flex-col w-full">

      <div className="grid grid-cols-2">
        <button
          onClick={() => setSelectedType("print")}
          className={`text-left py-5 cursor-pointer ${selectedType === "print"
            ? "bg-black text-white"
            : "bg-white hover:text-black text-black/30"
            }`}
        >
          Print
        </button>
        <button
          onClick={() => setSelectedType("digital")}
          className={`text-left py-5 cursor-pointer ${selectedType === "digital"
            ? "bg-black text-white"
            : "bg-white hover:text-black text-black/30 border-r"
            }`}
        >
          E-Book
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="text-left w-full py-5 bg-gray-100 hover:bg-[#FF59A8] active:bg-[#FF85BF] hover:text-white transition-colors cursor-pointer"      >
        <span className="font-bold">Add to Cart</span> — €{selectedVariant.price.amount}
      </button>
    </div>
  );
}
