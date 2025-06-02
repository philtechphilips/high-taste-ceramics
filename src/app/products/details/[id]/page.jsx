"use client";

import React, { useState } from "react";
import MainLayout from "../../../../components/MainLayout";
import FeaturedProduct from "../../../../components/FeaturedProduct";
import Image from "next/image";
import useCartStore from "../../../../store/cartStore";

const ProductDetails = () => {
  // Sample product data (replace with real data fetching later)
  const product = {
    images: "/bathtub.jpg",
    title: "Elegant Ceramic Tile",
    description:
      "High-quality ceramic tile perfect for bathrooms and kitchens. Durable, stylish, and easy to clean.",
    details:
      "Material: Ceramic | Size: 30x30cm | Color: White/Gray | Weight: 2kg",
  };
  const [quantity, setQuantity] = useState(1);
  const [imgTransform, setImgTransform] = useState({ x: 0, y: 0 });
  const addToCart = useCartStore((state) => state.addToCart);

  // Handler for mouse movement over the image
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Calculate offset from center, normalize to [-1, 1]
    const offsetX = (x / rect.width - 0.5) * 2;
    const offsetY = (y / rect.height - 0.5) * 2;
    // Max translate in px
    const maxMove = 12;
    setImgTransform({
      x: offsetX * maxMove,
      y: offsetY * maxMove,
    });
  };

  // Reset transform on mouse leave
  const handleMouseLeave = () => {
    setImgTransform({ x: 0, y: 0 });
  };

  return (
    <MainLayout>
      <section className="flex flex-col md:flex-row gap-12 w-full pb-40 px-5 md:px-40  bg-[#f0f0f0] pt-60 mt-8">
        {/* Image Gallery */}
        <div className="md:w-2/3 flex flex-col items-center group relative">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
              transform: `translate(${imgTransform.x}px, ${imgTransform.y}px)`,
            }}
            className="w-full h-100 overflow-hidden relative cursor-pointer"
          >
            <Image
              src={product.images}
              alt={product.title}
              width={500}
              height={480}
              className="w-full h-120 object-cover rounded-md mb-4"
              style={{
                objectFit: "cover",
                borderRadius: "0.375rem",
                marginBottom: "1rem",
              }}
              priority
            />
          </div>
        </div>
        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <p className="text-sm text-[#242222] mb-4">
              Home / Products / Accessories / Origin-Black
            </p>

            <p className="text-[#242222] mb-4">Tiles</p>

            <h1 className="text-2xl md:text-3xl font-bold mb-8">
              {product.title}
            </h1>

            <div className="border-t pt-4 mt-4">
              <p className="text-gray-700 mb-2">{product.description}</p>
            </div>

            <div className="flex items-center mb-6">
              <span className="font-semibold mr-4">Quantity:</span>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 border border-[#242222]"
              >
                -
              </button>
              <span className="px-3 py-2 border border-r-0 border-l-0 border-[#242222]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 border  border-[#242222]"
              >
                +
              </button>
              <button
                type="button"
                className="bg-[#242222] ml-4 text-white rounded px-3 py-2 text-sm cursor-pointer"
                onClick={() =>
                  addToCart({
                    ...product,
                    count: quantity,
                    id: product._id || product.id || product.title, // fallback for unique id
                  })
                }
              >
                Add to Cart
              </button>
            </div>

            <div className="border-t border-[#242222]/40 w-full"></div>
            <p className="text-[#242222] mt-4">Category: Tiles</p>
          </div>
        </div>
      </section>

      <FeaturedProduct />
    </MainLayout>
  );
};

export default ProductDetails;
