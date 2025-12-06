"use client";

// import AddToCart from "./AddToCart"
// import ProductBuySection from "./ProductBuySection"
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";
import { MouseEvent, useState } from "react";
import Loader from "./Preloader";

export default function ProductMenuElement({
    products,
}: {
    products: Product[];
}) {
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
            <Loader />

            <div className="grid grid-cols-3 gap-5 min-[768px]:pt-5 max-[768px]:grid-cols-1">
                {products
                    .filter((p) => !p.title.toLowerCase().includes("donation"))
                    .map((p) => (
                        <div key={p.id} className="">
                            <Link href={`/products/${p.handle}`}>
                                <div
                                    className="h-[400px] w-full relative bg-gray-100 overflow-hidden"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Image
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src={
                                            p.images.edges[0]?.node.src ||
                                            "/placeholder.png"
                                        }
                                        alt={`Book Cover - ${p.id}`}
                                        fill
                                        className="object-contain hover:scale-102 transition-transform"
                                    />

                                    {tooltip.visible && (
                                        <div
                                            className="absolute pointer-events-none select-none
                      text-[#FF59A8] font-bold text-[18px] px-5 py-2"
                                            style={{
                                                left: tooltip.x,
                                                top: tooltip.y,
                                                opacity: tooltip.visible
                                                    ? 1
                                                    : 0,
                                            }}
                                        >
                                            <p></p>
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className="flex justify-between pb-5 pt-5">
                                <div className="w-full">
                                    <div className="pb-5 flex flex-col pr-5">
                                        <p>{p.title}</p>
                                        <p className="text-black/30">
                                            {p.metafield?.value}
                                        </p>
                                    </div>

                                    {/*<div className="pb-2.5 flex justify-between">
                    <AddToCart product={p} />
                  </div>*/}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
