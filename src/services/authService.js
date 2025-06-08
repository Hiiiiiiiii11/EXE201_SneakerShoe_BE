import db from "../../db/models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Regex kiểm tra email hợp lệ
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginWithEmail = async (email, password) => {
  if (!email || !emailRegex.test(email)) {
    return { errCode: 1, errMessage: "Email không hợp lệ" };
  }

  const user = await db.User.findOne({ where: { email } });
  if (!user) return { errCode: 2, errMessage: "User không tồn tại" };

  // ✅ Kiểm tra tài khoản bị khóa hoặc không hoạt động
  if (user.isActive === false) {
    return { errCode: 4, errMessage: "Tài khoản đang bị khóa hoặc chưa kích hoạt" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { errCode: 3, errMessage: "Sai mật khẩu" };

  const token = jwt.sign({ id: user.userId, roleId: user.roleId }, JWT_SECRET, { expiresIn: "1d" });

  return { errCode: 0, errMessage: "Login success", token, user };
};

const loginWithGoogle = async (tokenId) => {
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();
  const { email, given_name, family_name, picture } = payload;

  if (!email || !emailRegex.test(email)) {
    return { errCode: 1, errMessage: "Email không hợp lệ" };
  }

  let user = await db.User.findOne({ where: { email } });

  if (user) {
    // ✅ Kiểm tra trạng thái nếu tài khoản đã tồn tại
    if (user.isActive === false) {
      return { errCode: 4, errMessage: "Tài khoản Google này đã bị khóa" };
    }
  } else {
    const role = await db.Role.findOne({ where: { code: "CUSTOMER" } });
    user = await db.User.create({
      firstName: given_name,
      lastName: family_name,
      email,
      image: picture,
      password: null,
      roleId: role.roleId,
      isActive: true
    });
  }

  const token = jwt.sign({ id: user.userId, roleId: user.roleId }, JWT_SECRET, { expiresIn: "1d" });

  return { errCode: 0, errMessage: "Google login success", token, user };
};

export default {
  loginWithEmail,
  loginWithGoogle
};
