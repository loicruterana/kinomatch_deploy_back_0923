// je récupère les composants Datatypes et Model de sequelize
const { DataTypes, Model } = require('sequelize');
// je récupère la connexion à la base de données
const sequelize = require('../database');

// je crée ma classe Film qui étend le modèle Model de sequelize
class Film extends Model {}

// j'initialise ma classe Film avec l'attribut codeTMDB
Film.init({
  codeTMDB: {
    // je définis le type de l'attribut codeTMDB
    type: DataTypes.INTEGER,
    // je définis que l'attribut codeTMDB peut être null
    allowNull: true,
  },
}, {
  // je définis que le modèle doit utiliser la connexion à la base de données
  sequelize,
  // je définis le nom de la table
  tableName: "films",
});

// j'exporte le modèle Film
module.exports = Film;