import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const NewArrival = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollableRight, setCanScrollableRight] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?sortBy=title&order=asc",
      );
      const updated = response?.data?.products.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setProducts(updated);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hnadleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };
  // for left right from icons
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScroll =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollableRight(rightScroll);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }

    return () => {
      // if (container) {
      container.removeEventListener("scroll", updateScrollButtons);
      // }
    };
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      updateScrollButtons();
    }
  }, [products]);
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto relative text-center mb-10">
        <h2 className="mb-4 text-3xl  font-bold">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your warddrobe on the cutting edge of fashion
        </p>
        {/* scroll buttons  */}
        <div className="absolute -right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2  rounded border ${canScrollLeft ? "bg-white text-black hover:bg-black hover:text-white active:scale-95 transition-all duration-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2  rounded border ${canScrollableRight ? "bg-white text-black hover:bg-black hover:text-white active:scale-95 transition-all duration-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className={`container mx-auto flex overflow-x-auto space-x-6 relative scroll-smooth 
no-scrollbar  ${isDragging ? "cursor-grabbing" : "cursor-grab"} `}
        onMouseDown={hnadleMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {products.map((item) => (
          <div
            key={item.id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-[350px] object-cover rounded-lg"
              draggable="false"
            />
            <div
              className="absolute bottom-0 left-0 right-0 
bg-black/60 backdrop-blur-sm 
text-white p-4 rounded-b-lg"
            >
              {" "}
              <Link to={`/product/${item.id}`} className="block">
                <h4 className="font-medium">{item?.title}</h4>
              </Link>
              <p className="mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrival;
