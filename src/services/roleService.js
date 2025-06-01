
import db from '../../db/models/index.js';

const GetAllRoles = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const roles = await db.Role.findAll();
            resolve(roles)
        } catch (e) {
            console.error(e);
            throw e;
        }
    })
};

const CreateARole = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.code || !data.description) {
                return resolve({
                    errCode: 2,
                    message: "Missing require parameter!"
                })
            }

            let newRole = await db.Role.create({
                code: data.code,
                description: data.description
            });


            resolve({
                errCode: 0,
                errMessage: "Ok",
                role: newRole // Trả về thông tin role vừa tạo
            });

        } catch (e) {
            console.error("Error creating role:", e);
            reject(e);
        }
    });
};
const DeleteARole = (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let role = await db.Role.findOne({
                where: { roleId: roleId }
            })
            if (!role) {
                return resolve({
                    errCode: 2,
                    message: `The role isn't exist!`
                })
            } else {
                await db.Role.destroy({
                    where: { roleId: roleId }
                })
                resolve({
                    errCode: 0,
                    message: `The role is deleted!`
                })
            }



        } catch (e) {
            console.error(e)
            reject(e);
        }

    })
}
const updateARole = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.roleId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing roleId'
                });
            }

            let role = await db.Role.findOne({
                where: { roleId: data.roleId }
            });

            if (role) {
                role.code = data.code;
                role.description = data.description;

                let updateRole = await role.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update role success',
                    role: updateRole
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Role not found!'
                });
            }
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};


export default {
    GetAllRoles, CreateARole, DeleteARole, updateARole
};