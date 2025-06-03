'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class CartItem extends Model {
        static associate(models) {
            CartItem.belongsTo(models.Cart, { foreignKey: 'CartId' });
            CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
        }
    };
    CartItem.init({
        CartItemId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CartId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: { type: DataTypes.INTEGER, defaultValue: 1 },

    }, {
        sequelize,
        modelName: 'CartItem',
        tableName: 'CartItems',
        timestamps: true
    });
    return CartItem;
};
