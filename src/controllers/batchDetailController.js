import bactchDetailService from "../services/batchDetailService.js";



/**
 * @swagger
 * /api/get-batchdetail-by-batchdetailid/{id}:
 *   get:
 *     summary: Lấy lô hàng theo bactch detail id
 *     tags: [BatchDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của chi tiết lô hàng
 *     responses:
 *       200:
 *         description: Lô hàng theo id
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
 *                 batchDetail:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       BatchDetailId:
 *                         type: integer
 *                         example: 1
 *                       batchId:
 *                         type: integer
 *                         example: 1
 *                       productId:
 *                         type: integer
 *                         example: 1
 *                       quantity:
 *                         type: integer
 *                         example: 1
 *                       costPrice:
 *                         type: string
 *                         nullable: true
 *                         example: "Giá nhập hàng"
 */
export const handleGetBatchDetailByBatchDetailId = async (req, res) => {
    try {
        const batchDetailId = req.params.id;
        const response = await bactchDetailService.GetBatchDetailByBatchDetailId(batchDetailId);
        res.status(200).json(response)

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
 * /api/get-batchdetail-by-batchid/{id}:
 *   get:
 *     summary: Lấy chi tiết lô hàng theo batch id
 *     tags: [BatchDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của lô hàng
 *     responses:
 *       200:
 *         description: Lô hàng theo batch id
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
 *                 batchDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       BatchDetailId:
 *                         type: integer
 *                         example: 1
 *                       batchId:
 *                         type: integer
 *                         example: 1
 *                       productId:
 *                         type: integer
 *                         example: 1
 *                       quantity:
 *                         type: integer
 *                         example: 1
 *                       costPrice:
 *                         type: string
 *                         nullable: true
 *                         example: "Giá nhập hàng"
 */
export const handleGetBatchDetailByBatchId = async (req, res) => {
    try {
        const batchId = req.params.id;
        console.error(batchId)
        const response = await bactchDetailService.GetBatchDetailByBatchId(batchId);
        res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}