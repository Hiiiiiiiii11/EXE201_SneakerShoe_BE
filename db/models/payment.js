'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            // mỗi payment có 1 order
            Payment.hasOne(models.Order, { foreignKey: 'paymentId', as: 'order' });
            // 1 payment có nhiều giao dịch
            Payment.hasMany(models.Transaction, { foreignKey: 'paymentId', as: 'transactions' });

        }
    };
    Payment.init({
        PaymentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        method: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },

    }, {
        sequelize,
        modelName: 'Payment',
        tableName: 'Payments',
        timestamps: true
    });
    return Payment;
};
