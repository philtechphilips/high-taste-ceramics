"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState({
    backgroundColor: "#EFEBE2",
    color: "#242222",
    borderBottomColor: "rgba(36,34,34,0.15)",
  });
  const [logoSrc, setLogoSrc] = useState("/logo.png");
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let newStyle = {
        backgroundColor: "#EFEBE2",
        color: "#242222",
        borderBottomColor: "rgba(36,34,34,0.15)",
      };
      let newLogoSrc = "/logo.png";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          const bgColor = window.getComputedStyle(section).backgroundColor;
          const isDark = isDarkColor(bgColor);
          newStyle = {
            backgroundColor: bgColor,
            color: isDark ? "#FFFFFF" : "#242222",
            borderBottomColor: isDark
              ? "rgba(255,255,255,0.3)"
              : "rgba(36,34,34,0.15)",
          };
          newLogoSrc = isDark ? "/logo white.png" : "/logo.png";
        }
      });

      setNavbarStyle(newStyle);
      setLogoSrc(newLogoSrc);
    };

    const isDarkColor = (color) => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return false;
      const [r, g, b] = rgb.map(Number);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="w-full md:px-25 border-b !font-[500] py-1 px-4 flex items-center justify-end fixed top-0 z-50"
        style={navbarStyle}
      >
        <div className="flex gap-1 items-center">
          <i className="ri-phone-line text-sm"></i>
          <p className="text-sm">+14 321 456 789</p>
        </div>
      </div>

      <div
        className="w-full md:px-25 border-b py-4 px-4 flex items-center justify-between fixed top-[29px] z-50"
        style={navbarStyle}
      >
        <Image alt="logo" width={80} height={80} src={logoSrc} />

        <ul className="md:flex items-center gap-12 font-normal hidden">
          {[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about-us" },
            { name: "Products", href: "/products" },
            { name: "Blogs", href: "/blogs" },
            { name: "Contact Us", href: "/contact-us" },
          ].map(({ name, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative font-semibold text-sm pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:transition-all after:duration-300 ${
                  pathname === href
                    ? "after:bg-current"
                    : "after:w-0 after:bg-transparent hover:after:w-full hover:after:bg-current"
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
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
        className="w-full md:px-25 border-b py-4 px-4 md:flex hidden items-center justify-between fixed top-[113px] z-50"
        style={navbarStyle}
      >
        <ul className="md:flex items-center justify-between w-full font-normal hidden">
             {[
            { name: "New Arrival", href: "/" },
            { name: "Tiles", href: "/" },
            { name: "Sanitary Ware", href: "/" },
            { name: "Bathroom Fittings", href: "/" },
            { name: "Bathroom Furniture", href: "/" },
            { name: "Bathtubs & Jacuzzi", href: "/" },
            { name: "Kitchen Design", href: "/" },
            
          ].map(({ name, href }) => (
          <li>
            <Link href="" className="font-semibold text-sm">
             {name}
            </Link>
          </li>
          ))}
        </ul>
      </div>

      <div
        className={`bg-white fixed top-0 h-screen z-100 w-full transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full md:px-25 bg-transparent border-b border-[rgba(36,34,34,0.15)] text-[#242222] !font-[500] py-1 px-4 flex items-center justify-end fixed top-0 z-50">
          <div className="flex gap-1 items-center">
            <i className="ri-phone-line text-sm"></i>
            <p className="text-sm">+14 321 456 789</p>
          </div>
        </div>

        <div className="w-full md:px-25 bg-transparent border-b border-[rgba(36,34,34,0.15)] text-[#242222] !py-4 mt-6 px-4 flex items-center justify-between">
          <Image alt="logo" width={80} height={80} src={logoSrc} />
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
            <Link href="/" className="font-semibold text-sm">
              Home
            </Link>
          </li>
          <li className="border-b py-2 border-[rgba(36,34,34,0.15)]">
            <Link href="about-us" className="font-semibold text-sm">
              About Us
            </Link>
          </li>
          <li className="border-b py-2 border-[rgba(36,34,34,0.15)]">
            <Link href="/products" className="font-semibold text-sm">
              Products
            </Link>
          </li>
          <li className="border-b py-2 border-[rgba(36,34,34,0.15)]">
            <Link href="/blogs" className="font-semibold text-sm">
              Blogs
            </Link>
          </li>
          <li className="border-b py-2 border-[rgba(36,34,34,0.15)]">
            <Link href="/contact-us" className="font-semibold text-sm">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
