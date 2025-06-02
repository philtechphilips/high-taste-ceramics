import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import useAuthStore from "../store/authStore";
import { featuredProduct } from "../services/product.service";

const FeaturedProduct = () => {
  const [featuredProducts, setFeaturedProduct] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await featuredProduct();
        console.log("Featured Products:", response.payload);

        setFeaturedProduct(response.payload);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);
  return (
    <section className="w-full bg-[#EFEBE2] md:px-10 px-4 py-20">
      <div className="flex items-center justify-between">
        <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
          Featured Products
        </h1>

        <Link
          href="/contact-us"
          className="px-5 py-2 text-[#242222] border border-[#242222] font-semibold text-sm rounded-full 
             hover:bg-[#242222] hover:text-white 
             transition-colors duration-300 ease-in-out"
        >
          Learn more
        </Link>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar]}
        className="mt-20 !pb-20"
      >
        {featuredProducts && featuredProducts.length > 0
          ? featuredProducts.map((product, idx) => (
              <SwiperSlide key={idx}>
                <Link
                  href={`/products/details/${product?.id}`}
                  className="overflow-hidden group relative cursor-pointer"
                >
                  <div className="relative h-100 overflow-hidden">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-left text-sm text-[#242222]">
                        {product?.category?.name}
                      </p>
                      <p className="text-left text-sm text-[#242222] font-[Publicko]">
                        {product?.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          : Array.from({ length: 4 }).map((_, idx) => (
              <SwiperSlide key={"skeleton-" + idx}>
                <div className="overflow-hidden group relative cursor-pointer animate-pulse">
                  <div className="relative h-100 overflow-hidden bg-gray-200 rounded-md min-h-[220px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-skeleton" />
                  </div>
                  <div className="flex flex-col w-[90%] absolute bottom-5 py-2 items-center justify-center bg-white/80">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProduct;
