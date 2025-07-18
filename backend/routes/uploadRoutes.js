import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../utils/cloudinary.js'
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Store', 
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'heic'],
    public_id: (req, file) => `img-${Date.now()}`,
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(401).send({ message: err.message });
    } else if (req.file) {
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        imageUrl: req.file.path, 
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
