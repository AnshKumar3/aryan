"use client";

import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import BlackRectangle from "./BlackRectangle";
import { Switch } from "@headlessui/react";
// import NavIcons from "./NavIcons";

const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsLogoVisible(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  };

  return (
    <div className={`sticky top-0 z-50 shadow-md ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        {/* MOBILE */}
        <div className="h-full flex items-center justify-between md:hidden">
          <Link href="/">
            <div className="text-2xl tracking-wide">Aryan's Collection</div>
          </Link>
          <Menu />
        </div>
        {/* BIGGER SCREENS */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
          {/* LEFT */}
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/no.png"
                alt=""
                width={180}
                height={180}
                className={`fixed  left-4 transition-opacity z-[10000] duration-300 ${
                  isLogoVisible ? "opacity-100" : "opacity-0"
                } ${isDarkMode ? "invert" : ""}`}
              />
              <div className="text-2xl tracking-wide">Aryan's Collection</div>
            </Link>
            <div className="hidden xl:flex gap-4">
              <Link href="/">Homepage</Link>
              <Link href="/">Shop</Link>
              <Link href="/">Deals</Link>
              <Link href="/">About</Link>
              <Link href="/">Contact</Link>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
            <SearchBar />
            <Switch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              className={`${
                isDarkMode ? "bg-gray-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <NavIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
