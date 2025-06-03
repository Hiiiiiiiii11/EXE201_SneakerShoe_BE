
import bactchService from "../services/batchService.js";



/**
 * @swagger
 * /api/get-all-batch:
 *   get:
 *     summary: Lấy tất cả lô hàng
 *     tags: [Batches]
 *     responses:
 *       200:
 *         description: Danh sách các lô hàng
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
 *                 batchs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       BatchId:
 *                         type: integer
 *                         example: 1
 *                       arrivalDate:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                         example: "2024-02-01"
 *                       totalCost:
 *                         type: string
 *                         nullable: true
 *                         example: "Tồng tiền đơn nhập hàng"
 */
export const handleGetAllBatch = async (req, res) => {
    try {
        const response = await bactchService.GetAllBatch();
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
 * /api/get-batch-by-id/{id}:
 *   get:
 *     summary: Lấy lô hàng theo id
 *     tags: [Batches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của lô hàng
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
 *                 batch:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       BatchId:
 *                         type: integer
 *                         example: 1
 *                       arrivalDate:
 *                         type: string
 *                         format: date
 *                         nullable: true
 *                         example: "2024-02-01"
 *                       totalCost:
 *                         type: string
 *                         nullable: true
 *                         example: "Tồng tiền đơn nhập hàng"
 */
export const handleGetBatchById = async (req, res) => {
    try {
        const batchId = req.params.id;
        const response = await bactchService.GetBatchById(batchId);
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
 * /api/create-new-batch:
 *   post:
 *     summary: Tạo lô hàng  mới
 *     tags: [Batches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - arrivalDate
 *               - totalCost
 *             properties:
 *               arrivalDate:
 *                 type: string
 *               totalCost:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       200:
 *         description: Lô hàng được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                 errMessage:
 *                   type: string
 *                 batch:
 *                   type: object
 *                   properties:
 *                     BatchId:
 *                       type: integer
 *                     arrivalDate:
 *                       type: string
 *                     totalCost:
 *                       type: number
 *                       format: decimal
 */
export const handleCreateNewBatch = async (req, res) => {
    try {
        const response = await bactchService.CreateNewBatch(req.body);
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
 * /api/update-batch/{id}:
 *   put:
 *     summary: Cập nhật lô hàng theo ID
 *     tags: [Batches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của lô hàng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               arrivalDate:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *               totalCost:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       200:
 *         description: Cập nhật thành công
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
 *                   example: Update batch success
 *       400:
 *         description: Thiếu dữ liệu đầu vào
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 1
 *                 errMessage:
 *                   type: string
 *                   example: Missing required parameters
 *       500:
 *         description: Lỗi server
 */
export const handleUpdateBatch = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (!id || !data) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters",
            });
        }
        data.batchId = id;
        const response = await bactchService.UpdateBatch(data);
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
 * /api/delete-batch/{id}:
 *   delete:
 *     summary: Xóa lô hàng theo ID
 *     tags: [Batches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của lô hàng cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                 errMessage:
 *                   type: string
 *       400:
 *         description: Thiếu ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: Missing required parameter!
 *       500:
 *         description: Lỗi server
 */
export const handleDeleteBatch = async (req, res) => {
    try {
        const batchId = req.params.id;
        const response = await bactchService.DeleteBatch(batchId);
        res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}
