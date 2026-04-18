import React, { useState } from "react";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countIngStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/200/300?random=1",
      },
      {
        url: "https://picsum.photos/200/300?random=1",
      },
    ],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(() => ({
      ...productData,
      [name]: value,
    }));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };
  return (
    <div className="max-w-5xl mx-auto p-6 shadow:md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Products</h2>
      <form action="" onSubmit={handleSubmit}>
        {/* name */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            className="w-full border rounded p-2 border-gray-300"
            name="name"
            value={productData?.name}
            onChange={handleChange}
          />
        </div>
        {/* description */}
        <div className="mb-6">
          <label htmlFor="" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={productData?.description}
            className="w-full border border-gray-300 rounded-md p-2"
            id=""
            rows={4}
            required
            onChange={handleChange}
          ></textarea>
          {/* price input */}
          <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              className="w-full border rounded p-2 border-gray-300"
              name="price"
              value={productData?.price}
              onChange={handleChange}
            />
          </div>

          {/* count in stack */}
          <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">
              Counting Stock
            </label>
            <input
              type="number"
              className="w-full border rounded p-2 border-gray-300"
              name="countInStock"
              value={productData?.countIngStock}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">
              SKU
            </label>
            <input
              type="text"
              className="w-full border rounded p-2 border-gray-300"
              name="sku"
              value={productData?.sku}
              onChange={handleChange}
            />
          </div>
          {/* sizes */}
          <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">
              Sizes (comma-seprated)
            </label>
            <input
              type="text"
              className="w-full border rounded p-2 border-gray-300"
              name="sizes"
              value={productData?.sizes.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  sizes: e.target.value.split(",").map((size) => size.trim()),
                })
              }
            />
          </div>

          {/* color */}
          <div className="mb-6">
            <label htmlFor="" className="block font-semibold mb-2">
              Colors (comma-seprated)
            </label>
            <input
              type="text"
              className="w-full border rounded p-2 border-gray-300"
              name="colors"
              value={productData?.colors.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  colors: e.target.value
                    .split(",")
                    .map((color) => color.trim()),
                })
              }
            />

            {/* image upload */}
            <div className="mb-6">
              <label htmlFor="" className="block font-semibold mb-2">
                Upload Image
              </label>
              <input type="file" onChange={handleImageUpload} />
              <div className="flex gap-4 mt-4">
                {productData.images.map((image, index) => (
                  <div className="" key={index}>
                    <img
                      src={image.url}
                      alt={image.allText || "Product Image"}
                      className="w-20 h-20 object-cover rounded-md shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
