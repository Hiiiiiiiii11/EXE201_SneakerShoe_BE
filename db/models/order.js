'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // mỗi order thuộc về 1 user
            Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            // 1 order có nhiều order detail
            Order.hasMany(models.OrderDetail, { foreignKey: 'orderId', as: 'details' });
            // mỗi order thuộc về 1 payment
            Order.belongsTo(models.Payment, { foreignKey: 'paymentId', as: 'payment' });
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
        orderDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'Orders',
        timestamps: false
    });
    return Order;
};
