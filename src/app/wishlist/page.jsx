"use client";

import Image from "next/image";
import MainLayout from "../../components/MainLayout.js";
import withAuth from "../../components/withAuth";

const Wishlist = () => {
  return (
    <MainLayout>
      <section className="w-full md:px-10 px-5 bg-white pt-60 pb-20">
        <h1
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="true"
          data-aos-anchor-placement="top-center"
          className="md:text-5xl text-xl !font-[300] text-[#242222] font-[Publicko] leading-18"
        >
          My Favourite
        </h1>

        <p className="text-lg mt-5 text-[#242222]">2 Items</p>

        <div className="border-b border-[#242222]/20 my-5"></div>

        <div className="w-full grid md:grid-cols-4 grid-cols-1 gap-x-12 md:gap-y-24 gap-y-12 mt-20">
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
            <p
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="true"
              data-aos-anchor-placement="top-center"
              className="relative mt-4 text-left text-[#242222]"
            >
              Tiles – Glossy, Matte, Wood-Effect, Carving
            </p>
            <button className="bg-[#242222] text-white py-2 mt-2 px-6 rounded-full hover:bg-[#3a3838] transition-all duration-200 font-medium shadow-md text-sm">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default withAuth(Wishlist, { requireAuth: true });
