"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import MainLayout from "../../components/MainLayout";
import FeaturedProduct from "../../components/FeaturedProduct";
import toast, { Toaster } from "react-hot-toast";
import { contactUS } from "../../services/contact.service";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await contactUS(form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
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
            Get in Touch
          </h1>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row bg-[#EFEFEF] md:px-10 px-4 py-20 gap-10">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="font-[Publicko] font-[300] text-[#242222] text-3xl">
            Get in Touch
          </h1>
          <p className="text-lg text-[#242222]">
            Have questions? Our team is ready to help.
          </p>

          {/* Address */}
          <div className="flex items-center gap-4 text-[#242222]">
            <div className="bg-[#f8f8f8] p-3 rounded-full flex items-center justify-center w-10 h-10">
              <i className="ri-map-pin-line text-lg text-[#242222]"></i>
            </div>
            <p>2 Opeyemi Bamidele Street, Lekki Phase 1</p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 text-[#242222]">
            <div className="bg-[#f8f8f8] p-3 rounded-full flex items-center justify-center w-10 h-10">
              <i className="ri-phone-line text-lg text-[#242222]"></i>
            </div>
            <Link href="tel:+234816345399">+234 816 345 3995</Link>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 text-[#242222]">
            <div className="bg-[#f8f8f8] p-3 rounded-full flex items-center justify-center w-10 h-10">
              <i className="ri-mail-line text-lg text-[#242222]"></i>
            </div>
            <p>info@hightasteceramics.com</p>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-4 text-[#242222]">
            <div className="bg-[#f8f8f8] p-3 rounded-full flex items-center justify-center w-10 h-10">
              <i className="ri-whatsapp-line text-lg text-[#242222]"></i>
            </div>
            <a
              href="https://wa.me/2349090222221"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              +234 909 022 2221
            </a>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-4 text-[#242222]">
            <div className="bg-[#f8f8f8] p-3 rounded-full flex items-center justify-center w-10 h-10">
              <i className="ri-instagram-line text-lg text-[#242222]"></i>
            </div>
            <a
              href="https://instagram.com/high.taste.ceramics"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @high.taste.ceramics
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-[#F8F8F8] p-8 md:p-12 ">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <h2 className="text-2xl md:text-3xl font-[Publicko] text-[#242222] mb-4">
              Send us a message
            </h2>

            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-2 text-sm text-[#777] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#aaa] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#242222]"
              >
                Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222]"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-sm text-[#777] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#aaa] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#242222]"
              >
                Email
              </label>
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 pt-5 pb-2 rounded-lg border border-[#ccc] bg-white text-[#242222] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#242222] resize-none"
                placeholder="Your Message"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-4 top-2 text-sm text-[#777] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#aaa] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#242222]"
              >
                Message
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#242222] text-white py-3 px-6 rounded-xl hover:bg-[#3a3838] transition-all duration-200 text-base font-medium shadow-md flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
      <Toaster />
      <FeaturedProduct />
      {/* <section className="md:px-10 px-5">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.556173284495!2d3.479792175679825!3d6.450978824000454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf56e5e8ea533%3A0x6557c73794c27d93!2sHigh%20Taste%20Ceramics!5e0!3m2!1sen!2sng!4v1747438957112!5m2!1sen!2sng" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </section> */}
    </MainLayout>
  );
};

export default Contact;
