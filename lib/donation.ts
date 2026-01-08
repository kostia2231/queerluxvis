import { shopifyFetch } from "./shopify";
import type { CartCreateResponse } from "../types";

export async function createDonationCheckout(amount: number) {
    const DONATION_VARIANT_ID = "gid://shopify/ProductVariant/56056004804981";

    const mutation = `
    mutation createCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
        }
      }
    }
  `;

    const variables = {
        input: {
            lines: [
                {
                    merchandiseId: DONATION_VARIANT_ID,
                    quantity: amount,
                },
            ],
        },
    };

    const data = await shopifyFetch<CartCreateResponse>(mutation, variables);

    const cart = data.cartCreate.cart;
    const errors = data.cartCreate.userErrors;

    console.log("Checkout URL:", cart?.checkoutUrl);

    if (errors?.length) {
        console.error("Shopify errors:", errors);
        throw new Error(errors[0].message);
    }

    if (!cart?.checkoutUrl) {
        throw new Error("Failed to create donation checkout");
    }

    return cart.checkoutUrl;
}
