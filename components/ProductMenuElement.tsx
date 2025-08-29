import AddToCart from "./AddToCart"
import { GET_PRODUCTS } from "../lib/queries"
import { shopifyFetch } from "../lib/shopify"
import { ProductsResponse } from "../types"
import Image from "next/image"
import Link from "next/link"

export default async function ProductMenuElement() {
  const data = await shopifyFetch<ProductsResponse>(GET_PRODUCTS, { first: 6 })
  const products = data.products.edges.map(edge => edge.node)

  return (
    <>
      <div className="grid grid-cols-3 gap-5 pt-[77px]">
        {products.map(p => (<div key={p.id}>
          <Link href={`/product/${p.handle}`}>
            <div className="h-[400px] w-full relative bg-gray-200 cursor-pointer">
              <Image
                src={p.images.edges[0]?.node.src || "/placeholder.png"}
                alt={`Book Cover - ${p.id}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </Link>
          <div className="flex justify-between pt-5 pr-5">
            <div>
              <p>{p.title}</p>
              <p>— €{p.variants.edges[0]?.node.price.amount}</p>
            </div>
            {p && <AddToCart product={p} />}
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
