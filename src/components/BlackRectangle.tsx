import { useEffect, useState } from "react";

const BlackRectangle = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-20 z-[9999] left-0 h-10 w-64 bg-black transition-transform duration-500 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    ></div>
  );
};

export default BlackRectangle;