'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            //1 category có nhiều product
            Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });
        }
    };
    Category.init({
        CategoryId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'Categorys',
        timestamps: false
    });
    return Category;
};
