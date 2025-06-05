import sizeService from "../services/sizeService.js";

/**
 * @swagger
 * /api/get-all-sizes:
 *   get:
 *     summary: Lấy tất cả kích thước giày
 *     tags: [Size]
 *     responses:
 *       200:
 *         description: Danh sách kích thước
 */
export const getAllSizes = async (req, res) => {
  try {
    const result = await sizeService.getAllSizes();
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/get-size/{id}:
 *   get:
 *     summary: Lấy kích thước theo ID
 *     tags: [Size]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chi tiết kích thước
 */
export const getSizeById = async (req, res) => {
  try {
    const result = await sizeService.getSizeById(req.params.id);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/create-size:
 *   post:
 *     summary: Tạo mới một kích thước
 *     tags: [Size]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sizeNumber
 *             properties:
 *               sizeNumber:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Tạo mới thành công
 */
export const createSize = async (req, res) => {
  try {
    const result = await sizeService.createSize(req.body);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/update-size/{id}:
 *   put:
 *     summary: Cập nhật kích thước
 *     tags: [Size]
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
 *               sizeNumber:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
export const updateSize = async (req, res) => {
  try {
    const result = await sizeService.updateSize(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/delete-size/{id}:
 *   delete:
 *     summary: Xóa kích thước
 *     tags: [Size]
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
export const deleteSize = async (req, res) => {
  try {
    const result = await sizeService.deleteSize(req.params.id);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};
