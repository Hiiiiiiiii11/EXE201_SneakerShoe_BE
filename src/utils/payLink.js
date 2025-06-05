import { payOS } from "../../config/payOSconfig.js";
const generateOrderCode = (orderId) => {
    const random = Math.floor(Math.random() * 100000); // 5 chữ số
    return parseInt(`${orderId}${random}`); // VD: 1234 + 45678 => 123445678
}

export const generatePayOSLink = async (order) => {


    const paymentLink = await payOS.createPaymentLink({
        orderCode: generateOrderCode(order.OrderId),// Truyền số
        amount: amount,
        description: `Thanh toán đơn hàng #${order.OrderId}`,
        returnUrl: "http://localhost:3000/payment-success", // TODO: đổi URL thực tế
        cancelUrl: "http://localhost:3000/payment-cancel",
        items: [
            {
                name: 'Tổng đơn hàng',
                quantity: 1,
                price: amount
            }
        ]
    });

    return paymentLink.checkoutUrl;
};
