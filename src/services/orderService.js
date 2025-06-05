
import db from "../../db/models/index.js";
import { generatePayOSLink } from "../utils/payLink.js";


const createNewOrder = (userId, promotionId) => {
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
                            paymentMethod: "PayOS",
                            status: "Pending",
                            promotionId: promotionId
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



                        const paymentUrl = await generatePayOSLink(order);
                        if (paymentUrl) {
                            resolve({
                                errCode: 0,
                                errMessage: "Order created success",
                                order: order,
                                paymentUrl: paymentUrl
                            })
                            await db.CartItem.destroy({
                                where: { CartId: cart.CartId }
                            })
                            await db.Cart.destroy({
                                where: { userId: cart.userId }
                            })
                            const payment = await db.Payment.create({
                                orderId: order.OrderId,
                                amount: order.totalPrice,
                                method: 'PayOS',
                                status: 'Pending',
                                paymentUrl: paymentUrl
                            });
                            order.paymentId = payment.PaymentId;
                            await order.save();
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
const GetAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await db.Order.findAll({
                include: [
                    {
                        model: db.OrderDetail,
                        as: 'orderdetails',

                        include: [{
                            model: db.Product,
                            as: 'product',
                        }]
                    },

                ],

            })
            resolve({
                errCode: 0,
                errMessage: 'OK',
                orders: order
            })

        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const GetOrderByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                return resolve({
                    errCode: 1,
                    errMessage: "Missing userId"
                })
            } else {
                const order = await db.Order.findAll({
                    where: { userId: userId },
                    include: [{
                        model: db.OrderDetail,
                        as: 'orderdetails',
                        include: [{
                            model: db.Product,
                            as: 'product',
                        }]
                    }]
                })
                if (order) {
                    return resolve({
                        errCode: 0,
                        errMessage: "OK",
                        order: order
                    })
                } else {
                    return resolve({
                        errCode: 1,
                        errMessage: "No order for this user"
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
    createNewOrder, GetAllOrder, GetOrderByUserId
}