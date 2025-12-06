import { shopifyFetch } from "../../../../lib/shopify";
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from "../../../../lib/queries";
import type {
    Product,
    PropsProductParams,
    ProductByHandleResponse,
} from "../../../../types";
import Image from "next/image";
import ProductBuySection from "../../../../components/ProductBuySection";
import ProductInfoBlock from "../../../../components/ProductInfoBlock";

export async function generateStaticParams() {
    const data = await shopifyFetch<{
        products: { edges: { node: Product }[] };
    }>(GET_PRODUCTS, { first: 100 });
    return data.products.edges.map((edge) => ({
        handle: edge.node.handle,
    }));
}

export default async function Product({ params }: PropsProductParams) {
    const { handle } = await params;
    const data = await shopifyFetch<ProductByHandleResponse>(
        GET_PRODUCT_BY_HANDLE,
        { handle },
    );

    const product = data.productByHandle;
    // console.log(product)
    if (!product) return <p>Product not found :(</p>;

    return (
        <>
            <div className="w-full flex flex-col justify-start items-center">
                <div className="w-full grid grid-cols-3 gap-5 text-white max-[600px]:grid-cols-1 max-[600px]:gap-0">
                    <div className="max-[768px]:h-[400px] col-span-2 flex items-center justify-center w-full bg-gray-100">
                        {/*"min-[768px]:hidden h-[400px] w-full relative
                        bg-gray-100 overflow-hidden flex"*/}
                        <Image
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={product.images.edges[0].node.src}
                            width={550}
                            height={300}
                            alt="Book cover"
                            className="h-auto"
                        />
                    </div>

                    <div className="col-span-1 flex flex-col text-black text-black/30h-full border-l">
                        <div className="flex-grow" />
                        <div className="py-5">
                            {product.title}
                            <p className="text-black/30">
                                {product.metafield?.value}
                            </p>
                        </div>
                        <ProductBuySection product={product} />
                    </div>
                </div>
            </div>

            <div>
                <ProductInfoBlock product={product} />
            </div>
        </>
    );
}
