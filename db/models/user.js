'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            //mỗi user có 1 role
            Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
            // 1 user có nhiều order
            User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
            //1 user có nhiều review
            User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
        }
    };
    User.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        password: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        phoneNumber: DataTypes.STRING,
        address: DataTypes.STRING,
        assignAt: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        image: DataTypes.STRING,
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        } // hoặc STRING nếu bạn lưu URL hoặc base64
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: false // nếu bạn không dùng createdAt/updatedAt
    });
    return User;
};
