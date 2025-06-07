'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            //mỗi product có 1 category
            Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
            //1 product có nhiều batch detail
            Product.hasMany(models.BatchDetail, { foreignKey: 'productId', as: 'batchDetails' });
            //1 product có thể xuất hiện trong nhiều orderdetail
            Product.hasMany(models.OrderDetail, { foreignKey: 'productId', as: 'orderDetails' });
            // mỗi product thuộc 1 brand
            Product.belongsTo(models.Brand, { foreignKey: 'brandId', as: 'brand' });
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
        description: {
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
        productDetailImg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: true
    });
    return Product;
};
