import express from 'express'
import multer from 'multer'
const router = express.Router()

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import sharp from 'sharp'


// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: "GatesMemories",
      allowedFormats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 800, quality: 80 }],
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 } // set input size limit to 20MB
});



router.post("/", upload.single("file"),async (req, res) => {

console.log('upload route got hit')

    try {
        // Get the Cloudinary URL of the uploaded image
        const imageUrl = req.file.path;


        // Use Sharp to resize and optimize the image
        // const file = await sharp(imageUrl).toBuffer()
        
        const file = await sharp(imageUrl)
          .jpeg({ mozjpeg: true })
          .toBuffer()
        console.log('line 44')

        // Upload the optimized image to Cloudinary
        cloudinary.uploader.upload(file, {
            folder: "GatesMemories"
        })
            .then(result => {
                console.log(result);
                res.status(200).send(result);
            })
            .catch(error => {
                console.error(error);
            });

    } catch (error) {
        console.error(error);
        res.send(error.message);
    }

  });

export default router