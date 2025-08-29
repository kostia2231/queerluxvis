import AddToCart from "./AddToCart"
import { GET_PRODUCTS } from "../lib/queries"
import { shopifyFetch } from "../lib/shopify"
import { ProductsResponse } from "../types"
import Image from "next/image"

export default async function ProductMenuElement() {
  const data = await shopifyFetch<ProductsResponse>(GET_PRODUCTS, { first: 6 })
  const products = data.products.edges.map(edge => edge.node)


  console.log(products)
  return (
    <>
      <div className="grid-wrapper pt-[77px]">
        {products.map(p => (<div key={p.id}>
          <div className="h-[400px] w-full relative bg-gray-200">
            <Image
              src={p.images.edges[0]?.node.src || ""}
              alt={`Book Cover - ${p.id}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex justify-between pt-5 pr-5">
            <div>
              <p>{p.title}</p>
              <p>— €{p.variants.edges[0]?.node.price.amount}</p>
            </div>
            <AddToCart product={p} />
          </div>
        </div>))}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
