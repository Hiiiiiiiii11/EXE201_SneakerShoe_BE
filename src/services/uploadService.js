import cloudinary from "../utils/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'upload_images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'ico', 'svg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }

})
const upload = multer({ storage: storage })

const uploadImage = () => {
    return (req, res, next) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.error('Upload middleware error:', err);
                return res.status(500).json({
                    errCode: -1,
                    errMessage: 'Upload image failed, Image file format not allowed'
                });
            }
            next();
        });
    };
}
const getUpLoadImageUrl = (file) => {
    return {
        errCode: 0,
        errMessage: ' Upload Image success',
        imageUrl: file.path
    }
}

export default {
    getUpLoadImageUrl, uploadImage
};