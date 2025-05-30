import cloudinary from "../utils/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'upload_images',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }

})
const upload = multer({ storage: storage })

const uploadImage = () => {
    return upload.single('image')
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