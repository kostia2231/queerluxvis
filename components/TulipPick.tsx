'use client';

import Image from "next/image";
import { Product } from "../types";
import { useState, useRef, MouseEvent } from "react";

export default function TulipPick({ p }: { p: Product }) {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    tooltip.style.left = `${e.clientX + 15}px`;
    tooltip.style.top = `${e.clientY + 15}px`;
  };

  return (
    <div
      className="relative inline-block group cursor-none"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="h-[400px] w-full relative bg-gray-100 cursor-pointer overflow-hidden">
        <Image
          src={p.images.edges[0]?.node.src || "/placeholder.png"}
          alt={`Book Cover - ${p.id}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {visible && (
          <div
            ref={tooltipRef}
            className="fixed pointer-events-none select-none
                       bg-black/70 text-white text-sm px-3 py-1
                       rounded-md font-medium transition-opacity duration-150
                       animate-fadeIn"
          >
            look closer
          </div>
        )}
      </div>
    </div>
  );
}
