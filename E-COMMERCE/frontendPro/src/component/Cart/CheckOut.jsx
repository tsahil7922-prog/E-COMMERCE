import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkOutSlice";
import axios from "axios";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cart, loading, error } = useSelector((state) => state.cart);

  // redirect if cart empty
  useEffect(() => {
    if (!cart?.products?.length) {
      navigate("/");
    }
  }, [cart, navigate]);

  const [checkoutId, setCheckoutId] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // ✅ FIXED subtotal
  const subtotal = cart?.totalPrice || 0;

  const shippingCost = subtotal > 2000 ? 0 : 100;
  const total = subtotal + shippingCost;

  // ✅ FIXED async dispatch
  const handleCreateCheckOut = (e) => {
    e.preventDefault();

    if (!cart?.products?.length) return;

    dispatch(
      createCheckout({
        checkOutItems: cart.products,
        shippingAddress,
        paymentMethod: "Paypal",
        totalPrice: total,
      }),
    )
      .unwrap()
      .then((res) => {
        setCheckoutId(res._id);
      })
      .catch((err) => console.error(err));
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        await handleFinalizeCheckout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalizeCheckout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userToken"));

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

     navigate("/order-confirmation");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading Cart....</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart?.products?.length) {
    return <p>Your cart is empty... fill it</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* LEFT SECTION */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        <form onSubmit={handleCreateCheckOut}>
          <h3 className="text-lg mb-4">Contact Details</h3>

          <input
            type="email"
            value={user?.email || ""}
            className="w-full p-2 border rounded mb-4"
            disabled
          />

          <h3 className="text-lg mb-4">Delivery</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              required
              placeholder="First Name"
              value={shippingAddress.firstName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  firstName: e.target.value,
                })
              }
              className="p-2 border rounded"
            />

            <input
              required
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  lastName: e.target.value,
                })
              }
              className="p-2 border rounded"
            />
          </div>

          <input
            required
            placeholder="Address"
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
            className="w-full p-2 border rounded mb-4"
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              required
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              className="p-2 border rounded"
            />

            <input
              required
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postalCode: e.target.value,
                })
              }
              className="p-2 border rounded"
            />
          </div>

          <input
            required
            placeholder="Country"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
            className="w-full p-2 border rounded mb-4"
          />

          <input
            required
            type="tel"
            placeholder="Phone"
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className="w-full p-2 border rounded mb-4"
          />

          {!checkoutId ? (
            <button className="w-full bg-black text-white py-3 rounded">
              Continue to Payment
            </button>
          ) : (
            <div>
              <h3 className="text-lg mb-4">Pay with PayPal</h3>
              <PayPalButton
                amount={total}
                onSuccess={handlePaymentSuccess}
                onError={() => alert("Payment failed")}
              />
            </div>
          )}
        </form>
      </div>

      {/* RIGHT SECTION */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>

        {cart.products.map((item) => (
          <div key={item._id} className="flex gap-4 border-b pb-4 mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h4 className="font-semibold">{item.name}</h4>
            </div>

            <p className="font-semibold">₹{item.price}</p>
          </div>
        ))}

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
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
