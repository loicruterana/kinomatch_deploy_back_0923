// je récupère les composants Datatypes et Model de sequelize
const { DataTypes, Model } = require('sequelize');
// je récupère la connexion à la base de données
const sequelize = require('../database');
// je crée ma classe User qui étend le modèle Model de sequelize
class User extends Model {}
// j'initialise ma classe User avec les attributs email, password, createdAt et updatedAt
User.init(
  {
    email: {
      // je définis le type de l'attribut pseudo
      type: DataTypes.TEXT,
      // je définis que l'attribut pseudo ne peut pas être null
      allowNull: false,
      // je définis que l'attribut pseudo doit être unique
      unique: true,
      // je définis que l'attribut email doit être une adresse email
      // validate: {
      //   isEmail: true,
      // },
    },
    password: {
      // je définis le type de l'attribut password
      type: DataTypes.TEXT,
      // je définis que l'attribut password ne peut pas être null
      allowNull: false,
    },
    picture: {
      // je définis le type de l'attribut picture
      type: DataTypes.TEXT,
      // je définis que l'attribut picture peut être null
      allowNull: true,
    },
  },
  {
    // je définis que le modèle doit utiliser la connexion à la base de données
    sequelize,
    // je définis le nom de la table
    tableName: 'users',
  }
);

// j'exporte le modèle User
module.exports = User;
