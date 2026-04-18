import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";
const Hero = () => {
  return (
    <section className="relative ">
      <img
        src={heroImg}
        alt=""
        className="h-[400px] w-full md:h-[600px] lg:h[750px] object-cover "
      />

      <div className="absolute inset-0  bg-opacity-5 flex items-center justify-center">
        <div className="text-center p-6 text-white">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter mb-4 uppercase">
            Vacation <br />
            Ready
          </h1>
          <p className="mb-6 text-sm tracking-tighter  md:text-lg  ">
            Explore our vacation-ready its with fast worldwide shipping.
          </p>
          <Link to="#" className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg">Shop Now</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
