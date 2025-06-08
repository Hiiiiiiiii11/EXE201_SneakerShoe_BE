
import uploadService from '../services/uploadService.js';


/**
 * @swagger
 * /api/upload-image:
 *   post:
 *     summary: Upload nhiều hình ảnh lên Cloudinary
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Upload thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                 errMessage:
 *                   type: string
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: string
 */

export const handleUpLoadImage = (req, res) => {
    try {
        const files = req.files?.image;  // Lấy các file đã upload ở trường 'image'
        console.log('Uploaded files:', files);

        if (!files || files.length === 0) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing required image files'
            });
        }

        // Lấy ra các đường link Cloudinary (path)
        const urls = files.map(file => file.path);

        return res.status(200).json({
            errCode: 0,
            errMessage: 'Upload thành công',
            urls
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Internal server error'
        });
    }
};


