import { ValidationError } from "sequelize";
import promotionService from "../services/promotionService.js";

/**
 * @swagger
 * /api/create-promotion:
 *   post:
 *     summary: Tạo mới chương trình khuyến mãi
 *     tags: [Promotion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - promotionName
 *               - description
 *               - discountPercent
 *               - startDate
 *               - endDate
 *               - minimumAmount
 *             properties:
 *               promotionName:
 *                 type: string
 *               description:
 *                 type: string
 *               discountPercent:
 *                 type: number
 *                 format: float
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               minimumAmount:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Tạo chương trình khuyến mãi thành công
 */
export const createPromotion = async (req, res) => {
  try {
    const promotionData = req.body;
    const result = await promotionService.createPromotion(promotionData);
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof ValidationError) {
      const fieldErrors = e.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        errCode: 1,
        errMessage: "Validation error",
        errors: fieldErrors
      });
    }
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/get-all-promotions:
 *   get:
 *     summary: Lấy danh sách tất cả chương trình khuyến mãi
 *     tags: [Promotion]
 *     responses:
 *       200:
 *         description: Danh sách các chương trình khuyến mãi
 */
export const getAllPromotions = async (req, res) => {
  try {
    const result = await promotionService.getAllPromotions();
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/get-promotion/{id}:
 *   get:
 *     summary: Lấy thông tin chương trình khuyến mãi theo ID
 *     tags: [Promotion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin chương trình khuyến mãi
 */
export const getPromotionById = async (req, res) => {
  try {
    const promotionId = req.params.id;
    const result = await promotionService.getPromotionById(promotionId);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/update-promotion/{id}:
 *   put:
 *     summary: Cập nhật thông tin chương trình khuyến mãi theo ID
 *     tags: [Promotion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               promotionName:
 *                 type: string
 *               description:
 *                 type: string
 *               discountPercent:
 *                 type: number
 *                 format: float
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               minimumAmount:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
export const updatePromotion = async (req, res) => {
  try {
    const promotionId = req.params.id;
    const updatedData = req.body;
    const result = await promotionService.updatePromotion(promotionId, updatedData);
    return res.status(200).json(result);
  } catch (e) {
    if (e instanceof ValidationError) {
      const fieldErrors = e.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        errCode: 1,
        errMessage: "Validation error",
        errors: fieldErrors
      });
    }
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/delete-promotion/{id}:
 *   delete:
 *     summary: Xóa chương trình khuyến mãi theo ID
 *     tags: [Promotion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
export const deletePromotion = async (req, res) => {
  try {
    const promotionId = req.params.id;
    const result = await promotionService.deletePromotion(promotionId);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
  }
};
