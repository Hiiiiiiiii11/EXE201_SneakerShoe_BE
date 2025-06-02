import authService from "../services/authService.js";


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Đăng nhập với email và mật khẩu
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginWithEmail(email, password);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
  }
};
/**
 * @swagger
 * /api/google-login:
 *   post:
 *     summary: Đăng nhập với Google
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */

export const handleGoogleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body; // từ Google Identity
    const result = await authService.loginWithGoogle(tokenId);
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errCode: -1, errMessage: "Internal server error" });
  }
};