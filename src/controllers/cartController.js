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

export const handleAddNewProductToCart = async (req, res) => {
    try {
        const data = req.body
        const response = await cartService.GetCartByUserId(data);
        return res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}