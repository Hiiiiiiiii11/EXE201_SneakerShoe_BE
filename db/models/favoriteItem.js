'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class FavoriteItem extends Model {
        static associate(models) {
            //1 favorite item thuoc ve 1 favorite
            FavoriteItem.belongsTo(models.Favorite, { foreignKey: 'favoriteId', as: 'favorite' });
            //1 favorite item có 1 product
            FavoriteItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
        }
    }
    FavoriteItem.init({
        favoriteItemId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        favoriteId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'FavoriteItem',
        tableName: 'FavoriteItems',
        timestamps: true
    });
    return FavoriteItem;
};
