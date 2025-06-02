"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import MainLayout from "../../components/MainLayout";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import withAuth from "../../components/withAuth";
import { checkout } from "../../services/product.service";
import toast from "react-hot-toast";

const Checkout = () => {
  const user = useAuthStore((state) => state.user);
  const { cart } = useCartStore();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    street: user?.street || "",
    apartment: user?.apartment || "",
    city: user?.city || "",
    state: user?.state || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation: check all required fields except apartment
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "address",
      "street",
      "city",
      "state",
    ];
    const emptyField = requiredFields.find((field) => !form[field]?.trim());
    if (emptyField) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        userId: user?._id || user?.id, // adjust key as per your user object
        ...form,
        cart: cart.map((item) => ({
          productId: item.id,
          quantity: item.count || 1,
        })),
      };
      await checkout(payload, user?.token);
      toast.success("Order submitted successfully!");
      // Optionally, redirect or clear cart here
    } catch (error) {
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="w-full py-40 pt-60 flex flex-col items-center justify-center bg-[#EFEBE2]">
        <div className="md:w-160 w-full flex flex-col gap-8 items-center">
          <h1 className="md:text-[140px] text-4xl !font-[300] text-[#242222] font-[Publicko] text-center leading-18">
            Checkout
          </h1>
          <p className="text-center text-[#242222] font-light">
            Please review your order and proceed to checkout.
          </p>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-10  md:px-10 px-5 bg-[#f0f0f0] pt-20 pb-20">
        <div className="md:w-1/2 w-full bg-[#F0F0F0] pb-5">
          <div className="w-full">
            <h1 className="md:text-3xl text-xl !font-[300] text-[#242222] font-[Publicko] leading-18">
              Customer Information
            </h1>
            <div className="w-full flex items-center justify-center py-10">
              <form
                className="flex flex-col gap-8  w-full"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                      placeholder="First Name"
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-4 top-2 text-sm text-[#777]"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                      placeholder="Last Name"
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-4 top-2 text-sm text-[#777]"
                    >
                      Last Name
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
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
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="phoneNumber"
                    className="absolute left-4 top-2 text-sm text-[#777]"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                    placeholder="Address"
                  />
                  <label
                    htmlFor="address"
                    className="absolute left-4 top-2 text-sm text-[#777]"
                  >
                    Address
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={form.street}
                      onChange={handleChange}
                      className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                      placeholder="Street"
                    />
                    <label
                      htmlFor="street"
                      className="absolute left-4 top-2 text-sm text-[#777]"
                    >
                      Street
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={form.apartment}
                      onChange={handleChange}
                      className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                      placeholder="Apartment (optional)"
                    />
                    <label
                      htmlFor="apartment"
                      className="absolute left-4 top-2 text-sm text-[#777]"
                    >
                      Apartment
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                      placeholder="City"
                    />
                    <label
                      htmlFor="city"
                      className="absolute left-4 top-2 text-sm text-[#777]"
                    >
                      City
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                      placeholder="State"
                    />
                    <label
                      htmlFor="state"
                      className="absolute left-4 top-2 text-sm text-[#777]"
                    >
                      State
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#242222] text-white py-3 px-6 rounded-xl hover:bg-[#3a3838] transition-all duration-200 text-base font-medium shadow-md flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {loading ? "Submitting..." : "Proceed to Submit Your Quote"}
                </button>
              </form>
            </div>
          </div>

          <div className="max-w-1/2 mx-auto"></div>
          <Toaster position="top-right" />
        </div>

        <div className="md:w-1/2 w-full">
          <h1 className="md:text-3xl text-xl !font-[300] text-[#242222] font-[Publicko] leading-18">
            Your Order Summary
          </h1>
          <p className="text-lg text-[#242222] mb-4">
            Thank you for choosing our products. Please confirm your order
            details below.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-lg font-medium text-[#242222] mb-4">
              Order Summary
            </p>
            {cart.length > 0 ? (
              <div className="flex flex-col gap-6">
                {/* Desktop Headers (hidden on mobile) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-[#242222]/10">
                  <div className="col-span-6 font-medium text-[#242222]">
                    Product
                  </div>
                  <div className="col-span-3 font-medium text-[#242222] text-center">
                    Quantity
                  </div>
                  <div className="col-span-3 font-medium text-[#242222] text-right">
                    Category
                  </div>
                </div>
                {cart.map((item) => (
                  <div
                    key={item?.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-[#242222]/10"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="relative w-16 h-16 overflow-hidden rounded-md bg-white border border-[#eee]">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-[#242222]">
                          {item?.name}
                        </h3>
                      </div>
                    </div>
                    {/* Quantity */}
                    <div className="col-span-3 flex items-center justify-center">
                      <span className="px-3 py-1 bg-white rounded-full border border-[#ccc] min-w-[40px] text-center">
                        {item.count || 1}
                      </span>
                    </div>
                    {/* Category */}
                    <div className="col-span-3 flex items-center justify-end">
                      <span className="text-sm text-[#5a5a5a]">
                        {item?.category?.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-[#5a5a5a]">
                No items in cart.
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              href="/cart"
              className="px-6 py-3 bg-[#242222] text-white rounded-full hover:bg-black transition-colors duration-300"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default withAuth(Checkout, { requireAuth: true });
