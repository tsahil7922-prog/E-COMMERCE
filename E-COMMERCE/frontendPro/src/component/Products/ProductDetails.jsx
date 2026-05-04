import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";
const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products,
  );
  const { user, guestId } = useSelector((state) => state.auth);
  // const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  console.log(selectedProduct, "product image");
  const fetchProductId = productId || id;
  useEffect(() => {
    if (fetchProductId) {
      dispatch(fetchProductDetails(fetchProductId));
      dispatch(fetchSimilarProducts({ id: fetchProductId }));
    }
  }, [dispatch, fetchProductId]);

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  // Derive the displayed image — falls back to first image automatically
  const mainImage =
    selectedImageUrl &&
    selectedProduct?.images?.some((img) => img.url === selectedImageUrl)
      ? selectedImageUrl
      : selectedProduct?.images?.[0]?.url || "";

  const handleQuantityChange = (action) => {
    if (action == "plus") setQuantity((prev) => prev + 1);
    if (action == "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };
  const handleAddToCart = () => {
    if (!selectColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisable(true);

    // Success message
    dispatch(
      addToCart({
        productId: fetchProductId,
        quantity,
        size: selectedSize,
        color: selectColor,
        guestId,
        userId: user?._id,
      }),
    )
      .then(() => {
        toast.success("Product add to cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisable(false);
      });
  };

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }
  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="bg-white max-w-6xl mx-auto p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left THumbNail */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img?.url}
                  alt={img?.altText || `Thumbnail${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === img?.url ? "border-black" : "border-gray-300"}`}
                  onClick={() => setSelectedImageUrl(img?.url)}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
              {selectedProduct?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img?.url}
                  alt={img?.altText || `Thumbnail${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === img?.url ? "border-black" : "border-gray-300"}`}
                  onClick={() => setSelectedImageUrl(img?.url)}
                />
              ))}
            </div>
            {/* Right Section */}
            <div className="md:w-1/2 md:ml-10 ">
              <h1 className=" text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct?.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {selectedProduct?.discountPrice &&
                  `$${selectedProduct.discountPrice}`}
              </p>
              <p className="text-xl text-gray-600 mb-2">
                ${selectedProduct?.price}
              </p>
              <p className="text-gray-600 mb-4">
                {selectedProduct?.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.colors.map((color) => (
                    <button
                      className={`w-8 h-8 rounded-full border ${selectColor === color ? "border-2 border-black" : "border-gray-300"}`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                      onClick={() => setSelectedColor(color)}
                      key={color}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.sizes.map((size, i) => (
                    <button
                      onClick={() => setSelectedSize(size)}
                      key={i}
                      className={`px-4 py-2 rounded border ${selectedSize === size ? " bg-black text-white" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 ">
                <p className="text-gray-700">Quantity:</p>{" "}
                <div className="mt-2 flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="bg-gray-200 text-lg rounded px-2 py-1"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="bg-gray-200 text-lg rounded px-2 py-1"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                disabled={isButtonDisable}
                onClick={handleAddToCart}
                className={`bg-black text-white py-2  rounded w-full px-6 mb-4 uppercase ${isButtonDisable ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}
              >
                {isButtonDisable ? "Adding..." : "Add to cart"}
              </button>
              <div className="mt-10 text-gray-700">
                <h3 className="font-bold mb-4 text-xl">Characterstics:</h3>
                <table className="text-left text-sm text-gray-600 w-full">
                  <tbody>
                    <tr>
                      <td className="py-1"> Brand</td>
                      <td className="py-1">{selectedProduct?.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1"> Material</td>
                      <td className="py-1">{selectedProduct?.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
            </h2>

            <ProductGrid product={similarProducts} loading={loading} error={error}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
