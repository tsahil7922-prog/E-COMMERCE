const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")
// 1) Post for user registration
// 2) register new user
// 3) access public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Registration logic
    // res.send({ name, email, password });
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ email, name, password });
    await user.save();

    // res.status(201).json({
    //     user:{
    //         _id:user._id,
    //         name:user.name,
    //         email:user.email,
    //         role:user.role,
    //     }
    // })
    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //   sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Login
// 1) route post /api/users/login
// 2) desc authenticate user
// 3)  @access public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isMatched = await user.matchPassword(password);
    if (!isMatched)
      return res.status(400).json({ message: "Invalid Credentials" });

    const payload = { user: { id: user._id, role: user.role } };

    //   sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
});



// User Profile
// 1) route get /api/users/profile
// 2) desc . get the login user profile
// access private
router.get("/profile",protect,async(req,res)=>{
res.json(req.user)
})
module.exports = router;
