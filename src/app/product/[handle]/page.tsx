import { shopifyFetch } from "../../../../lib/shopify";
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from "../../../../lib/queries";
import type { Product, PropsProductParams, ProductByHandleResponse } from "../../../../types";
import Image from "next/image";

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
    // @ts-expect-error - handle is [: string] all good...
    { handle }
  );

  const product = data.productByHandle;
  if (!product) return <p>Product not found :(</p>;

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-start items-center">
        <div className="w-full py-5 flex grow bg-black text-white">
          {/* Твой контент */}
          <div className="flex items-center justify-center w-full">
            <Image src={product.images.edges[1].node.src} width={550} height={300} objectFit="cover" alt="Book cover" />
          </div>
          <div className="absolute bottom-5">Pic. 1/1</div>
        </div>

        <div className="mt-auto w-full text-center bottom-0 sticky grid-wrapper">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="bg-gray-100 w-full text-start py-5 cursor-pointer">
            <p>
              <span className="font-bold">Add To Cart</span> — €{product.variants.edges[0].node.price.amount}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="text-[40px] leading-[48px]">
          <p className="font-bold">{product.title}</p>
          <p>By Author</p>
        </div>

        <div className="grid-wrapper py-5">
          <div className="bg-gray-100 flex flex-col gap-5 py-5">
            {/*<p className="font-bold">Book features</p>*/}
            <div>
              <p className="font-bold">Size</p>
              <p>210x210x21 MM</p>
            </div>

            <div>
              <p className="font-bold">Page</p>
              <p>180</p>
            </div>


            <div>
              <p className="font-bold">Type</p>
              <p>Hardcover</p>
            </div>

            <div>
              <p className="font-bold">Publishing date</p>
              <p>21.02.2025</p>
            </div>

            <div>
              <p className="font-bold">ISBN</p>
              <p>978-91-98427-4-2</p>
            </div>

          </div>
          <div></div>
          <div className="bg-gray-100 flex flex-col gap-5 py-5">
            <div className="absolute pr-10">
              <p className="font-bold">About</p>
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
          <div className="bg-gray-100"></div>
          <div className="bg-gray-100"></div>
        </div>
      </div>
    </>);
}
