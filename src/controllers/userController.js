import userService from "../services/userService.js";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /api/customer/create-user:
 *   post:
 *     summary: Người dùng tự đăng ký (role mặc định là CUSTOMER)
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 */
export const createUserBySelf = async (req, res) => {
  try {
    const data = req.body;
    const response = await userService.createUserSelf(data);
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/admin/create-user:
 *   post:
 *     summary: Admin tạo tài khoản người dùng (có thể set role)
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - roleId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               roleId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tạo tài khoản thành công
 */
export const createUserByAdmin = async (req, res) => {
  try {
    const result = await userService.createUserByAdmin(req.body);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/get-all-users:
 *   get:
 *     summary: Lấy danh sách người dùng (chỉ gồm tên và email)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */
export const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers({
      attributes: ['userId', 'firstName', 'lastName', 'email']
    });
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/get-user-detail/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID (đầy đủ)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 */
export const getUserById = async (req, res) => {
  try {
    const result = await userService.getUserById(req.params.id);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/update-user/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng (có thể cập nhật ảnh đại diện)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               userAvatar:
 *                 type: string
 *                 format: binary
 *                 description: Có thể bỏ qua nếu không cập nhật ảnh
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (req.file?.path) {
      data.image = req.file.path;
    }
    const result = await userService.updateUser(userId, data);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};

/**
 * @swagger
 * /api/delete-user/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
export const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal error" });
  }
};
