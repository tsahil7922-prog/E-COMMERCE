import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi2";

const CartContent = ({ cardOpen }) => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/carts");
      const carts = response?.data?.carts;

      // 🔥 Get ALL products from ALL carts
      //       map() → array ke andar array bana deta

      // flatMap() → array ke andar ke arrays ko merge kar deta
      const allProducts = carts.flatMap((cart) => cart.products);

      const updated = allProducts.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setProducts(updated);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cardOpen]);

  // Increase quantity
  const increaseQty = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // 🔥 Decrease quantity
  const decreaseQty = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // 🔥 Delete item
  const removeItem = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };
  // console.log(products)/
  return (
    <div className="space-y-5">
      {products.map((item) => (
        <div key={item.id} className="flex gap-4 border-b pb-4">
          {/* Image */}
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-20 object-cover rounded"
          />

          {/* Details */}
          <div className="flex-1">
            <h3 className="text-sm font-medium">{item.title}</h3>

            {/* Quantity */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="w-6 h-6 flex items-center justify-center border rounded text-sm"
              >
                -
              </button>

              <span className="text-sm w-5 text-center">{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="w-6 h-6 flex items-center justify-center border rounded text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-end gap-2">
            <p className="font-semibold text-sm">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
