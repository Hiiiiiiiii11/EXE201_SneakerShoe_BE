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
});

const upload = multer({ storage: storage });

const uploadImage = (fieldName = 'image') => {
    return (req, res, next) => {
        upload.single(fieldName)(req, res, (err) => {
              // Kiểm tra nếu không có file
            if (!req.file && !err) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: `Missing required parameter: ${fieldName} is required`
                });
            }

            if (err) {
                console.error('Upload middleware error:', err);
                if (err.message && err.message.includes('Unexpected end of form')) {
                    return res.status(400).json({
                        errCode: 5,
                        errMessage: 'Incomplete request: Unexpected end of form'
                    });
                }
                if (err.message && err.message.includes('format')) {
                    return res.status(400).json({
                        errCode: 4,
                        errMessage: 'Image file format not allowed'
                    });
                }
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({
                        errCode: 3,
                        errMessage: 'Upload failed: ' + err.message
                    });
                }
                return res.status(500).json({
                    errCode: -1,
                    errMessage: 'Upload image failed'
                });
            }

            next();
        });
    };
};


const getUpLoadImageUrl = (file) => {
    if (!file) {
        return {
            errCode: 1,
            errMessage: 'Missing required parameter'
        };
    }
    return {
        errCode: 0,
        errMessage: 'Upload Image success',
        imageUrl: file.path
    };
};

export default {
    getUpLoadImageUrl,
    uploadImage
};