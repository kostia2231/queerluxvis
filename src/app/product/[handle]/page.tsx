import { shopifyFetch } from "../../../../lib/shopify";
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from "../../../../lib/queries";
import type { Product, PropsProductParams, ProductByHandleResponse } from "../../../../types";
import Image from "next/image";
// import useCartStore from "../../../../store/store";

export async function generateStaticParams() {
  const data = await shopifyFetch<{ products: { edges: { node: Product }[] } }>(GET_PRODUCTS, { first: 100 });
  return data.products.edges.map(edge => ({
    handle: edge.node.handle,
  }));
}

export default async function Product({ params }: PropsProductParams) {
  const { handle } = await params
  // const addItem = useCartStore((state) => state.addItem)
  const data = await shopifyFetch<ProductByHandleResponse>(
    GET_PRODUCT_BY_HANDLE,
    // @ts-expect-error - handle is [: string] all good...
    { handle }
  );

  const product = data.productByHandle;
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

            <div className="flex flex-col w-full cursor-pointer">
              <div className="w-full grid grid-cols-2">
                <div className="py-5 bg-white border-r">Print</div>
                <div className="py-5 border-r bg-gray-100 text-black/30">E‐Book</div>
              </div>
              <div className="w-full py-5 bg-gray-100 hover:bg-black hover:text-white">
                <span className="font-bold">Add To Cart</span> — €
                {product.variants.edges[0].node.price.amount}
              </div>
            </div>
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
              <p className="font-bold text-[18px]">Pages</p>
              <p>180</p>
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
                <p>This is sample text: &lsquo;Façades of Brooklyn Heights&rsquo;
                  is a walk through the New York City neighborhood and its charming
                  streetscapes with picturesque rows of houses – a testament to the
                  skill and creativity of their architects and builders, but also to
                  the enduring beauty and character of traditional architecture. The
                  peaceful, tree-lined streets of the Heights provide a welcome break
                  from the fast-paced lifestyle of the city, a respite from the
                  distractions of city life.</p>
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
