import orderService from "../services/orderService.js"



/**
 * @swagger
 * /api/create-new-order/{id}:
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
        if (!userId) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            });
        }

        const response = await orderService.createNewOrder(userId);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error"
        });
    }
}