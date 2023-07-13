//Je requête dotenv pour pouvoir avoir accès à mes variables d'environnement
require('dotenv').config();
//Je requête bcrypt pour pouvoir hasher les mots de passe user
const bcrypt = require('bcrypt');
//Je requête sequelize pour pouvoir utiliser cet outil lors de la création de ma bdd
const sequelize = require('./app/database');
// on définit déjà les modèles, sans ça impossible pour sequelize de les connaitre
const { User, Film, Bookmarked, ToWatch, Watched } = require('./app/models');
// const { User } = require('./app/models/user.js');
// const { Film } = require('./app/models/film.js');
// const { Bookmarked } = require('./app/models/bookmarked.js');
// const { ToWatch } = require('./app/models/toWatch.js');
// const { Watched } = require('./app/models/user.js');

// Je crée un objet db qui permet de créer la bdd et de la remplir
const db = {
  // on crée une fonction create qui va créer la bdd
  create: async () => {
    try {
      // on supprime les tables si elles existent déjà
      await sequelize.drop();
      // on crée les tables
      await sequelize.sync();
      // seulement après avoir crée les tables, je peux mettre des choses dedans
      db.seeding();
    } catch (error) {
      console.log(error);
    }
  },
  // on crée une fonction seeding qui va remplir la bdd avec un user et un film par défaut
  seeding: async () => {
    try {
      const defaultPassword = await bcrypt.hash('kinopw', 10);

      const member = await User.create({
        email: 'kino@mail.io',
        password: defaultPassword,
      });

      const film79 = await Film.create({
        codeTMDB: 79,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

// on execute la fonction qui appelle sequelize.sync qui s'occupe de crée des tables à partir des modèles
db.create();
