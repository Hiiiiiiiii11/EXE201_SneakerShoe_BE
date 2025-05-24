'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            // mỗi transaction thuộc về 1 payment
            Transaction.belongsTo(models.Payment, { foreignKey: 'paymentId', as: 'payment' });
        }
    };
    Transaction.init({
        TransactionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        paymentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TransactionDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Transaction',
        tableName: 'Transactions',
        timestamps: false
    });
    return Transaction;
};
