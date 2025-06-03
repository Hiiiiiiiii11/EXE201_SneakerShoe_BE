
import db from "../../db/models/index.js";

const GetCartByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing userId"
                })
            } else {
                const user = await db.User.findOne({
                    where: { userId: userId }
                })
                if (user) {
                    const response = await db.Cart.findAll({
                        where: { userId: userId }
                    })
                    if (!response) {
                        return resolve({
                            errCode: 1,
                            errMessage: 'No cart for this user'
                        })
                    } else {
                        return resolve({
                            errCode: 0,
                            errMessage: "Ok",
                            cart: response
                        })
                    }
                } else {
                    return resolve({
                        errCode: 1,
                        errMessage: "User is't exist"
                    })
                }

            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
export default {
    GetCartByUserId
}