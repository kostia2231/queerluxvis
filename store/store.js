import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CREATE_CART, ADD_TO_CART } from "../lib/queries";
import { shopifyFetch } from "../lib/shopify";

const useCartStore = create(
  devtools(
    persist((set, get) => ({
      cart: [],
      totalCount: 0,
      cartId: null,
      checkoutUrl: null,

      async createCart() {
        const data = await shopifyFetch(CREATE_CART);
        set({
          cartId: data.cartCreate.cart.id,
          checkoutUrl: data.cartCreate.cart.checkoutUrl,
        });
      },

      async addItem(item) {
        if (!get().cartId) {
          await get().createCart();
        }

        await shopifyFetch(ADD_TO_CART, {
          cartId: get().cartId,
          lines: [
            {
              merchandiseId: item.id,
              quantity: 1,
            },
          ],
        });

        const cartItem = get().cart.find((p) => p.id === item.id);
        let updatedCart;
        if (cartItem) {
          updatedCart = get().cart.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
          );
        } else {
          updatedCart = [...get().cart, { ...item, quantity: 1 }];
        }

        set({
          cart: updatedCart,
          totalCount: get().totalCount + 1,
        });
      },

      getItemQuantity: (itemId) => {
        const item = get().cart.find((p) => p.id === itemId);
        return item ? item.quantity : 0;
      },

      removeItem: (itemId) =>
        set((state) => {
          const cartItem = state.cart.find((p) => p.id === itemId);
          if (!cartItem) return state;

          const updatedCart = state.cart
            .map((p) => {
              if (p.id === itemId) {
                if (p.quantity === 1) {
                  return null;
                } else {
                  return {
                    ...p,
                    quantity: p.quantity - 1,
                  };
                }
              }
              return p;
            })
            .filter(Boolean);

          const updatedTotalCount = state.totalCount - 1;

          return {
            cart: updatedCart,
            totalCount: updatedTotalCount,
          };
        }),
      getCartCount: () => get().totalCount,

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
      clearCart: () =>
        set(() => ({
          cart: [],
          totalCount: 0,
        })),
    })),
  ),
);

export default useCartStore;
