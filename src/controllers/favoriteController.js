import favoriteItem from "../../db/models/favoriteItem.js";
import favoriteService from "../services/favoriteService.js";


/**
 * @swagger
 * /api/get-all-favorite:
 *   get:
 *     summary: Lấy tất cả favrite
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Danh sách tất cả favorite của user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 0
 *                 errMessage:
 *                   type: string
 *                   example: OK
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       favoriteId:
 *                         type: integer
 *                       productId:
 *                         type: string
 *                       userId:
 *                         type: string
 */
export const handleGetALLFavorite = async (req, res) => {
    try {
        const response = await favoriteService.GetAllFavorite();
        return res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        })
    }

}

/**
 * @swagger
 * /api/get-favorite-item-by-user-id/{id}:
 *   get:
 *     summary: Lấy favorite bằng userId
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của user 
 *     responses:
 *       200:
 *         description: Lấy favorite by userId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 0
 *                 errMessage:
 *                   type: string
 *                   example: OK
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       favoriteId:
 *                         type: integer
 *                       userId:
 *                         type: integer
 */
export const handleGetFavoriteByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await favoriteService.GetFavoriteByUserId(userId);
        return res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        })
    }
}


/**
 * @swagger
 * /api/add-product-to-favorite/{id}:
 *   post:
 *     summary: Thêm sản phẩm vào danh sách yêu thích
 *     tags: [Favorites]
 *     description: Thêm một sản phẩm vào danh sách yêu thích của người dùng dựa trên `productId` và `userId`.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm (productId)
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID của người dùng
 *                 example: 1
 *     responses:
 *       200:
 *         description: Kết quả thêm sản phẩm vào danh sách yêu thích
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 0
 *                 errMessage:
 *                   type: string
 *                   example: Add product to favorite success
 *       400:
 *         description: Thiếu productId hoặc userId, hoặc dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server nội bộ
 */

export const handleAddProductFavorite = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.body.userId
        const response = await favoriteService.AddProductFavorite(productId, userId)
        return res.status(200).json(response)
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        })
    }
}

/**
 * @swagger
 * /api/delete-favorite-item/{id}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi danh sách yêu thích
 *     description: Xóa một sản phẩm khỏi danh sách yêu thích của người dùng dựa vào productId và userId.
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID của người dùng
 *                 example: 1
 *     responses:
 *       200:
 *         description: Kết quả xóa sản phẩm khỏi danh sách yêu thích
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 0
 *                 errMessage:
 *                   type: string
 *                   example: Delete product from favorite list success
 *       400:
 *         description: Thiếu productId hoặc userId, hoặc sản phẩm không tồn tại
 *       500:
 *         description: Lỗi server nội bộ
 */

export const handleDeleteFavoriteItem = async (req, res) => {
    try {
        const productId = req.params.id
        const userId = req.body.userId
        const response = await favoriteService.DeleteFavoriteItem(productId, userId);
        return res.status(200).json(response)
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        })
    }
}