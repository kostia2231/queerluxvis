import type { CartProduct } from "../types";
import { shopifyFetch } from "./shopify";
import { CREATE_CART, ADD_TO_CART, GET_CART } from "./queries";

export async function createCheckoutFromCart(items: CartProduct[]): Promise<string> {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty — cannot create checkout.");
  }

  const data = await shopifyFetch<{
    cartCreate: { cart: { checkoutUrl: string } };
  }, {
    cartInput: { lines: { merchandiseId: string; quantity: number }[] };
  }>(CREATE_CART, {
    cartInput: {
      lines: items.map((item) => ({
        merchandiseId: item.id,
        quantity: item.quantity || 1,
      })),
    },
  });

  const checkoutUrl = data.cartCreate.cart.checkoutUrl;
  if (!checkoutUrl) throw new Error("Shopify did not return checkout URL");

  return checkoutUrl;
}

export async function addToCart(cartId: string, items: CartProduct | CartProduct[]) {
  const lines = Array.isArray(items)
    ? items.map((item) => ({
      merchandiseId: item.id,
      quantity: item.quantity || 1,
    }))
    : [{ merchandiseId: items.id, quantity: items.quantity || 1 }];

  const data = await shopifyFetch<
    {
      cartLinesAdd: {
        cart: {
          id: string;
          checkoutUrl: string;
          totalQuantity: number;
          lines: {
            edges: {
              node: {
                id: string;
                quantity: number;
                merchandise: {
                  id: string;
                  title: string;
                  product: {
                    title: string;
                    featuredImage?: { url: string };
                  };
                  priceV2: { amount: string; currencyCode: string };
                };
              };
            }[];
          };
        };
      };
    },
    {
      cartId: string;
      lines: { merchandiseId: string; quantity: number }[];
    }
  >(ADD_TO_CART, { cartId, lines });

  return data.cartLinesAdd.cart;
}

export async function getCheckoutUrl(cartId: string): Promise<string> {
  const data = await shopifyFetch<
    { cart: { id: string; checkoutUrl: string } },
    { cartId: string }
  >(GET_CART, { cartId });

  return data.cart.checkoutUrl;
}

export async function createCart(items: CartProduct[] = []) {
  const lines = items.map((item) => ({
    merchandiseId: item.id,
    quantity: Number(item.quantity || 1),
  }));

  // console.log("Payload to Shopify:", JSON.stringify({ cartInput: { lines } }, null, 2));

  const data = await shopifyFetch<
    {
      cartCreate: {
        cart: {
          id: string;
          checkoutUrl: string;
          totalQuantity: number;
          lines: { edges: { node: { quantity: number } }[] };
        };
        userErrors?: { field: string[] | null; message: string }[];
      };
    },
    { cartInput: { lines: { merchandiseId: string; quantity: number }[] } }
  >(CREATE_CART, { cartInput: { lines } });

  const errors = data.cartCreate.userErrors || [];
  if (errors.length) {
    console.error("Shopify userErrors:", errors);
    throw new Error(errors.map((e) => e.message).join("; "));
  }

  // console.log("Created cart:", data.cartCreate.cart);
  // console.log("Lines sent to Shopify:", JSON.stringify({ lines }, null, 2));
  // console.log("Shopify response:", JSON.stringify(data, null, 2));
  return data.cartCreate.cart;
}
