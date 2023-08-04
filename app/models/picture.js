// je récupère les composants Datatypes et Model de sequelize
const { DataTypes, Model } = require('sequelize');
// je récupère la connexion à la base de données
const sequelize = require('../database');

// je crée ma classe Picture qui étend le modèle Model de sequelize
class Picture extends Model {}
// j'initialise ma classe Picture avec l'attribut codePicture
Picture.init({
    codePicture: {
            // je définis le type de l'attribut codePicture
            type: DataTypes.TEXT,
            // je définis que l'attribut codePicture peut être null
            allowNull: true,
        }
}, {
    // je définis que le modèle doit utiliser la connexion à la base de données
    sequelize,
    // je définis le nom de la table
    tableName: "pictures",
});

// j'exporte le modèle Picture
module.exports = Picture;
            

