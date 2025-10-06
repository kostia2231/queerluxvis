import { shopifyFetch } from "../../../../lib/shopify";
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from "../../../../lib/queries";
import type { Product, PropsProductParams, ProductByHandleResponse } from "../../../../types";
import Image from "next/image";
import ProductBuySection from "../../../../components/ProductBuySection";

export async function generateStaticParams() {
  const data = await shopifyFetch<{ products: { edges: { node: Product }[] } }>(GET_PRODUCTS, { first: 100 });
  return data.products.edges.map(edge => ({
    handle: edge.node.handle,
  }));
}

export default async function Product({ params }: PropsProductParams) {
  const { handle } = await params
  const data = await shopifyFetch<ProductByHandleResponse>(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );

  const product = data.productByHandle;
  console.log(product)
  if (!product) return <p>Product not found :(</p>;

  return (
    <>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full grid grid-cols-3 gap-5 bg-gray-100 text-white ">

          <div className="col-span-2 flex items-center justify-center w-full">
            <Image
              src={product.images.edges[0].node.src}
              width={550}
              height={300}
              objectFit="cover"
              alt="Book cover"
            />
          </div>

          <div className="col-span-1 flex flex-col text-black h-full">
            <div className="flex-grow" />
            <ProductBuySection product={product} />
          </div>
        </div>
      </div>

      <div>
        <div></div>
        <div className="grid-wrapper py-5">
          <div className="bg-gray-100 flex flex-col gap-5 py-5 ">
            {/*<p className="font-bold">Book features</p>*/}
            <div>
              <p className="font-bold text-[18px]">Author</p>
              <p>Lord von Panen</p>
            </div>

            <div>
              <p className="font-bold text-[18px]">Size</p>
              <p>210x210x21 MM</p>
            </div>

            <div>
              <p className="font-bold text-[18px]">Words</p>
              <p>5 893</p>
            </div>


            <div>
              <p className="font-bold text-[18px]">Type</p>
              <p>Hardcover</p>
            </div>

            <div>
              <p className="font-bold text-[18px]">Publishing date</p>
              <p>21.02.2025</p>
            </div>

            <div>
              <p className="font-bold text-[18px]">ISBN</p>
              <p>978-91-98427-4-2</p>
            </div>

          </div>
          <div></div>
          <div className="bg-gray-100 flex flex-col gap-5">
            <div className="">
              <div className="absolute py-5 pr-10">
                <p className="font-bold text-[18px]">{product.title}</p>
                <p>
                  Many years ago, a young man travelled to the jungles of the Amazon, to a plant-medicine centre called the Boiling River. He wanted to study at the feet of a great shaman the healing powers of Ayahuasca. The experience was illuminating and cathartic but, at the same time, deeply painful; he came face to face with a trauma he had spent most of his life running away from. On his last day, before the final ceremony, he set an intention for himself. This is something one does before every ceremony. Although he knew that Ayahuasca would never hurt him, he thought that the intention he set would lead to his death. He took a pen and paper, sat by the hot spring, and as the creatures of the jungle prepared to welcome the night, he wrote a letter to the two people who had given him life.
                </p>
              </div>

            </div>
            <div>
            </div>
          </div>
          <div className="bg-gray-100"></div>
          <div className="bg-gray-100"></div>
        </div>
      </div>
    </>);
}
