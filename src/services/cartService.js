
import db from "../../db/models/index.js";


const GetCartByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing userId"
                });
            }

            const user = await db.User.findOne({ where: { userId } });
            if (!user) {
                return resolve({
                    errCode: 1,
                    errMessage: "User doesn't exist"
                });
            }

            const cart = await db.Cart.findOne({ where: { userId } });
            if (!cart) {
                return resolve({
                    errCode: 1,
                    errMessage: "No cart found for this user"
                });
            }

            const cartItems = await db.CartItem.findAll({
                where: { CartId: cart.CartId },
                include: [
                    {
                        model: db.Product,
                        as: 'product' // optional: only if you define alias
                    }
                ]
            });

            return resolve({
                errCode: 0,
                errMessage: 'OK',
                data: cartItems
            });

        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};


export default {
    GetCartByUserId
}