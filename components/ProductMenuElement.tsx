'use client'

import AddToCart from "./AddToCart"
import Image from "next/image"
import Link from "next/link"
import { Product } from "../types"
import { MouseEvent, useState } from "react"

export default function ProductMenuElement({ products }: { products: Product[] }) {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTooltip({ visible: true, x, y });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0 });
  };

  return (
    <>
      {/*pt-[77px]*/}
      <div className="grid grid-cols-3 gap-5 pt-5">
        {products
          .filter(p => !p.title.toLowerCase().includes("donation"))
          .map(p => (
            <div key={p.id} className="">
              <Link href={`/product/${p.handle}`}>
                <div
                  className="h-[400px] w-full relative bg-gray-100 overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={p.images.edges[0]?.node.src || "/placeholder.png"}
                    alt={`Book Cover - ${p.id}`}
                    fill
                    className="object-cover"
                  />

                  {tooltip.visible && (
                    <div
                      className="absolute pointer-events-none select-none
                      text-[#FF59A8] font-bold text-[18px] px-5 py-2"
                      style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        opacity: tooltip.visible ? 1 : 0,
                      }}
                    >
                      <p></p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="flex justify-between pb-5 pt-5 pr-5 border-b">
                <div className="w-full">
                  <div className="pb-2.5 flex justify-between">
                    {p && <AddToCart product={p} />}
                  </div>
                  <p>{p.title}</p>
                  <p>— €{p.variants.edges[0]?.node.price.amount}</p>
                </div>
              </div>
            </div>))}
      </div>
    </>
  )
}
