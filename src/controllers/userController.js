import userService from "../services/userService.js";

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
 *     summary: Lấy danh sách người dùng
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */
export const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
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
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [User]
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
 *     summary: Cập nhật thông tin người dùng
 *     tags: [User]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
export const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);
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
