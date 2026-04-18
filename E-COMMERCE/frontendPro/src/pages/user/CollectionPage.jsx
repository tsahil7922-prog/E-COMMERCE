import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../../component/Products/FilterSideBar";
import SortOption from "../../component/Products/SortOption";
import ProductGrid from "../../component/Products/ProductGrid";
const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sideBarRef = useRef(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handleClickOutSide = () => {
    // closeSide if click outside
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setSideBarOpen(false);
    } // agr vo event ((e.target)) sidebar ka nhi h then close it
  };

  useEffect(() => {
    // add event listenr for click
    document.addEventListener("mousedown", handleClickOutSide);
    // clean event listener
    return ()=>{document.removeEventListener("mousedown", handleClickOutSide)}
  },[]);

  useEffect(() => {
    setTimeout(() => {
      const fetchProduct = [
        {
          _id: 1,
          name: "Product 1",
          price: "200",
          image: [{ url: "https://picsum.photos/200/300?random=10" }],
        },
        {
          _id: 2,
          name: "Product 2",
          price: "200",
          image: [{ url: "https://picsum.photos/200/300?random=20" }],
        },
        {
          _id: 3,
          name: "Product 3",
          price: "100",
          image: [{ url: "https://picsum.photos/200/300?random=30" }],
        },
        {
          _id: 4,
          name: "Product 4",
          price: "20",
          image: [{ url: "https://picsum.photos/200/300?random=40" }],
        },
        {
          _id: 5,
          name: "Product 5",
          price: "2030",
          image: [{ url: "https://picsum.photos/500/600?random=50" }],
        },
           {
          _id: 6,
          name: "Product 6",
          price: "210",
          image: [{ url: "https://picsum.photos/200/300?random=90" }],
        },
        {
          _id: 7,
          name: "Product 7",
          price: "30",
          image: [{ url: "https://picsum.photos/500/600?random=80" }],
        },
      ];
      setProducts(fetchProduct);
    }, 1000);
  });
  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobiile filter buton */}
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center item-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* filter sidebar */}
      <div
        ref={sideBarRef}
        className={`${sideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSideBar />
      </div>
      <div className="flex-grow p-4 ">
        <h4 className="text-2xl uppercase mb-4 "> All Collection</h4>
        {/* sort option */}
        
            <SortOption/>
       {/* product grid */}
       <ProductGrid product={products}/>
      </div>
    </div>
  );
};

export default CollectionPage;
