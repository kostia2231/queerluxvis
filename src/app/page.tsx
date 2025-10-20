import ProductMenuElement from "../../components/ProductMenuElement";
import { shopifyFetch } from "../../lib/shopify";
import { ProductsResponse } from "../../types";
import { GET_PRODUCTS } from "../../lib/queries";

export default async function Home() {
  const data = await shopifyFetch<ProductsResponse>(GET_PRODUCTS, { first: 6 })
  const products = data.products.edges.map(edge => edge.node)
  // console.log(data)

  return (
    <>
      {/*<div className="pt-5 transition-all duration-400">
        <div className="bg-gray-100 border p-5 border-t-0 pl-0">
          <h1 className="opacity">
            Our publishing is a space of visibility, dialogue, and celebration of diversity.
            <br />
            We explore and highlight queer culture, bringing together media, art, and activism in one flow.
          </h1>
        </div>
      </div>*/}
      <div className="pb-25">
        <ProductMenuElement products={products} />
      </div>
    </>
  );
}
