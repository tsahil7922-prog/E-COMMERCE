import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.checkout);

  // clear the cart when the order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
    } else {
      navigate("/my-order");
    }
  }, [checkout,dispatch,navigate]);

  const order = {
    orderId: "ORD123456",
    createdAt: new Date(),

    shipping: {
      name: "Ishan",
      address: "Delhi, India",
      phone: "9999999999",
    },

    payment: {
      method: "PayPal",
      status: "Paid",
    },

    shippingDetails: {
      shippingCost: 50,
      freeShippingAbove: 500,
    },

    products: [
      {
        id: 1,
        productName: "Puma Sneakers",
        price: 1200,
        color: "Black",
        size: "9",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      },
      {
        id: 2,
        productName: "Nike T-Shirt",
        price: 700,
        color: "White",
        size: "L",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      },
    ],
  };

  const subtotal = order.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingCharge =
    subtotal >= order.shippingDetails.freeShippingAbove
      ? 0
      : order.shippingDetails.shippingCost;

  const total = subtotal + shippingCharge;

  //  DELIVERY DATE

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // add 5 days more from order date

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* SUCCESS HEADER */}

        <div style={styles.successBox}>
          <div style={styles.icon}>✓</div>
          <h2 style={styles.title}>Order Confirmed</h2>

          <p style={styles.subtitle}>
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>

          <p style={styles.delivery}>
            Estimated Delivery: <b>{estimatedDelivery.toDateString()}</b>
          </p>
        </div>

        {/* ORDER INFO */}

        <div style={styles.infoGrid}>
          <div style={styles.infoBox}>
            <h4>Order ID</h4>
            <p>{order.orderId}</p>
          </div>

          <div style={styles.infoBox}>
            <h4>Order Date</h4>
            <p>{order.createdAt.toLocaleDateString()}</p>
          </div>

          <div style={styles.infoBox}>
            <h4>Payment</h4>
            <p>{order.payment.method}</p>
          </div>

          <div style={styles.infoBox}>
            <h4>Status</h4>
            <p style={{ color: "#22c55e" }}>{order.payment.status}</p>
          </div>
        </div>

        {/* SHIPPING */}

        <div style={styles.section}>
          <h3>Shipping Address</h3>

          <div style={styles.addressBox}>
            <p>{order.shipping.name}</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.phone}</p>
          </div>
        </div>

        {/* PRODUCTS */}

        <div style={styles.section}>
          <h3>Products</h3>

          {order.products.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <img
                src={product.image}
                alt={product.productName}
                style={styles.image}
              />

              <div style={styles.productInfo}>
                <h4>{product.productName}</h4>
                <p>Color: {product.color}</p>
                <p>Size: {product.size}</p>
                <p>Qty: {product.quantity}</p>
              </div>

              <div style={styles.price}>₹{product.price}</div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}

        <div style={styles.summary}>
          <h3>Order Summary</h3>

          <div style={styles.row}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div style={styles.row}>
            <span>Shipping</span>
            <span>
              {shippingCharge === 0 ? "Free 🚚" : `₹${shippingCharge}`}
            </span>
          </div>

          <div style={styles.totalRow}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* ACTION BUTTON */}

        <div style={styles.buttonArea}>
          <button style={styles.button} onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

/* ---------- STYLES ---------- */

const styles = {
  page: {
    background: "#f6f8fb",
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    width: "850px",
    background: "white",
    borderRadius: "14px",
    padding: "35px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  successBox: {
    textAlign: "center",
    marginBottom: "30px",
  },

  icon: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "#22c55e",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    margin: "0 auto 12px",
  },

  title: {
    margin: 0,
  },

  subtitle: {
    color: "#666",
    marginBottom: "8px",
  },

  delivery: {
    fontSize: "15px",
    color: "#111",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "15px",
    marginBottom: "30px",
  },

  infoBox: {
    background: "#f7f7f7",
    padding: "15px",
    borderRadius: "8px",
    fontSize: "14px",
  },

  section: {
    marginBottom: "30px",
  },

  addressBox: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "8px",
  },

  productCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "15px",
    marginTop: "12px",
  },

  image: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  productInfo: {
    flex: 1,
  },

  price: {
    fontWeight: "bold",
  },

  summary: {
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#555",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "10px",
  },

  buttonArea: {
    textAlign: "center",
    marginTop: "30px",
  },

  button: {
    background: "#111",
    color: "white",
    border: "none",
    padding: "12px 28px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },
};
