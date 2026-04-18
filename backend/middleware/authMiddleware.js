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
      // 1️⃣ Get token
      token = req.headers.authorization.split(" ")[1]; //"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."split these 2

      // 2️⃣ Verify token(format uska shi h ki nhi)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Get user from DB
      req.user = await User.findById(decoded.user.id).select("-password"); //exclude password

      // 4️⃣ Move to next middleware / route
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
    // ❌ No token
  } else {
    res.status(401).json({ message: "Not authorized, No token provided" });
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
