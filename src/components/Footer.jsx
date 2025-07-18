import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full bg-[#242222] px-5 py-20 flex flex-wrap items-start justify-evenly md:px-2">
        <div className="w-full md:w-1/4 flex flex-col gap-4 md:pr-16 mb-8 md:mb-0">
          <h4 className="text-base text-[#eeeeee]">High Taste Ceramics</h4>
          <p className="text-[#A8A8A8]">
            Specialize in supplying Bathroom Fittings, Tiles, Doors, and other
            materials for Kitchens and Elevators.
          </p>
        </div>
        <div className="w-full md:w-1/6 flex flex-col gap-4 mb-8 md:mb-0">
          <h4 className="text-base text-[#eeeeee]">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-[#A8A8A8] text-sm">
            <li>
              <Link href="">Home</Link>
            </li>
            <li>
              <Link href="">About Us</Link>
            </li>
            <li>
              <Link href="">Product</Link>
            </li>
            <li>
              <Link href="">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 flex flex-col gap-4 md:pr-16 mb-8 md:mb-0">
          <h4 className="text-base text-[#eeeeee]">Address</h4>
          <p className="text-[#A8A8A8] text-sm">
            High Taste Ceramics, No. 2 Opeyemisi Bamidele Str, Off Freedom Way,
            Lekki, Lagos, Nigeria 106104.
          </p>
        </div>
        <div className="w-full md:w-1/6 flex flex-col gap-4 md:pr-16">
          <h4 className="text-base text-[#eeeeee]">Contact</h4>
          <div className="flex flex-col gap-2">
            <p className="text-[#A8A8A8] text-sm">+234 909 022 2221</p>
            <p className="text-[#A8A8A8] text-sm">
              enquiry@hightasteceramics.com
            </p>
          </div>
          <div className="flex gap-2">
            <i className="ri-facebook-box-fill text-base text-[#A8A8A8]"></i>
            <i className="ri-instagram-fill text-base text-[#A8A8A8]"></i>
            <i className="ri-linkedin-box-fill text-base text-[#A8A8A8]"></i>
          </div>
        </div>
      </div>

      <div className="md:px-10 px-5 w-full bg-[#242222] text-[#A8A8A8] py-10 text-sm">
        ©{new Date().getFullYear()} High Taste Ceramics. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
