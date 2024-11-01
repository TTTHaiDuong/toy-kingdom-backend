'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        fullName: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};