"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MainLayout from "../../components/MainLayout";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Terrazzo Flooring - NYC Lobby Collection",
      image: "/NYC Lobby - Terrazzo Flooring.jpeg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Marble Tiles - Classic White",
      image: "/NYC Lobby - Terrazzo Flooring.jpeg",
      quantity: 2,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <MainLayout>
      <section className="w-full md:px-25 px-5 bg-white pt-60 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="md:text-5xl text-3xl !font-[300] text-[#242222] font-[Publicko] leading-18"
          >
            Your Cart
          </h1>

          <p className="text-lg mt-5 text-[#242222]">
            Not quite ready to check out?{" "}
            <Link className="underline hover:text-[#5a5a5a]" href="/">
              Continue Shopping
            </Link>
          </p>

          <div className="border-b border-[#242222]/20 my-8"></div>

          {/* Cart Items */}
          <div className="w-full flex flex-col gap-8">
            {items.length > 0 ? (
              <>
                {/* Desktop Headers (hidden on mobile) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#242222]/10">
                  <div className="col-span-6 font-medium text-[#242222]">
                    Product
                  </div>
                  <div className="col-span-3 font-medium text-[#242222] text-center">
                    Quantity
                  </div>
                  <div className="col-span-3 font-medium text-[#242222] text-right">
                    Actions
                  </div>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-[#242222]/10 hover:bg-[#fafafa] transition-colors duration-200"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-start gap-4">
                      <div className="relative w-24 h-24 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-[#242222]">
                          {item.name}
                        </h3>
                        <p className="text-sm text-[#5a5a5a] mt-1">
                          Material sample
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="flex items-center border border-[#242222]/20 rounded-full">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-lg hover:bg-[#f0f0f0] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-center min-w-[40px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-lg hover:bg-[#f0f0f0] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-3 flex items-center justify-end">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm underline hover:text-[#5a5a5a] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* Submit Quote Button */}
                <div className="flex justify-end mt-12">
                  <button className="bg-[#242222] text-white px-8 py-3 text-lg hover:bg-[#3a3a3a] transition-colors duration-200 rounded-full">
                    Submit Quote Request
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-[#5a5a5a] mb-4">
                  Your cart is empty
                </p>
                <Link
                  href="/"
                  className="inline-block bg-[#242222] text-white px-6 py-2 rounded-full hover:bg-[#3a3a3a] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Cart;
