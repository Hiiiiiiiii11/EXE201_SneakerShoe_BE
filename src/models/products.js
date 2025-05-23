'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            //mỗi product có 1 category
            Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
            //1 product có nhiều batch detail
            Product.hasMany(models.BatchDetail, { foreignKey: 'productId', as: 'batchDetails' });
            //1 product có thể xuất hiện trong nhiều orderdetail
            Product.hasMany(models.OrderDetail, { foreignKey: 'productId', as: 'orderDetails' });
        }
    };
    Product.init({
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desciption: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productImgae: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: false
    });
    return Product;
};
