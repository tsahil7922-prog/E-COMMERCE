const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("TOKEN:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("DECODED:", decoded);

      req.user = await User.findById(decoded.user.id).select("-password");

      console.log("USER:", req.user);

      next();
    } catch (err) {
      console.log("ERROR:", err.message);

      return res
        .status(401)
        .json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({
      message: "Not authorized, No token provided",
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    
    res.status(403).json({ message: "Not authorized as a admin." });
  }
};
module.exports = { protect, admin };
