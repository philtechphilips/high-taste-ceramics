"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import MainLayout from "../../components/MainLayout";
import FeaturedProduct from "../../components/FeaturedProduct";
import { getPublishedBlogs } from "../../services/blog.service";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getPublishedBlogs();
        setBlogs(response.payload || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

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

        {loading && (
          <div className="w-full flex justify-center items-center py-20">
            <div className="text-[#242222] text-lg">Loading blogs...</div>
          </div>
        )}

        {error && (
          <div className="w-full flex justify-center items-center py-20">
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="w-full flex justify-center items-center py-20">
            <div className="text-[#242222] text-lg">
              No blogs available yet.
            </div>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-x-12 md:gap-y-24 gap-y-12 mt-20">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="overflow-hidden group relative cursor-pointer"
              >
                <div className="relative h-100 overflow-hidden">
                  <Image
                    src={
                      blog.featured_image ||
                      "/NYC Lobby - Terrazzo Flooring.jpeg"
                    }
                    alt={blog.title}
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
                <p className="relative mt-4 text-left text-[#242222] text-sm">
                  {formatDate(blog.published_at)}
                </p>
                <p className="relative mt-1 text-left text-lg text-[#242222] font-[Publicko]">
                  {blog.author || "Unknown Author"}
                </p>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="relative mt-1 text-left text-[#242222] block hover:text-[#666] transition-colors duration-300"
                >
                  {truncateText(blog.title, 80)}
                </Link>
                {blog.excerpt && (
                  <p className="relative mt-2 text-left text-[#666] text-sm">
                    {truncateText(blog.excerpt, 120)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <FeaturedProduct />
    </MainLayout>
  );
};

export default Blogs;
