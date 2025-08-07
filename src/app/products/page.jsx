"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import MainLayout from "../../components/MainLayout";
import { fetchProductCategories } from "../../services/product.service";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";
import Collection from "../../components/Collection";
import FeaturedProduct from "../../components/FeaturedProduct";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const getCategories = async () => {
      if (user && user.token) {
        setLoading(true);
        try {
          const data = await fetchProductCategories(user.token);
          setCategories(data?.payload || []);
        } catch (error) {
          setCategories([]);
          toast.error(error?.message || "Failed to fetch categories");
        } finally {
          setLoading(false);
        }
      }
    };
    getCategories();
  }, [user]);

  return (
    <MainLayout>
      <section className="w-full py-40 pt-60 flex flex-col items-center justify-center bg-[#EFEBE2] md:px-10 px-5">
        <div className="w-full flex flex-col gap-8 items-center border-b border-[rgba(36,34,34,0.15)] pb-10 mb-14">
          <h1 className="md:text-[140px] text-4xl !font-[300] text-[#242222] font-[Publicko] text-center leading-18 ">
            Products
          </h1>
        </div>

        <div className="w-full mt-12 px-5 md:px-20">
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

      <Collection />

      <FeaturedProduct />
    </MainLayout>
  );
};

export default Products;
