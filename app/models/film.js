const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Film extends Model {}

Film.init({
  codeTMDB: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: "films",
});


module.exports =  Film ;