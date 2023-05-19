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

  // watched: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  // bookmarked: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // },
  // want_to_see: {
  //   type: DataTypes.TEXT,
  //   allowNull: true,
  // }
  

}, {
  sequelize,
  tableName: "users",
});


module.exports =  User ;