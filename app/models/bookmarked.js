// je récupère les composants Datatypes et Model de sequelize
const { DataTypes, Model } = require('sequelize');
// je récupère la connexion à la base de données
const sequelize = require('../database');

// je crée ma classe Bookmarked qui étend le modèle Model de sequelize
class Bookmarked extends Model {}
//j'initialise ma classe Bookmarked avec les attributs user_id, film_id, createdAt et updatedAt
Bookmarked.init({
    user_id: {
        // je définis le type de l'attribut user_id
        type: DataTypes.STRING,  
      },
    film_id: {
        // je définis le type de l'attribut film_id
        type: DataTypes.STRING
      }, 
    createdAt: {
      // je définis le type de l'attribut createdAt
      type: DataTypes.DATE,
      // je définis que l'attribut peut être null
      allowNull: true,
    },
    updatedAt: {
      // je définis le type de l'attribut updatedAt
      type: DataTypes.DATE,
      //
      allowNull: true,
    },

}, {
  // je définis que le modèle doit utiliser la connexion à la base de données
  sequelize,
  // je définis le nom de la table
  tableName: "bookmarked",
});

//
module.exports = Bookmarked;