'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Batch extends Model {
        static associate(models) {
            //1 batch có nhiều batch detail
            Batch.hasMany(models.BatchDetail, { foreignKey: 'batchId', as: 'details' });
        }
    };
    Batch.init({
        BatchId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        arrivalDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalCost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        createAt: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        sequelize,
        modelName: 'Batch',
        tableName: 'Batches',
        timestamps: false
    });
    return Batch;
};
