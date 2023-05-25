const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class ToWatch extends Model {}

ToWatch.init({
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
  tableName: "toWatch",
});


module.exports = ToWatch;