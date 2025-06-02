"use client";
import { useEffect, useState } from "react";
import MainLayout from "../../../components/MainLayout";
import useAuthStore from "../../../store/authStore";
import useCartStore from "../../../store/cartStore";
import useWishlistStore from "../../../store/wishlistStore";
import { fetchProductCategories } from "../../../services/product.service";
import Image from "next/image";

const ITEMS_PER_PAGE = 24; // Adjust as needed

const MOCK_CATEGORIES = Array.from({ length: 23 }).map((_, idx) => ({
  _id: `mock-${idx + 1}`,
  name: `Category ${idx + 1}`,
  productName: `Product ${idx + 1}`,
  image: "/tiles.png",
}));

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = ITEMS_PER_PAGE;
  const user = useAuthStore((state) => state.user);
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  // Calculate pagination
  // Use mock data for pagination only
  const totalPages = Math.ceil(MOCK_CATEGORIES.length / itemsPerPage);
  const paginatedCategories = MOCK_CATEGORIES.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    // Fetch real categories for other logic if needed
    setCategories(MOCK_CATEGORIES); // You can still fetch real data here if needed
    setLoading(false);
  }, []);
  return (
    <MainLayout>
      <section className="w-full py-40 pt-40 flex flex-col items-center justify-center md:px-10 px-5 bg-[#f0f0f0]">
        <div className="w-full flex flex-col gap-8 pb-10 mb-14">
          <p>Home / Products / Tiles</p>
          <h1 className="text-4xl font-semibold font-[Publicko] text-[#242222]">
            Tiles
          </h1>
        </div>

        <div className="w-full grid md:grid-cols-4 grid-cols-1 gap-x-4 md:gap-y-4 gap-y-12 bg-[#f0f0f0]">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden group relative cursor-pointer animate-pulse"
                >
                  <div className="relative h-100 overflow-hidden px-10 flex items-center justify-center bg-gray-200 rounded-md min-h-[220px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-skeleton" />
                  </div>
                  <div className="flex flex-col w-[90%] absolute bottom-5 py-2 items-center justify-center bg-white/80">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))
            : MOCK_CATEGORIES.length > 0
              ? paginatedCategories.map((cat, idx) => (
                  <div
                    key={cat._id || idx}
                    className="overflow-hidden group relative cursor-pointer rounded"
                  >
                    <div className="relative h-80 overflow-hidden px-10 flex items-center justify-center group">
                      <Image
                        src={cat?.image || "/tiles.png"}
                        alt={cat?.name || "Category"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-duration="500"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="true"
                        data-aos-once="true"
                        data-aos-anchor-placement="top-center"
                      />
                      {/* Add to Cart Button with Custom Tooltip */}
                      <div className="absolute top-5 right-5 group/cart">
                        <div
                          onClick={() => addToCart(cat, user)}
                          className="bg-black/50 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer relative"
                        >
                          <i className="ri-shopping-bag-line text-white"></i>
                        </div>
                        <span className="pointer-events-none whitespace-nowrap z-20 absolute top-1 right-10 bg-black/50 text-white text-xs rounded px-2 py-1 opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 shadow-lg">
                          Add to cart
                        </span>
                      </div>
                      {/* Add to Wishlist Button with Custom Tooltip */}
                      <div className="absolute top-16 right-5 group/wishlist">
                        <div
                          onClick={() => addToWishlist(cat, user)}
                          className="bg-black/50 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer relative"
                        >
                          <i className="ri-heart-line text-white"></i>
                        </div>
                        <span className="pointer-events-none whitespace-nowrap z-20 absolute top-1 right-10 bg-black/50 text-white text-xs rounded px-2 py-1 opacity-0 group-hover/wishlist:opacity-100 transition-opacity duration-300 shadow-lg">
                          Add to wishlist
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <p className="relative text-xs text-[#8d8d8d]">
                        {cat?.name || "Cat Name"}
                      </p>
                      <p className="relative font-semibold text-[#242222]">
                        {cat?.productName || "Product Name"}
                      </p>
                      <button
                        type="button"
                        className="bg-[#242222] text-white rounded px-3 py-2 text-sm cursor-pointer"
                        onClick={() => addToCart(cat, user)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              : !loading && (
                  <p className="col-span-3 text-center text-gray-500">
                    No categories found.
                  </p>
                )}
        </div>
        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-start gap-2 mt-8 w-full">
            {/* Previous Arrow */}
            {currentPage > 1 && (
              <button
                className="px-3 py-2 rounded font-medium text-sm transition-colors bg-white text-[#242222] hover:bg-[#ececec] border border-[#ececec]"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous Page"
              >
                <i className="ri-arrow-left-s-line text-xl"></i>
              </button>
            )}
            {/* Page Numbers with ellipsis */}
            {(() => {
              const pageButtons = [];
              const maxVisible = 5;
              if (totalPages <= maxVisible) {
                for (let i = 1; i <= totalPages; i++) {
                  pageButtons.push(i);
                }
              } else {
                if (currentPage <= 3) {
                  pageButtons.push(1, 2, 3, 4, 5, "...");
                  pageButtons.push(totalPages);
                } else if (currentPage >= totalPages - 2) {
                  pageButtons.push(1, "...");
                  for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageButtons.push(i);
                  }
                } else {
                  pageButtons.push(1, "...");
                  pageButtons.push(
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                  );
                  pageButtons.push("...");
                  pageButtons.push(totalPages);
                }
              }
              return pageButtons.map((num, idx) =>
                num === "..." ? (
                  <span
                    key={"ellipsis-" + idx}
                    className="px-2 py-2 font-medium text-sm text-[#242222]"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={num}
                    className={`px-3 py-2 rounded font-medium text-sm transition-colors border border-[#ececec] ${
                      currentPage === num
                        ? "bg-[#242222] text-white"
                        : "bg-white text-[#242222] hover:bg-[#ececec]"
                    }`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                ),
              );
            })()}
            {/* Next Arrow */}
            {currentPage < totalPages && (
              <button
                className="px-3 py-2 rounded font-medium text-sm transition-colors bg-white text-[#242222] hover:bg-[#ececec] border border-[#ececec]"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                aria-label="Next Page"
              >
                <i className="ri-arrow-right-s-line text-xl"></i>
              </button>
            )}
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default Shop;
