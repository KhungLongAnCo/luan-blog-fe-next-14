"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "@/assets/svgs";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button
        onClick={handleScrollToTop}
        className="z-50 cursor-pointer opacity-50 fixed bottom-5 right-5 p-3 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {/* <Image src={ArrowUp} alt="ArrowUp" /> */}
        <ArrowUp />
      </button>
    )
  );
};
