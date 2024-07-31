const express = require("express");
const router = express.Router();
const multer = require("multer");
const Image = require("../models/Image");
const path = require("path");
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an image by ID
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload a new image
router.post("/", async (req, res) => {
  const { title, image } = req.body;

  const newImage = new Image({
    title: title,
    imagePath: image, // directly store the base64 string
    comments: [],
  });

  try {
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an image
// Delete an image by ID
router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await Image.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment to an image
router.post("/:id/comments", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (image == null) {
      return res.status(404).json({ message: "Image not found" });
    }
    image.comments.push(req.body.comment);
    await image.save();
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Delete a comment from an image
router.delete("/:id/comments/:commentIndex", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Remove the comment by index
    image.comments.splice(req.params.commentIndex, 1);
    await image.save();

    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
