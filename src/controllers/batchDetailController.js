import bactchDetailService from "../services/batchDetailService.js";


/**
 * @swagger
 * /api/get-all-batchdetail:
 *   get:
 *     summary: Lấy tất cả chi tiết lô hàng
 *     tags: [BatchDetails]
 *     responses:
 *       200:
 *         description: Danh sách tất cả chi tiết lô hàng
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
 *                       BatchDetailId:
 *                         type: integer
 *                       BatchId:
 *                         type: integer
 *                       productId:
 *                         type: integer
 *                       costPrice:
 *                         type: number
 *                         format: decimal
 *                         example: "Tồng tiền đơn nhập hàng"
 */
export const handleGetAllBatchDetail = async (req, res) => {
    try {
        const response = await bactchDetailService.GetAllBatchDetail();
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
 *                         type: number
 *                         format: decimal
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
 *                         type: number
 *                         format: decimal
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

/**
 * @swagger
 * /api/create-new-batchdetail:
 *   post:
 *     summary: Tạo chi tiết lô hàng mới
 *     tags: [BatchDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batchId
 *               - productId
 *               - quantity
 *               - costPrice
 *             properties:
 *               batchId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               costPrice:
 *                 type: number
 *                 format: decimal
 *     responses:
 *       200:
 *         description: Chi tiết lô hàng được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                 errMessage:
 *                   type: string
 *                 batchDetail:
 *                   type: object
 *                   properties:
 *                     BatchDetailId:
 *                       type: integer
 *                     batchId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     costPrice:
 *                       type: number
 *                       format: decimal
 */
export const handleCreateNewBatchDetail = async (req, res) => {
    try {
        const response = await bactchDetailService.CreateNewBatchDetail(req.body);
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
 * /api/update-batchdetail/{id}:
 *   put:
 *     summary: Cập nhật chi tiết lô hàng theo ID
 *     tags: [BatchDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của chi tiết lô hàng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batchId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               costPrice:
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
export const handleUpdateBatchDetail = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        if (!id || !data) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters",
            });
        }

        data.batchDetailId = id;
        const response = await bactchDetailService.UpdateBatchDetail(data);
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
 * /api/delete-batchdetail/{id}:
 *   delete:
 *     summary: Xóa chi tiết lô hàng theo ID
 *     tags: [BatchDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của chi tiết lô hàng cần xóa
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
export const handleDeleteBatchDetail = async (req, res) => {
    try {
        const batchDetailId = req.params.id
        const response = await bactchDetailService.DeleteBatchDetail(batchDetailId);
        res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}
