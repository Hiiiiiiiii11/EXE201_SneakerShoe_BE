'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product, {
        foreignKey: 'brandId',
        as: 'products'
      });
    }
  }

  Brand.init({
    brandId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brandName: DataTypes.STRING,
    brandLogo: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brand',
    tableName: 'Brands',
    timestamps: true
  });

  return Brand;
};
