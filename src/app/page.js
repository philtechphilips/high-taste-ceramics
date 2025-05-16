"use client";

import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";

export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <section className="w-full py-40 pt-80 flex flex-col items-center justify-center bg-[#EFEBE2]">
        <div className="md:w-160 w-full flex flex-col gap-8 items-center">
          <h4
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="text-center font-semibold text-sm text-[#242222] uppercase"
          >
            Premium Building Solutions
          </h4>
          <h1
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="md:text-6xl text-4xl font-normal text-[#242222] text-center leading-18"
          >
            Elevate Your Spaces with Timeless Elegance.
          </h1>
          <p
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className=" text-center text-[#242222] font-light"
          >
            High Taste Ceramics offers a curated selection of premium tiles,
            bathroom fittings, and kitchen solutions designed to meet your taste
            for luxury and quality.
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
            className="text-sm font-semibold px-7 py-2 rounded-full border border-[#242222] w-fit hover:bg-[#242222] hover:text-white"
          >
            Explore Collections
          </Link>
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
          Our Collections
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
            <p
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
           className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] ">
              Tiles – Glossy, Matte, Wood-Effect, Carving
            </p>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative h-120 overflow-hidden">
              <Image
                src="/WC-S.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] ">
              Sanitary Ware – WCs, Washbasins, Bidets
            </p>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative h-120 overflow-hidden">
              <Image
                src="/shower.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] ">
              Bathroom Fittings – Faucets, Accessories, Shower Systems
            </p>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative h-120 overflow-hidden">
              <Image
                src="/bathroom-fittings.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] ">
              Bathroom Furniture – Cabinets, Mirrors, Vanities
            </p>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative h-120 overflow-hidden">
              <Image
                src="/bathtub.jpg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] ">
              Bathtubs & Jacuzzi – Luxury soaking and spa solutions
            </p>
          </div>

          <div className="overflow-hidden group relative cursor-pointer">
            <div
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative h-120 overflow-hidden">
              <Image
                src="/kitchen.jpeg"
                alt="image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p
             data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
             className="relative mt-4 text-left text-2xl text-[#242222] font-[Publicko] ">
              Kitchen Designs – Fully fitted modular kitchens with elegant
              finishings
            </p>
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

      <section className="relative w-full bg-black px-4 md:px-20 py-24 text-white overflow-hidden">
        {/* Gradient overlays for smooth fade */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-20" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20" />

        <h1 className="font-[Publicko] font-light text-4xl md:text-5xl mb-16 text-center">
          Why High Taste Ceramics?
        </h1>

        <div
         data-aos="fade-right"
          data-aos-duration="500"
         className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {[
            "Premium European-Grade Products",
            "Trusted by Builders, Architects, & Homeowners",
            "Functional Elegance That Lasts",
            "Custom Design Support & After-Sales Service",
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-center gap-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-transform hover:scale-105 duration-300"
            >
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                {index + 1}
              </div>
              <p className="text-lg font-light leading-snug">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-white py-24 px-4 md:px-20">
        <h2 className="text-3xl md:text-5xl font-[Publicko] font-light text-center mb-16 bg-gradient-to-r from-black via-gray-700 to-black text-transparent bg-clip-text">
          Client Testimonials
        </h2>

        <div className="max-w-2xl mx-auto relative bg-white/60 backdrop-blur-md border border-gray-200 p-10 rounded-3xl shadow-xl transition-transform hover:scale-105 duration-300">
          <svg
            className="absolute -top-5 left-5 w-10 h-10 text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.17 6A4.17 4.17 0 003 10.17V17a1 1 0 001 1h5a1 1 0 001-1v-7A4.17 4.17 0 007.17 6zm10 0A4.17 4.17 0 0013 10.17V17a1 1 0 001 1h5a1 1 0 001-1v-7A4.17 4.17 0 0017.17 6z" />
          </svg>

          <p className="text-lg md:text-xl font-serif italic text-gray-800 leading-relaxed z-10 relative">
            “Our bathroom turned out{" "}
            <span className="text-black font-semibold">stunning</span> thanks to
            HTC. The quality is{" "}
            <span className="text-black font-semibold">top-notch</span>!”
          </p>

          <div className="text-right mt-6 text-sm font-medium text-gray-600 z-10 relative">
            – Sandra, Lekki
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

