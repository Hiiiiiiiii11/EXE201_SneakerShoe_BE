'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Size extends Model {
        static associate(models) {
            // 1 size có thể xuất hiện trong nhiều batch detail
            Size.hasMany(models.BatchDetail, { foreignKey: 'sizeId', as: 'batchdetails' });
        }
    };
    Size.init({
        sizeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        sizeNumber: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Size',
        tableName: 'Sizes',
        timestamps: false
    });
    return Size;
};
