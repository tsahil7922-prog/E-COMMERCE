const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const { v2: cloudinary } = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();
// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  (req, res, next) => {
    console.log("UPLOAD API HIT");
    next();
  },
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        console.log("No file found in request");

        return res.status(400).json({ message: "No file uploaded" });
      }
      // function to handle the stream upload to claudinary
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
              return reject(error);
            }

            resolve(result);
          });

          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };
      // call the streamUpload function
      const result = await streamUpload(req.file.buffer);
      console.log("Cloudinary result:", result);
      // Respond with the uploaded image URL
      res.json({ imageUrl: result.secure_url });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
);

module.exports = router;
