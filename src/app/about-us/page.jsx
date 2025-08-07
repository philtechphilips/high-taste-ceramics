"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import MainLayout from "../../components/MainLayout";
import FeaturedProduct from "../../components/FeaturedProduct";

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

      <FeaturedProduct />
    </MainLayout>
  );
};

export default About;
