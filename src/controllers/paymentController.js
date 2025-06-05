import paymentService from "../services/paymentService.js";


/**
 * @swagger
 * /api/payos/payment:
 *   post:
 *     summary: Nhận webhook từ PayOS
 *     description: Cập nhật trạng thái đơn hàng và payment dựa trên dữ liệu từ PayOS.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - transactionStatus
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *               transactionStatus:
 *                 type: string
 *                 enum: [PAID, FAILED]
 *                 example: PAID
 *     responses:
 *       200:
 *         description: Webhook xử lý thành công
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
 *                   example: Update success
 *       400:
 *         description: Thiếu dữ liệu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing data
 *       500:
 *         description: Lỗi server
 */

export const handlePayOSWebhook = async (req, res) => {
    try {
        const { orderId, transactionStatus } = req.body;
        console.error("check req", req.body)

        if (!orderId || !transactionStatus) {
            return res.status(400).json({ message: 'Missing data' });
        }
        const response = await paymentService.PayOSWebHook(orderId, transactionStatus)
        return res.status(200).json(response);
    } catch (e) {
        console.error("Webhook error:", e);
        return res.status(500).json({ message: 'Internal error' });
    }
};


