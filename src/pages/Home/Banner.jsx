import React from "react";
import banner from "../../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="hero my-5 min-h-96">
      <img src={banner} className="w-full h-full" alt="" />
      <div className="hero-content text-center">
        <div className="w-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-black lg:text-white uppercase font-bold">
            Welcome To Laptop Zone
          </h1>
          <p className="py-6 text-xl text-black font-bold uppercase lg:text-white">
            Laptop Zone is a resale platform. You can a beautiful laplop in chip
            price.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
