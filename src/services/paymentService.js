import db from "../../db/models/index.js";

const PayOSWebHook = (orderId, transactionStatus) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm Order và Payment
            const order = await db.Order.findOne({ where: { OrderId: orderId } });
            if (!order) return resolve({
                errCode: -1,
                errMessage: 'Order not found'
            })

            const payment = await db.Payment.findOne({ where: { orderId: order.OrderId } });
            if (!payment) return resolve({
                errCode: -1,
                errMessage: 'Payment not found'
            })

            // Cập nhật trạng thái theo transactionStatus
            if (transactionStatus === 'PAID') {
                payment.status = 'Success';
                order.status = 'Paid';

                await db.Transaction.create({
                    paymentId: payment.PaymentId,
                    amount: payment.amount,           // hoặc order.totalPrice * 1000 nếu cần chính xác
                    status: 'Success',
                    message: `Thanh toán đơn hàng #${order.OrderId} thành công`
                });
                await payment.save();
                await order.save();
                return resolve({
                    errCode: 0,
                    errMessage: 'Thanh toán thành công'
                });
            } else if (transactionStatus === 'FAILED') {
                payment.status = 'Failed';
                order.status = 'Cancelled';
                await db.Transaction.create({
                    paymentId: payment.PaymentId,
                    amount: payment.amount,
                    status: 'Failed',
                    message: `Thanh toán đơn hàng #${order.OrderId} thất bại`
                });
                await payment.save();
                await order.save();
                return resolve({
                    errCode: 0,
                    errMessage: 'Hủy thanh toán dơn hàng'
                });
            }



        } catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

export default {
    PayOSWebHook
}


