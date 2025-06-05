
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

const AddNewProductToCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId, productId, quantity } = data;

            if (!userId || !productId || !quantity || quantity === 0) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required fields'
                })
            }

            // Tìm cart theo user
            let cart = await db.Cart.findOne({ where: { userId } });

            // Nếu chưa có cart thì tạo mới
            if (!cart) {
                cart = await db.Cart.create({ userId });
            }

            // Kiểm tra sản phẩm đã có trong cart chưa
            let existingCartItem = await db.CartItem.findOne({
                where: {
                    CartId: cart.CartId,
                    productId
                }
            });

            if (existingCartItem) {
                // Nếu đã có sản phẩm thì tăng số lượng
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Add Product success'
                })
            } else {
                // Nếu chưa có thì thêm mới
                await db.CartItem.create({
                    CartId: cart.CartId,
                    productId,
                    quantity
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Add Product success'
                })
            }

        } catch (e) {
            console.error(e);
            reject(e)
        }

    })
}
const UpdateProductQuantityCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId, productId, quantity } = data;

            if (!userId || !productId || quantity === 0 || !quantity) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing required fields',
                });
            }

            // Tìm cart của user
            const cart = await db.Cart.findOne({
                where: { userId },
            });

            if (!cart) {
                return resolve({
                    errCode: 2,
                    errMessage: 'Cart not found for user',
                });
            }

            // Tìm cart item cần update
            const cartItem = await db.CartItem.findOne({
                where: {
                    CartId: cart.CartId,
                    productId,
                },
            });

            if (!cartItem) {
                return resolve({
                    errCode: 3,
                    errMessage: 'Product not found in cart',
                });
            }
            // Cập nhật số lượng
            cartItem.quantity = quantity;
            await cartItem.save();

            return resolve({
                errCode: 0,
                errMessage: 'Quantity updated successfully',
            });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};

const DeleteProductFromCart = ({ userId, productId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId || !userId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing product Id"
                })
            } else {
                const cart = await db.Cart.findOne({
                    where: { userId: userId }
                });

                if (!cart) {
                    return resolve({
                        errCode: 2,
                        errMessage: "Cart not found"
                    });
                } else {
                    const deleted = await db.CartItem.destroy({
                        where: {
                            CartId: cart.CartId,
                            productId
                        }
                    });
                    if (!deleted) {
                        return resolve({
                            errCode: 2,
                            errMessage: "Product not found"
                        });
                    } else {
                        return resolve({
                            errCode: 0,
                            errMessage: "Product delete from cart success"
                        });
                    }
                }


            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })

}
const DeleteAllProductFromCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing userId"
                })
            } else {
                const cart = await db.Cart.findOne({
                    where: { userId: userId }
                });
                if (!cart) {
                    return resolve({
                        errCode: 2,
                        errMessage: "Cart not found"
                    });
                } else {
                    const deletedCount = await db.CartItem.destroy({
                        where: {
                            CartId: cart.CartId
                        }
                    });
                    if (!deletedCount) {
                        return resolve({
                            errCode: 2,
                            errMessage: "Delete fail"
                        });
                    } else {
                        return resolve({
                            errCode: 0,
                            errMessage: "All product delete from cart success"
                        });
                    }
                }
            }

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}


export default {
    GetCartByUserId, AddNewProductToCart, UpdateProductQuantityCart, DeleteProductFromCart, DeleteAllProductFromCart
}