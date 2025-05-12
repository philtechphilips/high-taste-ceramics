"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="w-full md:px-25 bg-[#EFEBE2] border-b text-[#242222] !font-[500] border-[rgba(36,34,34,0.15)] py-1 px-4 flex items-center justify-end">
        <div className="flex gap-1 items-center">
          <i className="ri-phone-line text-sm"></i>
          <p className="text-sm">+14 321 456 789</p>
        </div>
      </div>

      <div className="w-full md:px-25 bg-[#EFEBE2] border-b text-[#242222] border-[rgba(36,34,34,0.15)] py-4 px-4 flex items-center justify-between">
        <Image alt="logo" width={80} height={80} src="/images/logo.png" />

        <ul className="md:flex items-center gap-8 font-normal hidden">
          <li>
            <Link href="" className="text-[#242222] font-semibold text-sm">
              Home
            </Link>
          </li>
          <li>
            <Link href="" className="text-[#242222] font-semibold text-sm">
              About Us
            </Link>
          </li>
          <li>
            <Link href="" className="text-[#242222] font-semibold text-sm">
              Products
            </Link>
          </li>
          <li>
            <Link href="" className="text-[#242222] font-semibold text-sm">
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="flex gap-4">
          <i className="ri-user-line text-xl"></i>
           <i className="ri-poker-hearts-line text-xl hidden md:flex"></i>
          <i className="ri-shopping-bag-line text-xl"></i>
          <i
            className="ri-menu-line text-xl cursor-pointer md:hidden flex"
            onClick={toggleMenu}
          ></i>
        </div>
      </div>

      <div
        className={`bg-white fixed top-0 h-screen w-full transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full md:px-25 bg-transparent border-b text-[#242222] !font-[500] border-[rgba(36,34,34,0.15)] py-1 px-4 flex items-center justify-end">
          <div className="flex gap-1 items-center">
            <i className="ri-phone-line text-sm"></i>
            <p className="text-sm">+14 321 456 789</p>
          </div>
        </div>

        <div className="w-full md:px-25 bg-transparent border-b text-[#242222] border-[rgba(36,34,34,0.15)] py-4 px-4 flex items-center justify-between">
          <Image alt="logo" width={80} height={80} src="/images/logo.png" />
          <div className="flex gap-4">
            <i className="ri-user-line text-xl"></i>
            <i className="ri-shopping-bag-line text-xl"></i>
            <i
              className="ri-close-line text-xl cursor-pointer"
              onClick={toggleMenu}
            ></i>
          </div>
        </div>

        <ul className="flex flex-col gap-8 font-normal px-5 mt-10">
          <li className="border-b py-2 border-[rgba(36,34,34,0.15)]">
            <Link href="" className="text-[#242222] font-semibold text-sm">
              Home
            </Link>
          </li>
          <li className="border-b py-2 border-[rgba(36,34,34,0.15)]">
            <Link href="" className="text-[#242222] font-semibold text-sm">
              About Us
            </Link>
          </li>
          <li className="border-b py-2 border-[rgba(36,34,34,0.15)]">
            <Link href="" className="text-[#242222] font-semibold text-sm">
              Products
            </Link>
          </li>
          <li className="border-b py-2 border-[rgba(36,34,34,0.15)]">
            <Link href="" className="text-[#242222] font-semibold text-sm">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
