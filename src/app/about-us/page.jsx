"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import MainLayout from "../../components/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <section className="pt-60 pb-20 md:px-10 px-5 bg-[#EFEBE2]">
        <div className="flex md:flex-row flex-col md:gap-30 gap-20 justify-between items-center ">
          <div className="md:w-[45%]">
            <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
              Who we are
            </h1>
            <p className="text-[#242222] mb-8 text-lg mt-4">
              High Taste Ceramics is Nigeria’s premium destination for
              high-quality tiles, sanitary ware, and luxury bathroom solutions.
              We blend timeless style with modern functionality.
            </p>

            <Link
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
              href="/"
              className="text-sm mt-8 font-semibold px-7 py-2 rounded-full border border-[#242222] w-fit hover:bg-[#242222] hover:text-white"
            >
              Visit our showroom
            </Link>
          </div>
          <div className="md:w-1/2 w-full flex md:flex-row flex-col gap-16">
            <div className="md:w-1/2">
              <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
                Mission
              </h1>
              <p className="text-[#242222] mb-8 text-lg mt-4">
                To deliver lasting quality, innovative design, and exceptional
                service — helping our clients create spaces that reflect their
                style and sophistication.
              </p>
            </div>

            <div className="md:w-1/2">
              <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
                Vission
              </h1>
              <p className="text-[#242222] mb-8 text-lg mt-4">
                To be Africa's leading brand for luxury tiles and bathroom
                solutions, inspiring design excellence and setting the standard
                for quality and elegance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-20 md:px-10 px-5 bg-white">
        <div className="flex md:flex-row flex-col md:gap-50 gap-20 justify-between items-center ">
          <div className="md:w-1/2">
            <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
              Core Values
            </h1>

            <div className="flex items-center text-lg gap-2">
              <i class="ri-check-double-line"></i>
              <p>Quality</p>
            </div>

            <div className="flex items-center text-lg gap-2">
              <i class="ri-check-double-line"></i>
              <p>Trust</p>
            </div>

            <div className="flex items-center text-lg gap-2">
              <i class="ri-check-double-line"></i>
              <p>Customer-Centric</p>
            </div>

            <div className="flex items-center text-lg gap-2">
              <i class="ri-check-double-line"></i>
              <p>Quality</p>
            </div>

            <div className="flex items-center text-lg gap-2">
              <i class="ri-check-double-line"></i>
              <p>Professionalism</p>
            </div>
          </div>
          <div className="md:w-1/2 w-full md:h-160 h-100 relative">
            <Image src="/bathtub.jpg" alt="bathtub" fill></Image>
          </div>
        </div>
      </section> */}

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
    </MainLayout>
  );
};

export default About;
