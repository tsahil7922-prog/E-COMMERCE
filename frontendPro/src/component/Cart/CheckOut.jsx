import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const CheckOut = () => {
 
  const [CheckOutId, setCheckOutId] = useState(null);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const products = [
    {
      id: 1,
      productName: "Puma Graviton Sneakers",
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      details: "Comfortable sneakers with modern design",
    },
    {
      id: 2,
      productName: "Puma T-Shirt",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      details: "Soft cotton everyday wear",
    },
  ];


const subtotal = products.reduce((acc, item) => acc + item.price, 0);

const shippingCost = subtotal > 2000 ? 0 : 100; // free shipping above 2000

const total = subtotal + shippingCost;
  const handleCreateCheckOut = (e) => {
    e.preventDefault();
    setCheckOutId(123);
  };
  const handlePaymentSuccess = (details) => {
    console.log("payment success");
    navigate("/order-confirmation");
  };
  return (
    <div className="grid grid-cols-1 grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6"> CheckOut </h2>
        <form action="" onSubmit={handleCreateCheckOut}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="">
              Email
            </label>
            <input
              type="email"
              value="user"
              className="w-full p-2 border rounded"
              disabled
            />
            <h3 className="text-lg mb-4">Delivery</h3>
            <div className="mb-4 gap-4 grid grid-cols-2">
              <div>
                <label htmlFor="" className="block text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded required"
                />
              </div>

              <div>
                <label htmlFor="" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded required"
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="lock text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-col-2 gap-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                City
              </label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>

            <div>
              <label htmlFor="" className="block text-gray-700">
                PostalCode
              </label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded required"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="" className="lock text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="" className="lock text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!CheckOutId ? (
              <button className="w-full bg-black text-white py-3 rounded ">
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4 "> Pay with Paypal</h3>
                {/* Paypal Component */}
                <PayPalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed. Try again later")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right section */}
    <div className="bg-gray-50 p-6 rounded-lg">
  <h3 className="text-lg mb-4">Order Summary</h3>

  {products.map((item) => (
    <div key={item.id} className="flex items-center gap-4 border-b pb-4 mb-4">

      <img
        src={item.image}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded"
      />

      <div className="flex-1">
        <h4 className="font-semibold">{item.productName}</h4>
        <p className="text-sm text-gray-500">{item.details}</p>
      </div>

      <p className="font-semibold">₹{item.price}</p>
    </div>
  ))}

  {/* Price Breakdown */}

  <div className="space-y-2 text-sm">

    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>₹{subtotal}</span>
    </div>

    <div className="flex justify-between">
      <span>Shipping</span>
      <span>
        {shippingCost === 0 ? (
          <span className="text-green-600 font-medium">Free</span>
        ) : (
          `₹${shippingCost}`
        )}
      </span>
    </div>

    <div className="border-t pt-2 flex justify-between text-lg font-semibold">
      <span>Total</span>
      <span>₹{total}</span>
    </div>

  </div>
</div>
    </div>
  );
};

export default CheckOut;
