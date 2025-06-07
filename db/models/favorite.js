'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Favorite extends Model {
        static associate(models) {

            //1 favorite thuoc ve 1 user
            Favorite.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

            //1 favorite có nhieu item
            Favorite.hasMany(models.FavoriteItem, { foreignKey: 'favoriteId', as: 'items' });
        }
    }
    Favorite.init({
        favoriteId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Favorite',
        tableName: 'Favorites',
        timestamps: true
    });
    return Favorite;
};
