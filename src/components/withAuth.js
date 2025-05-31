import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";

export default function withAuth(Component, { requireAuth = false, redirectTo = "/sign-in" } = {}) {
  return function AuthWrapper(props) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
      if (requireAuth && !user) {
        router.replace(redirectTo);
      }
      if (!requireAuth && user) {
        router.replace("/");
      }
    }, [user, requireAuth, router, redirectTo]);

    if ((requireAuth && !user) || (!requireAuth && user)) {
      return null;
    }
    return <Component {...props} />;
  };
}
