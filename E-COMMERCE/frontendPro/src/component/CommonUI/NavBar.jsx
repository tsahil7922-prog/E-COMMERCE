import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  HiOutlineUsers,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
  HiShoppingBag,
} from "react-icons/hi2";
import SearchBarUI from "./SearchBarUI";
import CardDrawer from "../Layout/CardDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
const NavBar = () => {
  // both for card drawer component
  const [cardOpen, setCardOpen] = useState(false);
  const [navBarOpen, setNavBarOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const cartItemCount =
    cart?.products.reduce((total, product) => total + product.quantity, 0) || 0;
  const toggleCardDrawer = () => {
    setCardOpen(!cardOpen);
  };

  const toggleNavBarDrawer = () => {
    setNavBarOpen(!navBarOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        {/* center navigation Links*/}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/collection/all?gender=Men"
            className="text-gray-700 hover:text-bl text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="/collection/all?gender=Women"
            className="text-gray-700 hover:text-bl text-sm font-medium uppercase"
          >
            Women
          </Link>

          <Link
            to="/collection/all?category=Top Wear"
            className="text-gray-700 hover:text-bl text-sm font-medium uppercase"
          >
            tOP WEAR
          </Link>
          <Link
            to="/collection/all?category=Bottom Wear"
            className="text-gray-700 hover:text-bl text-sm font-medium uppercase"
          >
            Bottom wear
          </Link>
        </div>

        {/* Right Side */}
        <div className="items-center flex gap-4">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="block bg-black rounded text-sm text-white px-2"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black">
            <HiOutlineUsers className="text-gray-700 h-6 w-6" />
          </Link>
          <button
            onClick={toggleCardDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="text-gray-700 h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Search */}
          <div className="overflow-hidden">
            {" "}
            <SearchBarUI />
          </div>
          <button onClick={toggleNavBarDrawer} className="md:hidden">
            <HiBars3BottomRight className="text-gray-700 h-6 w-6" />
          </button>
        </div>
      </nav>
      <CardDrawer
        toggleCardDrawer={toggleCardDrawer}
        setCardOpen={setCardOpen}
        cardOpen={cardOpen}
      />
      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navBarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavBarDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collection/all?gender=Men"
              onClick={toggleNavBarDrawer}
              className="text-gray-600 block hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/collection/all?gender=Women"
              onClick={toggleNavBarDrawer}
              className="text-gray-600 block hover:text-black"
            >
              Top Wear
            </Link>

            <Link
              to="/collection/all?category=Top Wear"
              onClick={toggleNavBarDrawer}
              className="text-gray-600 block hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collection/all?category=Bottom Wear"
              onClick={toggleNavBarDrawer}
              className="text-gray-600 block hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
