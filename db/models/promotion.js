'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Promotion extends Model {
        static associate(models) {

            Promotion.hasMany(models.Order, { foreignKey: 'promotionId', as: 'order' });

        }
    };
    Promotion.init({
        PromotionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        promotionName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
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
        minimumAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Promotion',
        tableName: 'Promotions',
        timestamps: true
    });
    return Promotion;
};
