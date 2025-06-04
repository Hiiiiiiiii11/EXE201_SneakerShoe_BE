import cartService from "../services/cartService.js";


/**
 * @swagger
 * /api/get-cart-by-userid/{id}:
 *   get:
 *     summary: Lấy giỏ hàng theo user id
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của user
 *     responses:
 *       200:
 *         description: Cart theo userid
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
 *                 Cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       CartId:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 1
 */
export const handleGetCartByUserId = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await cartService.GetCartByUserId(userId);
        return res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}

/**
 * @swagger
 * /api/add-new-product-to-cart:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               productId:
 *                 type: integer
 *                 example: 5
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Kết quả thêm sản phẩm vào giỏ hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Product added to cart successfully
 *       400:
 *         description: Thiếu dữ liệu đầu vào
 *       500:
 *         description: Lỗi hệ thống
 */

export const handleAddNewProductToCart = async (req, res) => {
    try {
        const data = req.body
        const response = await cartService.AddNewProductToCart(data);
        return res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}


/**
 * @swagger
 * /api/update-product-quantity-cart/{id}:
 *   put:
 *     summary: Cập nhật số lượng sản phẩm trong giỏ hàng
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của sản phẩm (productId) cần cập nhật trong giỏ hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Kết quả cập nhật số lượng sản phẩm trong giỏ hàng
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
 *                   example: Quantity updated successfully
 *       400:
 *         description: Thiếu tham số hoặc dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */

export const handleUpdateProductQuantityCart = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if (!id || !data) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameter "
            })
        }
        data.productId = id;
        const response = await cartService.UpdateProductQuantityCart(data);
        return res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}

/**
 * @swagger
 * /api/delete-a-product-from-cart/{id}:
 *   delete:
 *     summary: Xóa một sản phẩm khỏi giỏ hàng của người dùng
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần xóa khỏi giỏ hàng
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
 *                 example: 1
 *     responses:
 *       200:
 *         description: Xóa sản phẩm khỏi giỏ hàng thành công
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
 *                   example: Product deleted from cart successfully
 *       400:
 *         description: Thiếu userId hoặc productId
 *       500:
 *         description: Lỗi server
 */

export const handleDeleteProductFromCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.body.userId;
        const response = await cartService.DeleteProductFromCart({ userId, productId });
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error"
        });
    }
};


/**
 * @swagger
 * /api/delete-all-product-from-cart/{id}:
 *   delete:
 *     summary: Xóa tất cả sản phẩm khỏi giỏ hàng của người dùng
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của user để xóa tất cả sản phẩm khỏi giỏ hàng
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa tất cả sản phẩm khỏi giỏ hàng thành công
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
 *                   example: Product deleted from cart successfully
 *       400:
 *         description: Thiếu userId 
 *       500:
 *         description: Lỗi server
 */
export const handleDeleteAllProductFromCart = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await cartService.DeleteAllProductFromCart(userId);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error"
        });
    }
}