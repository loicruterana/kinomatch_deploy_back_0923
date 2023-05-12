const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class User extends Model {}

User.init({
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
    isEmail: true, 
    }
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'member',
  },
}, {
  sequelize,
  tableName: "users",
});


module.exports = { User };