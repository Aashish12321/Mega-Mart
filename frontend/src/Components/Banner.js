import React, { useEffect, useState } from "react";
import img2 from "../Assets/banner/img2.webp";
import img3 from "../Assets/banner/img3.jpg";
import img4 from "../Assets/banner/img4.jpg";
import img2_mobile from "../Assets/banner/img2_mobile.webp";
import img3_mobile from "../Assets/banner/img3_mobile.jpg";
import img4_mobile from "../Assets/banner/img4_mobile.jpg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Banner = () => {
  const banners = [img2, img3, img4];
  const mobilebanners = [img2_mobile, img3_mobile, img4_mobile];
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(
        (previousBanner) => (previousBanner + 1) % banners.length
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="w-full relative overflow-hidden cursor-pointer">
      <div
        style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        className="flex transition-transform duration-700"
      >
        {window.innerWidth < 768 &&
          mobilebanners.map((banner, index) => (
            <img key={index} src={banner} alt={`Banner ${index}.jpg`} />
          ))}

        {window.innerWidth >= 768 &&
          banners.map((banner, index) => (
            <img key={index} src={banner} alt={`Banner ${index}.jpg`} />
          ))}
      </div>

      <button
        onClick={() =>
          setCurrentBanner(
            (prevBanner) => (prevBanner - 1 + banners.length) % banners.length
          )
        }
        className="absolute text-white text-4xl top-24 md:top-28 rounded-full bg-zinc-800"
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        onClick={() =>
          setCurrentBanner(
            (prevBanner) => (prevBanner + 1 + banners.length) % banners.length
          )
        }
        className="absolute text-white text-4xl right-0.5 top-24 md:top-28 rounded-full bg-zinc-800"
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default Banner;
