'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        static associate(models) {
            // 1 order detail thuộc về 1 order
            OrderDetail.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
            //1 order detail có 1 product
            OrderDetail.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
            //mỗi orderdetail có 1 review
            OrderDetail.hasOne(models.Review, { foreignKey: 'orderDetail', as: 'review' });

            OrderDetail.belongsTo(models.Promotion, { foreignKey: 'promotionId', as: 'promotion' });

        }
    };
    OrderDetail.init({
        OrderDetailId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        batchId: {
            type: DataTypes.INT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'OrderDetail',
        tableName: 'OrderDetails',
        timestamps: false
    });
    return OrderDetail;
};
