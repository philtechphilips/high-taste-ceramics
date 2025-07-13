"use client";

import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import MainLayout from "../components/MainLayout";
import Collection from "../components/Collection";
import FeaturedProduct from "../components/FeaturedProduct";

export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <MainLayout>
      <section className="w-full py-40 pt-60 flex flex-col items-center justify-center bg-[#EFEBE2]">
        <div className="md:w-160 w-full flex flex-col gap-8 items-center">
          <h4 className="text-center font-semibold text-sm text-[#242222] uppercase">
            Premium Building Solutions
          </h4>
          <h1 className="md:text-6xl text-4xl font-normal text-[#242222] text-center leading-18">
            Elevate Your Spaces with Timeless Elegance.
          </h1>
          <p className=" text-center text-[#242222] font-light">
            High Taste Ceramics offers a curated selection of premium tiles,
            bathroom fittings, and kitchen solutions designed to meet your taste
            for luxury and quality.
          </p>

          <Link
            href="/"
            className="text-sm font-semibold px-7 py-2 rounded-full border border-[#242222] w-fit hover:bg-[#242222] hover:text-white"
          >
            Explore Collections
          </Link>
        </div>

        <div className="w-full flex items-center justify-center mt-12 px-5 md:px-20">
          <video
            className="h-180"
            src="/IMG_1031.MP4"
            autoPlay
            loop
            muted
            controls
          ></video>
        </div>
      </section>

      <Collection />

      <FeaturedProduct />

      <section className="relative w-full bg-[#242222] px-4 md:px-10 py-24 text-white overflow-hidden">
        {/* Gradient overlays for smooth fade */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-20" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-20" />

        <h1 className="font-[Publicko] font-light text-4xl md:text-5xl mb-16 text-center">
          Why High Taste Ceramics?
        </h1>

        <div
          data-aos="fade-right"
          data-aos-duration="500"
          className="grid sm:grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
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

      <section className="w-full bg-white py-24 px-4 md:px-10">
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
    </MainLayout>
  );
}
