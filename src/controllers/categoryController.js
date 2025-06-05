import categoryService from "../services/categoryService.js";



/**
 * @swagger
 * /api/get-all-category:
 *   get:
 *     summary: Lấy tất cả category
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Danh sách các category
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
 *                 category:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       CategoryId:
 *                         type: integer
 *                         example: 1
 *                       code:
 *                         categoryName: string
 *                         example: "string"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "string"
 */
export const handleGetAllCategory = async (req, res) => {
    try {
        const response = await categoryService.GetAllCategory();
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}

/**
 * @swagger
 * /api/get-category-by-id/{id}:
 *   get:
 *     summary: Lấy category theo id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của category 
 *     responses:
 *       200:
 *         description: Lấy category theo id
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
 *                       CategoryId:
 *                         type: integer
 *                         example: 1
 *                       code:
 *                         categoryName: string
 *                         example: "string"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "string"
 */
export const handleGetCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id
        const response = await categoryService.GetCategoryById(categoryId);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
}

/**
 * @swagger
 * /api/create-new-category:
 *   post:
 *     summary: Tạo mới category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *               - description
 *             properties:
 *               categoryName:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                 errMessage:
 *                   type: string
 *                 category:
 *                   type: object
 *                   properties:
 *                     CategoryId:
 *                       type: integer
 *                     categoryName:
 *                       type: string
 *                     description:
 *                       type: string
 */
export const handleCreateNewCategory = async (req, res) => {
    try {
        const response = await categoryService.CreateNewCategory(req.body);
        return res.status(200).json(response)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        })
    }
}

/**
 * @swagger
 * /api/update-category/{id}:
 *   put:
 *     summary: Cập nhật category theo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của vai trò cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 nullable: false
 *               description:
 *                 type: string
 *                 nullable: false
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
 *                   example: Update role success
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
export const handleUpdateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("check category", id)
        const data = req.body;
        if (!id || !data) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!"
            });
        }
        data.CategoryId = id;
        const updateCategory = await categoryService.UpdateCategory(data);
        return res.status(200).json(updateCategory)

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        })
    }
}

/**
 * @swagger
 * /api/delete-category/{id}:
 *   delete:
 *     summary: Xóa category theo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của category cần xóa
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
 *                 errMessage:
 *                   type: string
 *                   example: Missing required parameter!
 *       500:
 *         description: Lỗi server
 */
export const handleDeleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!"
            });
        }
        let response = await categoryService.DeleteACategory(categoryId);
        return res.status(200).json(response)
    } catch (e) {
        console.error(e);
    }
}