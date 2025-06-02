"use client";

import Image from "next/image";
import Link from "next/link";
import MainLayout from "../../components/MainLayout.js";
import useWishlistStore from "../../store/wishlistStore";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  return (
    <MainLayout>
      <section className="w-full md:px-10 px-5 bg-white pt-60 pb-20">
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
            My Favourite
          </h1>

          <p className="text-lg mt-5 text-[#242222]">
            {wishlist.length} Item{wishlist.length !== 1 ? "s" : ""}
          </p>

          <div className="border-b border-[#242222]/20 my-8"></div>

          {/* Wishlist Items */}
          <div className="w-full flex flex-col gap-8">
            {wishlist.length > 0 ? (
              <>
                {/* Desktop Headers (hidden on mobile) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#242222]/10">
                  <div className="col-span-6 font-medium text-[#242222]">
                    Product
                  </div>
                  <div className="col-span-3 font-medium text-[#242222] text-center">
                    Actions
                  </div>
                  <div className="col-span-3 font-medium text-[#242222] text-right">
                    Remove
                  </div>
                </div>

                {wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-[#242222]/10 hover:bg-[#fafafa] transition-colors duration-200"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-start gap-4">
                      <div className="relative w-24 h-24 overflow-hidden">
                        <Image
                          src={
                            item.image || "/NYC Lobby - Terrazzo Flooring.jpeg"
                          }
                          alt={item.name || "Wishlist item"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-[#242222]">
                          {item.name || "Product Name"}
                        </h3>
                        <p className="text-sm text-[#5a5a5a] mt-1">
                          Material sample
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-3 flex items-center justify-center">
                      <button className="bg-[#242222] text-white py-2 px-6 rounded-full hover:bg-[#3a3a3a] transition-colors duration-200 font-medium shadow-md text-sm">
                        Add to Cart
                      </button>
                    </div>

                    {/* Remove Button */}
                    <div className="col-span-3 flex items-center justify-end">
                      <button
                        onClick={() => removeFromWishlist(item._id)}
                        className="text-sm underline hover:text-[#5a5a5a] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-[#5a5a5a] mb-4">
                  No items in your wishlist.
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

export default Wishlist;
