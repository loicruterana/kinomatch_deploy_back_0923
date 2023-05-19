const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Watched extends Model {}

Watched.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
}, {
  sequelize,
  tableName: "watched",
});


module.exports = Watched;