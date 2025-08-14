import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useCartStore = create(
  devtools(
    persist((set, get) => ({
      cart: [],
      totalCount: 0,

      addItem: (item) =>
        set((state) => {
          const cartItem = state.cart.find((p) => p.id === item.id);

          let updatedCart;
          if (cartItem) {
            updatedCart = state.cart.map((p) =>
              p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
            );
          } else {
            updatedCart = [...state.cart, { ...item, quantity: 1 }];
          }

          return {
            cart: updatedCart,
            totalCount: state.totalCount + 1,
          };
        }),

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
