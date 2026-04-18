import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";

const CardDrawer = ({ toggleCardDrawer, setCardOpen, cardOpen }) => {
  const navigate = useNavigate();
  const handleCheckOut = () => {
    toggleCardDrawer()
    navigate("/checkout");
  };
  return (
    <div 
      className={`fixed top-0 right-0 w-3/4 sm:w-1/4 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${cardOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* close button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCardDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* Card content for scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 ">Your Cart</h2>
        {/* component for card contents */}
        <CartContent cardOpen={cardOpen} />
      </div>
      {/* checkout button fixed at the bottom */}
      <div className="p-4 bg-white sticky bottom-0">
        <button
          onClick={handleCheckOut}
          className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
        >
          CheckOut
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping,taxes, and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CardDrawer;
