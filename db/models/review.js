'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {

            //mỗi review thuộc về 1 user
            Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            //mỗi review thuộc 1 orderdetail
            Review.belongsTo(models.OrderDetail, { foreignKey: 'orderDetailId', as: 'orderDetail' });
        }
    };
    Review.init({
        ReviewId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        orderDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Review',
        tableName: 'Reviews',
        timestamps: true
    });
    return Review;
};
