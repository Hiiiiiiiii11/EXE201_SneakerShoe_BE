import bcrypt from "bcrypt";
import db from "../../db/models/index.js";

const createUserSelf = async (data) => {
  const existingUser = await db.User.findOne({ where: { email: data.email } });
  if (existingUser) {
    return { errCode: 2, errMessage: "Email đã được sử dụng" };
  }

  const role = await db.Role.findOne({ where: { code: 'CUSTOMER' } });
  if (!role) return { errCode: 1, errMessage: "Role CUSTOMER not found" };

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await db.User.create({
    ...data,
    password: hashedPassword,
    roleId: role.roleId
  });

  const { password, ...safeUser } = newUser.dataValues;
  return {
    errCode: 0,
    errMessage: "Register success",
    user: safeUser
  };
};

const createUserByAdmin = async (data) => {
  if (!data.roleId) return { errCode: 2, errMessage: 'Missing roleId' };
  const role = await db.Role.findByPk(data.roleId);
  if (!role) return { errCode: 1, errMessage: "Role not found" };

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await db.User.create({
    ...data,
    password: hashedPassword
  });

  const { password, ...safeUser } = newUser.dataValues;
  return {
    errCode: 0,
    errMessage: "User created by admin successfully",
    user: safeUser
  };
};

const getAllUsers = async (options = {}) => {
  const users = await db.User.findAll(options);
  return {
    errCode: 0,
    errMessage: 'OK',
    users
  };
};

const getUserById = async (id) => {
  const user = await db.User.findOne({
    where: { userId: id },
    include: { model: db.Role, as: 'role' }
  });
  if (!user) {
    return { errCode: 1, errMessage: "User not found" };
  }
  const { password, ...safeUser } = user.dataValues;
  return {
    errCode: 0,
    errMessage: 'OK',
    user: safeUser
  };
};

const updateUser = async (id, data) => {
  const user = await db.User.findByPk(id);
  if (!user) return { errCode: 1, errMessage: "User not found" };

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  await user.update(data);
  const { password, ...safeUser } = user.dataValues;
  return {
    errCode: 0,
    errMessage: "User updated successfully",
    user: safeUser
  };
};

const deleteUser = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) return { errCode: 1, errMessage: "User not found" };
  await user.destroy();
  return {
    errCode: 0,
    errMessage: "User deleted successfully"
  };
};

export default {
  createUserSelf,
  createUserByAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
