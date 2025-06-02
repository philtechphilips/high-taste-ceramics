"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import MainLayout from "../../components/MainLayout";
import FeaturedProduct from "../../components/FeaturedProduct";

const Blogs = () => {
  return (
    <MainLayout>
      <section className="w-full py-40 pt-60 flex flex-col items-center justify-center bg-[#EFEBE2] md:px-10 px-5">
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

      <section className="w-full bg-white md:px-10 px-4 py-20">
        <h1 className="font-[Publicko] font-[300] text-[#242222] text-5xl">
          Latest
        </h1>

        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-x-12 md:gap-y-24 gap-y-12 mt-20">
          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia
              quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia
              quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia
              quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia
              quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia
              quidem veniam obcaecati, iste officiis?
            </Link>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div className="relative h-100 overflow-hidden">
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quia
              quidem veniam obcaecati, iste officiis?
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProduct />
    </MainLayout>
  );
};

export default Blogs;
