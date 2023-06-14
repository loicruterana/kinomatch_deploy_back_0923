// je récupère les composants Datatypes et Model de sequelize
const { DataTypes, Model } = require('sequelize');
// je récupère la connexion à la base de données
const sequelize = require('../database');
// je crée ma classe ToWatch qui étend le modèle Model de sequelize
class ToWatch extends Model {}
// j'initialise ma classe ToWatch avec les attributs user_id, film_id, createdAt et updatedAt
ToWatch.init({
    user_id: {
        // je définis le type de l'attribut user_id
        type: DataTypes.STRING,
      },
    film_id: {
      // je définis le type de l'attribut film_id
        type: DataTypes.STRING
      }, 
    // je définis l'attribut createdAt qui va contenir la date de création de l'instance
    createdAt: {
      // je définis le type de l'attribut createdAt
      type: DataTypes.DATE,
      // je définis que l'attribut createdAt peut être null
      allowNull: true,
    },
    // je définis l'attribut updatedAt qui va contenir la date de mise à jour de l'instance
    updatedAt: {
      type: DataTypes.DATE,
      // je définis que l'attribut updatedAt peut être null
      allowNull: true,
    },

}, {
  // je définis que le modèle doit utiliser la connexion à la base de données
  sequelize,
  // je définis le nom de la table
  tableName: "toWatch",
});

// j'exporte le modèle ToWatch
module.exports = ToWatch;