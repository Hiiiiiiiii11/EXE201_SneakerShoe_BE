'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
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
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'Roles',
        timestamps: true
    });
    return Role;
};
