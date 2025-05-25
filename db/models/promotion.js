'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Promotion extends Model {
        static associate(models) {

            Promotion.hasMany(models.OrderDetail, { foreignKey: 'promotionId', as: 'orderDetails' });

        }
    };
    Promotion.init({
        PromotionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        PromotionName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desciption: {
            type: DataTypes.STRING,
            allowNull: true
        },
        discountPercent: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        miniumAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Promotion',
        tableName: 'Promotions',
        timestamps: false
    });
    return Promotion;
};
