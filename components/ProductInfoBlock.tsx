"use client";

import type { Product } from "../types";
import Loader from "./Preloader";

type Props = {
    product: Product;
};

export default function ProductInfoBlock({ product }: Props) {
    return (
        <>
            <Loader />
            <div className="py-5 product-page-grid">
                <div className="bg-gray-100 flex flex-col gap-5 py-5">
                    <div>
                        <p className="text-[18px] text-black/30">Author</p>
                        <p>{product.author || "Lord von Panen"}</p>
                    </div>
                    <div>
                        <p className="text-[18px] text-black/30">Size</p>
                        <p>{product.size || "210x210x21 MM"}</p>
                    </div>
                    <div>
                        <p className="text-[18px] text-black/30">Words</p>
                        <p>{product.words || "5 893"}</p>
                    </div>
                    <div>
                        <p className="text-[18px] text-black/30">Type</p>
                        <p>{product.type || "Hardcover"}</p>
                    </div>
                    <div>
                        <p className="text-[18px] text-black/30">
                            Publishing date
                        </p>
                        <p>{product.publishingDate || "21.02.2025"}</p>
                    </div>
                    <div>
                        <p className="text-[18px] text-black/30">ISBN</p>
                        <p>{product.isbn || "978-91-98427-4-2"}</p>
                    </div>
                </div>

                <div className="bg-gray-100 flex flex-col pb-5 pr-5">
                    <p className="text-[18px] text-black/30 pr-5 pt-5">Info</p>
                    <p>
                        {product.description ||
                            "Many years ago, a young man travelled to the jungles of the Amazon, to a plant-medicine centre called the Boiling River. He wanted to study at the feet of a great shaman the healing powers of Ayahuasca. The experience was illuminating and cathartic but, at the same time, deeply painful; he came face to face with a trauma he had spent most of his life running away from. On his last day, before the final ceremony, he set an intention for himself. This is something one does before every ceremony. Although he knew that Ayahuasca would never hurt him, he thought that the intention he set would lead to his death. He took a pen and paper, sat by the hot spring, and as the creatures of the jungle prepared to welcome the night, he wrote a letter to the two people who had given him life."}
                    </p>
                </div>
            </div>
        </>
    );
}
