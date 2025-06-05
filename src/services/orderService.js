
import db from "../../db/models/index.js";

const createNewOrder = (userId, ipAddr = "127.0.0.1", bankCode = "") => {
    console.error('check userId', userId)
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Missing userId'
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
                    const cartItems = await db.CartItem.findAll({
                        where: { CartId: cart.CartId }
                    });
                    if (!cartItems.length) {
                        return resolve({
                            errCode: 3,
                            errMessage: "No items in cart"
                        });
                    } else {
                        const order = await db.Order.create({
                            userId,
                            totalPrice: 0,
                            paymentMethod: "VN Pay",
                            status: "Pending"
                        });
                        let total = 0;
                        for (const item of cartItems) {
                            const product = await db.Product.findOne({
                                where: { productId: item.productId }
                            })
                            const price = product.price * item.quantity;
                            await db.OrderDetail.create({
                                orderId: order.OrderId,
                                productId: item.productId,
                                quantity: item.quantity,
                                unitPrice: price
                            })
                            total += price;
                        }
                        order.totalPrice = total;
                        await order.save();



                        // const paymentUrl = createVnpayPaymentUrl(order.OrderId, total, ipAddr, bankCode);
                        // console.error('check', order.OrderId, total, ipAddr, paymentUrl)
                        if (paymentUrl) {
                            resolve({
                                errCode: 0,
                                errMessage: "Order created success",
                                order: order,
                                // paymentUrl: paymentUrl
                            })
                            // await db.CartItem.destroy({
                            //     where: { CartId: cart.CartId }
                            // })
                            // await db.Cart.destroy({
                            //     where: { userId: cart.userId }
                            // })
                        } else {
                            return resolve({
                                errCode: 4,
                                errMessage: "Create order fail"
                            })
                        }

                    }
                }
            }

        } catch (e) {
            console.error(e);
            reject(e);
        }
    })
}

export default {
    createNewOrder
}