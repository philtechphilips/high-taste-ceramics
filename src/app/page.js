"use client";

import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full py-40 flex flex-col items-center justify-center bg-[#EFEBE2]">
        <div className="md:w-160 w-full flex flex-col gap-8 items-center">
          <h4
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
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
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className="md:text-5xl  text-4xl font-normal text-[#242222] text-center leading-14"
          >
            Build with Elegance. Choose High Taste Ceramics.
          </h1>
          <p
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            className=" text-center text-[#242222] font-light"
          >
            Supplying quality building materials for homes, offices, and
            commercial projects. Stylish fittings, tiles, and doors crafted for
            lasting beauty and performance.
          </p>

          <Link
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
            data-aos-anchor-placement="top-center"
            href="/"
            className="text-sm font-semibold px-7 py-2 rounded-full border border-[#242222] w-fit hover:bg-[#242222] hover:text-white"
          >
            Shop Now
          </Link>
        </div>

        <div
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
          className="md:w-240 w-full mt-12 px-5"
        >
          <div style={{ position: "relative", width: "100%", height: "700px" }}>
            <Image
              alt="hero-image"
              src="/images/hero-image.jpg"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

