import orderService from "../services/orderService.js"



/**
 * @swagger
 * /api/create-new-order/{id}/promotion/{promotionId}:
 *   post:
 *     summary: Create a new order from cart
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của user
 *       - in: path
 *         name: promotionId
 *         schema:
 *           type: integer
 *         description: ID của promotion (có thể null)
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 errCode: 0
 *                 errMessage: "Order created successfully"
 *                 orderId: "abc123"
 *       400:
 *         description: Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 errCode: 1
 *                 errMessage: "Missing required parameters"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 errCode: -1
 *                 errMessage: "Internal server error"
 */
export const handleCreateNewOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        const promotionId = req.params.promotionId
        if (!userId) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await orderService.createNewOrder(userId, promotionId);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error"
        });
    }
}

/**
 * @swagger
 * /api/get-order-by-user-id/{id}:
 *   get:
 *     summary: Create a new order from cart
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của user
 *     responses:
 *       200:
 *         description: Danh sách các order for user
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
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       OrderId:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         nullable: true
 *                         example: "Pending"
 *                       totalPrice:
 *                         type: number
 *                         format: decimal
 *                         example: "100000"
 */
export const handleGetOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await orderService.GetOrderByUserId(userId);
        return res.status(200).json(response)

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error"
        });
    }
}

/**
 * @swagger
 * /api/get-all-order:
 *   get:
 *     summary: Lấy tất cả order
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Danh sách các order
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
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       OrderId:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         nullable: true
 *                         example: "Pending"
 *                       totalPrice:
 *                         type: number
 *                         format: decimal
 *                         example: "100000"
 */
export const handleGetALLOrder = async (req, res) => {
    try {
        const response = await orderService.GetAllOrder();
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error"
        });
    }

}


