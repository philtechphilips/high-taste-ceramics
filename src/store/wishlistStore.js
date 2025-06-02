import { create } from "zustand";

const useWishlistStore = create((set, get) => ({
  wishlist:
    typeof window !== "undefined" && localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [],
  addToWishlist: (product, user) => {
    set((state) => {
      // Prevent duplicates by _id
      if (state.wishlist.some((item) => item._id === product._id)) return state;
      const updated = [...state.wishlist, { ...product, user }];
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(updated));
      }
      return { wishlist: updated };
    });
  },
  removeFromWishlist: (productId) => {
    set((state) => {
      const updated = state.wishlist.filter((item) => item._id !== productId);
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(updated));
      }
      return { wishlist: updated };
    });
  },
  clearWishlist: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("wishlist");
    }
    set({ wishlist: [] });
  },
}));

export default useWishlistStore;
