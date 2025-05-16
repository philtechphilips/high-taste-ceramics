"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const Blogs = () => {
  return (
     <>
      <Navbar />
      <section className="w-full py-40 pt-80 flex flex-col items-center justify-center bg-[#EFEBE2] md:px-25 px-5">
        <div className="w-full flex flex-col gap-8 items-center border-b border-[rgba(36,34,34,0.15)] pb-10 mb-14">
          <h1
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="md:text-[140px] text-4xl !font-[300] text-[#242222] font-[Publicko] text-center leading-18 "
          >
            Blogs
          </h1>
        </div>

        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
          className="w-full mt-12 px-5 md:px-20"
        >
          <div style={{ position: "relative", width: "100%", height: "700px" }}>
            <Image
              alt="hero-image"
              src="/hero.jpg"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white md:px-25 px-4 py-20">
        <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
          Latest
        </h1>

        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-x-12 md:gap-y-24 gap-y-12 mt-20">
          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-120 overflow-hidden">
              <Image
                src="/NYC Lobby - Terrazzo Flooring.jpeg"
                alt="image"
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
            </div>
             <p className="relative mt-4 text-left  text-[#242222] text-sm">
              5 days ago
            </p>
            <p className="relative mt-1 text-left text-lg text-[#242222] font-[Publicko] ">
              Lorem ipsum dolor sit amet.
            </p>
             <Link href="/" className="relative mt-1 text-lefttext-[#242222]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-120 overflow-hidden">
              <Image
                src="/WC-S.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
           <p className="relative mt-4 text-left  text-[#242222] text-sm">
              5 days ago
            </p>
            <p className="relative mt-1 text-left text-lg text-[#242222] font-[Publicko] ">
              Lorem ipsum dolor sit amet.
            </p>
             <Link href="/" className="relative mt-1 text-lefttext-[#242222]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-120 overflow-hidden">
              <Image
                src="/shower.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-4 text-left  text-[#242222] text-sm">
              5 days ago
            </p>
            <p className="relative mt-1 text-left text-lg text-[#242222] font-[Publicko] ">
              Lorem ipsum dolor sit amet.
            </p>
             <Link href="/" className="relative mt-1 text-lefttext-[#242222]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-120 overflow-hidden">
              <Image
                src="/bathroom-fittings.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-4 text-left  text-[#242222] text-sm">
              5 days ago
            </p>
            <p className="relative mt-1 text-left text-lg text-[#242222] font-[Publicko] ">
              Lorem ipsum dolor sit amet.
            </p>
             <Link href="/" className="relative mt-1 text-lefttext-[#242222]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-120 overflow-hidden">
              <Image
                src="/bathtub.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-4 text-left  text-[#242222] text-sm">
              5 days ago
            </p>
            <p className="relative mt-1 text-left text-lg text-[#242222] font-[Publicko] ">
              Lorem ipsum dolor sit amet.
            </p>
             <Link href="/" className="relative mt-1 text-lefttext-[#242222]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-120 overflow-hidden">
              <Image
                src="/kitchen.jpeg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="relative mt-4 text-left  text-[#242222] text-sm">
              5 days ago
            </p>
            <p className="relative mt-1 text-left text-lg text-[#242222] font-[Publicko] ">
              Lorem ipsum dolor sit amet.
            </p>
             <Link href="/" className="relative mt-1 text-lefttext-[#242222]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia quidem veniam obcaecati, iste officiis?
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#EFEBE2] md:px-25 px-4 py-20">
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
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          scrollbar={{ draggable: true }}
          modules={[Scrollbar]}
          className="mt-20 !pb-20"
        >
          <SwiperSlide>
            <div className="overflow-hidden group relative cursor-pointer">
              <div className="relative h-120 overflow-hidden">
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
              <div className="relative h-120 overflow-hidden">
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
              <div className="relative h-120 overflow-hidden">
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
              <div className="relative h-120 overflow-hidden">
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
              <div className="relative h-120 overflow-hidden">
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
              <div className="relative h-120 overflow-hidden">
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

      <Footer />
    </>
  )
}

export default Blogs