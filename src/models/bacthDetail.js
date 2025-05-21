'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BatchDetail extends Model {
        static associate(models) {
            //mỗi batch detail thuộc về 1 batch
            BatchDetail.belongsTo(models.Batch, { foreignKey: 'batchId', as: 'batch' });

            //1 battch detail có 1 product
            BatchDetail.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
        }
    };
    BatchDetail.init({
        BatchDetailId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        batchId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INT,
            allowNull: false
        },
        costPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        promotionId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    }, {
        sequelize,
        modelName: 'BatchDetail',
        tableName: 'BatchDetails',
        timestamps: false
    });
    return BatchDetail;
};
