"use client";

import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

const BrandBand = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className={`bg-white ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} py-8 overflow-hidden"`}>
      <h2 className="text-center text-lg font-semibold mb-4">
        More than 2.2 million companies worldwide already trust us
      </h2>
      <Marquee gradient={false} speed={50}>
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="Ruggable" className="h-12 inline-block mx-4" />
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="Canva" className="h-12 inline-block mx-4" />
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="Grammarly" className="h-12 inline-block mx-4" />
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="Okta" className="h-12 inline-block mx-4" />
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="Lyft" className="h-12 inline-block mx-4" />
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="Sysco" className="h-12 inline-block mx-4" />
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="Lululemon" className="h-12 inline-block mx-4" />
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="Casper" className="h-12 inline-block mx-4" />
        <img src="https://res.cloudinary.com/zapier-media/image/upload/v1705948449/Homepage%20ZAP%20Jan%2024/Vector_jnrowo.svg" alt="HelloFresh" className="h-12 inline-block mx-4" />
      </Marquee>
    </div>
  );
};

export default BrandBand;