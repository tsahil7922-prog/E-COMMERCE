import React, { useEffect, useState } from "react";
import Hero from "../../component/Layout/Hero";
import GenderCollectionSection from "../../component/Products/GenderCollectionSection";
import NewArrival from "../../component/Products/NewArrival";
import ProductDetails from "../../component/Products/ProductDetails";
import ProductGrid from "../../component/Products/ProductGrid";
import FeaturedCollection from "../../component/Products/FeaturedCollection";
import FeaturedSection from "../../component/Products/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../../redux/slices/productSlice";
import axios from "axios";

// const placeHoldeProducts =[
//     {
//       _id: 1,
//       name: "Product 1",
//       price: "200",
//       image: [{ url: "https://picsum.photos/200/300?random=1" }],
//     },
//     {
//       _id: 1,
//       name: "Product 2",
//       price: "200",
//       image: [{ url: "https://picsum.photos/200/300?random=2" }],
//     },
//     {
//       _id: 3,
//       name: "Product 3",
//       price: "100",
//       image: [{ url: "https://picsum.photos/200/300?random=3" }],
//     },
//     {
//       _id: 4,
//       name: "Product 4",
//       price: "20",
//       image: [{ url: "https://picsum.photos/200/300?random=4" }],
//     },
//     {
//       _id: 5,
//       name: "Product 5",
//       price: "2030",
//       image: [{ url: "https://picsum.photos/200/300?random=5" }],
//     },
//   ];
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  useEffect(() => {
    // fetch the products for specific collection
    dispatch(
      fetchProductByFilters({
        gender: "",
        category: "",
        limit: 8,
      }),
    );
    // fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response =await  axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
        );
        setBestSellerProduct(response?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />
      {/* Best Seller Section */}
      <h2 className="text-center text-3xl mb-4 font-bold">Best Seller </h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">loading best seller product....</p>
      )}

      <div className="container mx-auto">
        <h2 className="font-bold mb-4 text-3xl text-center">
          {" "}
          Top Wears For Women
        </h2>
        <ProductGrid product={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
