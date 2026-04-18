import React from "react";
import { Link } from "react-router-dom";
import Featured from "../../assets/Featured.webp"
const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex  flex-col-reverse lg:flex-row item-center bg-green-50 rounded-3xl">
        {/* Left content */}
        <div className="lg:w-1/2 p-8 text-center  lg:text-left ">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort & Style
          </h2>
          <h2 className="font-bold mb-6 text-4xl lg:text-5xl font-bold">
            Apparel made for everyday life
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </p>
          <Link
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
            to="/collections/all"
          >
            Shop Now
          </Link>
        </div>
        {/* Right content */}
        <div className="lg:w-1/2 ">
        <img src={Featured} className="object-cover h-full w-full lg:rounded-tr-3xl lg:rounded-br-3xl" alt="featured collection" /></div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
