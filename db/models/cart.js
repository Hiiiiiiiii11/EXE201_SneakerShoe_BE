'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.User, { foreignKey: 'userId' });
            Cart.hasMany(models.CartItem, { foreignKey: 'CartId' });
        }
    };
    Cart.init({
        CartId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    }, {
        sequelize,
        modelName: 'Cart',
        tableName: 'Carts',
        timestamps: true
    });
    return Cart;
};
