'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {

            //1 role có nhiều user
            Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
        }
    };
    Role.init({
        roleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'Roles',
        timestamps: false
    });
    return Role;
};
