const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/user");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();
// connect to mongoDb
mongoose.connect(process.env.MONGO_URI);

// function to seed the data
const seedData = async (req, res) => {
  try {
    // clear existing data
    await Product.deleteMany();
    await User.deleteMany();
     await Cart.deleteMany();

    // create default admin user
    const createAdminUser = await User.create({
      name: "Admin User",
      email: "tsahil7922@gmail.com",
      password: "123456",
      role: "admin",
    });
    // assign default user id to each product
    const userID = createAdminUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user:userID };
    });
    // insert the products into database
    await Product.insertMany(sampleProducts);
    console.log("Product data seeded succesfully");
    process.exit();
  } catch (err) {
    console.error("Error seeding the data", err);
    process.exit(1);
  }
};

seedData()