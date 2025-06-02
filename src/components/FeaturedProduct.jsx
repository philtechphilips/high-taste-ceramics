import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import useAuthStore from "../store/authStore";

const FeaturedProduct = () => {
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
        <SwiperSlide>
          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
              <Image
                src="/NYC Lobby - Terrazzo Flooring.jpeg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-left text-sm text-[#242222]">Tiles</p>
                <p className="text-left text-sm text-[#242222] font-[Publicko]">
                  Glossy, Matte, Wood-Effect, Carving
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
              <Image
                src="/WC-S.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-2 text-left text-sm text-[#242222]">
              Sanitary Ware
            </p>
            <p className="relative mt-1 text-left text-sm text-[#242222] font-[Publicko]">
              WCs, Washbasins, Bidets
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
              <Image
                src="/shower.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-2 text-left text-sm text-[#242222]">
              Bathroom Fittings
            </p>
            <p className="relative mt-1 text-left text-sm text-[#242222] font-[Publicko]">
              Faucets, Accessories, Shower Systems
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
              <Image
                src="/bathroom-fittings.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-2 text-left text-sm text-[#242222]">
              Bathroom Furniture
            </p>
            <p className="relative mt-1 text-left text-sm text-[#242222] font-[Publicko]">
              Cabinets, Mirrors, Vanities
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
              <Image
                src="/bathtub.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-2 text-left text-sm text-[#242222]">
              Bathtubs & Jacuzzi
            </p>
            <p className="relative mt-1 text-left text-sm text-[#242222] font-[Publicko]">
              Luxury soaking and spa solutions
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
              <Image
                src="/kitchen.jpeg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-2 text-left text-sm text-[#242222]">
              Kitchen Designs
            </p>
            <p className="relative mt-1 text-left text-sm text-[#242222] font-[Publicko]">
              Fully fitted modular kitchens with elegant finishings
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default FeaturedProduct;
