import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../../component/Products/FilterSideBar";
import SortOption from "../../component/Products/SortOption";
import ProductGrid from "../../component/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../../redux/slices/productSlice";
const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  // const [products, setProducts] = useState([]);
  const queryParams = Object.fromEntries([...searchParams]);

  const sideBarRef = useRef(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  useEffect(() => {
    dispatch(fetchProductByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const handleClickOutSide = (e) => {
    // closeSide if click outside
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setSideBarOpen(false);
    } // agr vo event ((e.target)) sidebar ka nhi h then close it
  };

  useEffect(() => {
    // add event listenr for click
    document.addEventListener("mousedown", handleClickOutSide);
    // clean event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

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

        <SortOption />
        {/* product grid */}
        <ProductGrid product={products} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default CollectionPage;
