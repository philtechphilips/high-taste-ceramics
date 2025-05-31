"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && (!user || user.role !== "admin")) {
      router.replace("/");
    }
  }, [user, hydrated, router]);

  if (!hydrated) return null;
  if (!user || user.role !== "admin") return null;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {user.firstname || user.name || "Admin"}!</p>
      {/* Add dashboard content here */}
    </div>
  );
};

export default Dashboard;
