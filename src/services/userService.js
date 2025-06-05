import { where } from "sequelize";
import db from "../../db/models/index.js";
import bcrypt from "bcrypt";





const createUserSelf = async (data) => {
  try {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await db.User.findOne({ where: { email: data.email } });
    if (existingUser) {
      return { errCode: 2, errMessage: "Email đã được sử dụng" };
    }

    const role = await db.Role.findOne({ where: { code: 'CUSTOMER' } });
    if (!role) return { errCode: 1, errMessage: "Role CUSTOMER not found" };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = await db.User.create({
      ...data,
      password: hashedPassword,
      roleId: role.roleId
    });

    return {
      errCode: 0,
      errMessage: "Register success",
      user: newUser
    };
  } catch (e) {
    console.error("🔥 createUserSelf error:", e);
    throw e;
  }
};

const createUserByAdmin = async (data) => {

  console.error("check", data)
  try {
    const salt = await bcrypt.genSalt(10);
    const role = await db.Role.findOne({ where: { code: 'STAFF' } });
    if (!role) return { errCode: 1, errMessage: "Role STAFF not found" };
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const newUser = await db.User.create({
      ...data,
      password: hashedPassword,
      roleId: role.roleId
    });

    return {
      errCode: 0,
      errMessage: "User created by admin successfully",
      user: newUser
    };
  } catch (error) {
    console.error("Error creating user by admin:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll();
      if (response) {
        return resolve({
          errCode: 0,
          errMessage: 'OK',
          user: response
        })
      }
    } catch (e) {
      console.error(e);
      reject(e);

    }

  })

};

// const getUserById = async (id) => {
//   return await db.User.findByPk(id, { include: { model: db.Role, as: 'role' } });
// };
const getUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { userId: id }, include: { model: db.Role, as: 'role' }
      });
      if (response) {
        return resolve({
          errCode: 0,
          errMessage: 'OK',
          user: response
        })
      } else {
        return resolve({
          errCode: 0,
          errMessage: "User is't exist",

        })
      }
    } catch (e) {
      console.error(e);
      reject(e);

    }

  });
}


const updateUser = async (id, data) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) return { errCode: 1, errMessage: "User not found" };

    await user.update(data);

    return {
      errCode: 0,
      errMessage: "User updated successfully",
      user
    };
  } catch (error) {
    throw error;
  }
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findByPk(id);
      if (!user) return resolve({
        errCode: 1,
        errMessage: "User not found"
      });
      await user.destroy();
      return resolve({
        errCode: 0,
        errMessage: "User deleted successfully"
      });
    } catch (e) {
      console.error(e)
      reject(e);
    }
  });
}


export default {
  createUserSelf,
  createUserByAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
