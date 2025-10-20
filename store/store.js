import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CREATE_CART } from "../lib/queries";
import { shopifyFetch } from "../lib/shopify";

const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        isCartOpen: false,
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

        addItem: (item) => {
          set((state) => {
            const cartItem = state.cart.find((p) => p.id === item.id);
            let updatedCart;

            if (cartItem) {
              updatedCart = state.cart.map((p) =>
                p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
              );
            } else {
              updatedCart = [...state.cart, { ...item, quantity: 1, isPreorder: item.isPreorder }];
            }

            return {
              cart: updatedCart,
              totalCount: state.totalCount + 1,
            };
          });

          get().openCart();
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
                    return { ...p, quantity: p.quantity - 1 };
                  }
                }
                return p;
              })
              .filter(Boolean);

            return {
              cart: updatedCart,
              totalCount: Math.max(state.totalCount - 1, 0),
            };
          }),

        getCartCount: () => get().totalCount,
        getTotalPrice: () =>
          get().cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),

        clearCart: () => set({ cart: [], totalCount: 0 }),

        openCart: () => set({ isCartOpen: true }),
        closeCart: () => set({ isCartOpen: false }),
        toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      }),
      { name: "cart-storage" }
    )
  )
);

export default useCartStore;
