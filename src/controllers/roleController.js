import userService from '../services/roleService.js';


/**
 * @swagger
 * /api/get-all-roles:
 *   get:
 *     summary: Lấy tất cả vai trò
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Danh sách các vai trò
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
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       roleId:
 *                         type: integer
 *                         example: 1
 *                       code:
 *                         type: string
 *                         nullable: true
 *                         example: "CUSTOMER"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "Khách hàng thường"
 */

export const handleGetAllRoles = async (req, res) => {
    try {
        const response = await userService.GetAllRoles();
        return res.status(200).json(response)
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
};

/**
 * @swagger
 * /api/create-new-role:
 *   post:
 *     summary: Tạo vai trò mới
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - description
 *             properties:
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vai trò được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errCode:
 *                   type: integer
 *                 errMessage:
 *                   type: string
 *                 role:
 *                   type: object
 *                   properties:
 *                     roleId:
 *                       type: integer
 *                     code:
 *                       type: string
 *                     description:
 *                       type: string
 */

export const handleCreateNewRole = async (req, res) => {
    try {
        const response = await userService.CreateARole(req.body);
        return res.status(200).json(response) // Sửa lại cách trả dữ liệu);

    } catch (e) {
        console.error("Error in handleCreateNewRole:", e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
};

/**
 * @swagger
 * /api/delete-role/{id}:
 *   delete:
 *     summary: Xóa vai trò theo ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của vai trò cần xóa
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
export const handleDeleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        if (!roleId) {
            return res.status(400).json({
                errCode: 1,
                message: "Missing required parameter!"
            });
        }
        let response = await userService.DeleteARole(roleId);
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
 * /api/update-role/{id}:
 *   put:
 *     summary: Cập nhật vai trò theo ID
 *     tags: [Roles]
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
 *               code:
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

export const handleUpdateRole = async (req, res) => {
    try {
        const id = req.params.id;  // Lấy id từ URL
        const data = req.body;

        if (!id || !data) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters",
            });
        }

        data.roleId = id; // Gán roleId để truyền vào service

        let updateRole = await userService.updateARole(data);
        return res.status(200).json(updateRole)
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error",
        });
    }
};


