const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Watched extends Model {}

Watched.init({
    user_id: {
        type: DataTypes.STRING,
        
      },
    film_id: {
        type: DataTypes.STRING
      }, 
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

}, {
  sequelize,
  tableName: "watched",
});


module.exports = Watched;