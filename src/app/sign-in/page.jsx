"use client";

import { useState } from "react";
import { signIn } from "../../services/auth.service";
import toast, { Toaster } from 'react-hot-toast';
import MainLayout from "../../components/MainLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import withAuth from "../../components/withAuth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signIn(email, password);
      console.log("SignIn response:", response);
      setUser({...response?.payload, token: response?.token} || null); 
      toast.success(response?.message ?? "Signed in successfully!");
      router.push("/"); // Redirect to homepage
    } catch (err) {
      toast.error(err?.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="w-full md:px-10 px-5 bg-[#F0F0F0] pt-60 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="md:text-5xl text-3xl !font-[300] text-[#242222] font-[Publicko] text-center leading-18">
            Sign In
          </h1>
          <div className="w-full flex items-center justify-center py-10">
            <form className="flex flex-col gap-8 bg-[#F8F8F8] p-8 md:p-12 w-[650px]" onSubmit={handleSubmit}>
              <h2 className="text-xl md:text-3xl font-[Publicko] text-[#242222]">
                Visit Account Page
              </h2>
              <div className="border-b border-[#242222]/20 my-2"></div>
              <p className="text-[#242222] -mt-6">
                Sign in to check order status, or review past orders.
              </p>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-2 text-sm text-[#777]"
                >
                  Email
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-2 text-sm text-[#777]"
                >
                  Password
                </label>
              </div>
              <div className="-my-4 flex justify-end">
                <Link
                  href="/forget-password"
                  className="text-sm text-black font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="bg-[#242222] text-white py-3 px-6 rounded-xl hover:bg-[#3a3838] transition-all duration-200 text-base font-medium shadow-md"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
              <p className="text-center">
                Don't have an account?{" "}
                <Link href="/sign-up" className="underline">
                  Sign up.
                </Link>
              </p>
            </form>
          </div>
        </div>
        <Toaster position="top-right" />
      </section>
    </MainLayout>
  );
};

export default withAuth(SignIn, { requireAuth: false });
