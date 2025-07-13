import { create } from "zustand";

const useAuthStore = create((set) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({ user });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      // Redirect to sign-in page
      window.location.href = "/sign-in";
    }
    set({ user: null });
  },
}));

export default useAuthStore;
