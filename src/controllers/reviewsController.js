import reviewService from "../services/reviewsService.js";

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: API đánh giá sản phẩm
 */

/**
 * @swagger
 * /api/create-review:
 *   post:
 *     summary: Tạo review mới
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - orderDetailId
 *             properties:
 *               userId:
 *                 type: integer
 *               orderDetailId:
 *                 type: integer
 *               ratting:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo review thành công
 */
export const createReview = async (req, res) => {
  try {
    const result = await reviewService.createReview(req.body);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({ errCode: -1, errMessage: e.message });
  }
};

/**
 * @swagger
 * /api/get-all-reviews:
 *   get:
 *     summary: Lấy danh sách tất cả review
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Trả về danh sách review
 */
export const getAllReviews = async (req, res) => {
  const result = await reviewService.getAllReviews();
  return res.status(200).json(result);
};

/**
 * @swagger
 * /api/update-review/{id}:
 *   put:
 *     summary: Cập nhật review
 *     tags: [Review]
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
 *               ratting:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review đã được cập nhật
 */
export const updateReview = async (req, res) => {
  const result = await reviewService.updateReview(req.params.id, req.body);
  return res.status(200).json(result);
};

/**
 * @swagger
 * /api/delete-review/{id}:
 *   delete:
 *     summary: Xoá review theo ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review đã bị xoá
 */
export const deleteReview = async (req, res) => {
  const result = await reviewService.deleteReview(req.params.id);
  return res.status(200).json(result);
};

/**
 * @swagger
 * /api/reviews/product/{productId}:
 *   get:
 *     summary: Lấy tất cả review của một sản phẩm
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách review theo sản phẩm
 */
export const getReviewsByProductId = async (req, res) => {
  const result = await reviewService.getReviewsByProductId(req.params.productId);
  return res.status(200).json(result);
};

/**
 * @swagger
 * /api/reviews/user/{userId}:
 *   get:
 *     summary: Lấy tất cả review của một user (dùng trong lịch sử mua hàng)
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách review theo user
 */
export const getReviewsByUserId = async (req, res) => {
  const result = await reviewService.getReviewsByUserId(req.params.userId);
  return res.status(200).json(result);
};
