// je récupère les composants Datatypes et Model de sequelize
const { DataTypes, Model } = require('sequelize');
// je récupère la connexion à la base de données
const sequelize = require('../database');

// je crée ma classe Watched qui étend le modèle Model de sequelize
class Watched extends Model {}

// j'initialise ma classe Watched avec les attributs user_id, film_id, createdAt et updatedAt
Watched.init({
    user_id: {
      // je définis le type de l'attribut user_id
      type: DataTypes.STRING,       
      },
    film_id: {
        // je définis le type de l'attribut film_id
        type: DataTypes.STRING
      }, 
    // je définis les attributs createdAt qui correspond à la date de création de l'entrée dans la table et updatedAt qui correspond à la date de mise à jour de l'entrée dans la table
    createdAt: {
      // je définis le type de l'attribut createdAt
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      // je définis le type de l'attribut updatedAt
      type: DataTypes.DATE,
      allowNull: true,
    },

}, {
  // je définis que le modèle doit utiliser la connexion à la base de données
  sequelize,
  // je définis le nom de la table
  tableName: "watched",
});

// j'exporte le modèle Watched
module.exports = Watched;