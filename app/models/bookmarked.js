const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Bookmarked extends Model {}

Bookmarked.init({
    user_id: {
        type: DataTypes.STRING,
        
      },
    film_id: {
        type: DataTypes.STRING
        // allowNull defaults to true
      }
}, {
  sequelize,
  tableName: "bookmarked",
});


module.exports = Bookmarked;