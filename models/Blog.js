const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull:true,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        userscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;