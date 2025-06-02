import { create } from "zustand";

const getInitialCart = () => {
  if (typeof window !== "undefined") {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  }
  return [];
};

const useCartStore = create((set, get) => ({
  cart: getInitialCart(),
  addToCart: (item, user) => {
    // Find if item already exists in cart (by _id or unique key)
    const cart = get().cart;
    const itemId = item._id || item.id;
    const existingIndex = cart.findIndex((c) => (c._id || c.id) === itemId);
    let updatedCart;
    if (existingIndex !== -1) {
      // Update quantity/count
      updatedCart = cart.map((c, idx) =>
        idx === existingIndex ? { ...c, count: (c.count || 1) + 1 } : c,
      );
    } else {
      updatedCart = [...cart, { ...item, count: 1 }];
    }
    set({ cart: updatedCart });
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // TODO: Call backend API to sync cart for logged-in user
    }
  },
  setCart: (cart) => {
    set({ cart });
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },
  clearCart: () => {
    set({ cart: [] });
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  },
}));

export default useCartStore;
