import productService from '../services/productService.js';
import uploadService from '../services/uploadService.js';


/**
 * @swagger
 * /api/upload-image:
 *   post:
 *     summary: Upload hình ảnh lên Cloudinary
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
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
 *                 imageUrl:
 *                   type: string
 */
export const handleUpLoadImage = (req, res) => {
    try {
        const file = req.file
        console.error('check file', file)
        if (!file) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing required parameter'
            })
        }
        const response = uploadService.getUpLoadImageUrl(file);
        return res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Internal server error'
        })
    }

}

