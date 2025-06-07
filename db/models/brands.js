'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    brandId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brandName: DataTypes.STRING,
    brandLogo: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: 'Brands',
    timestamps: true
  });

  Brand.associate = function(models) {
    Brand.hasMany(models.Product, {
      foreignKey: 'brandId',
      as: 'products'
    });
  };

  return Brand;
};
