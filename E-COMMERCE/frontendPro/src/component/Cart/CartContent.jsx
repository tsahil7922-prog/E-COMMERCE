import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDispatch, } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CartContent = ({ userId, guestId, cart }) => {
  const dispatch = useDispatch();

  // const { cart } = useSelector((state) => state.cart);
  const products = cart?.products || [];

  const increaseQty = (item) => {
    dispatch(
      updateCartItemQuantity({
        productId: item.productId || item._id,
        quantity: item.quantity + 1,
        size: item.size,
        color: item.color,
        userId,
        guestId,
      }),
    );
  };

  const decreaseQty = (item) => {
    if (item.quantity <= 1) return;

    dispatch(
      updateCartItemQuantity({
        productId: item.productId || item._id,
        quantity: item.quantity - 1,
        size: item.size,
        color: item.color,
        userId,
        guestId,
      }),
    );
  };

  const removeItem = (item) => {
    dispatch(
      removeFromCart({
        productId: item.productId || item._id,
        size: item.size,
        color: item.color,
        userId,
        guestId,
      }),
    );
  };

  return (
    <div className="space-y-5">
      {products.length > 0 ? (
        products.map((item) => (
          <div key={item._id} className="flex gap-4 border-b pb-4">
            <img
              src={item?.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.title}</h3>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => decreaseQty(item)}
                  className="w-6 h-6 border rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item)}
                  className="w-6 h-6 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="font-semibold text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button onClick={() => removeItem(item)}>
                <HiOutlineTrash className="text-red-500" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};

export default CartContent;
