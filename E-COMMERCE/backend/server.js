require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/Db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoute = require("./routes/CartRoutes");
const checkOutRoutes = require("./routes/checkOutRoutes");
const orderRoute = require("./routes/orderRoutes");
const uploadRoute = require("./routes/uploadRoutes");
const subscriberRoute = require("./routes/subscriberRoutes");

// admin
const adminRoutes = require("./routes/adminRoutes");
const productAdmiRoute = require("./routes/productAdmoinRoutes");
const adminOrdersRoute = require("./routes/adminOrderRoutes");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// connect database
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to server");
});

// Api Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", checkOutRoutes);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api", subscriberRoute);

// admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdmiRoute);
app.use("/api/admin/orders", adminOrdersRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});