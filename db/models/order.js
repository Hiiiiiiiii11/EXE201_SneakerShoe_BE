'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // mỗi order thuộc về 1 user
            Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            // 1 order có nhiều order detail
            Order.hasMany(models.OrderDetail, { foreignKey: 'orderId', as: 'orderdetails' });
            //mỗi order có thể thanh toán lại nhiều lần nếu lỗi
            Order.hasMany(models.Payment, { foreignKey: 'orderId', as: 'payments' });
            // mỗi order thuộc về 1 payment
            Order.belongsTo(models.Payment, { foreignKey: 'paymentId', as: 'payment' });
            //mỗi order có thể có 1 promotion
            Order.belongsTo(models.Promotion, { foreignKey: 'promotionId', as: 'promotion' });
        }
    };
    Order.init({
        OrderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        promotionId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'Orders',
        timestamps: true
    });
    return Order;
};
