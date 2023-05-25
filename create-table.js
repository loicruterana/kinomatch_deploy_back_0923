//Je requête dotenv pour pouvoir avoir accès à mes variables d'environnement
require('dotenv').config();
//Je requête bcrypt pour pouvoir hasher les mots de passe user
const bcrypt = require('bcrypt');
//Je requête sequelize pour pouvoir utiliser cet outil lors de la création de ma bdd
const sequelize = require('./app/database');
// on définit déjà les modèles, sans ça impossible pour sequelize de les connaitre
const  { User, Film, Bookmarked, ToWatch, Watched }  = require('./app/models');

const db = {
  create: async () => {
    try {
    
        console.log(User);

      await sequelize.drop();
      await sequelize.sync();
      // seulement après avoir crée les tables, je peux mettre des choses dedans
      db.seeding();
    }
    catch (error) {
      console.log(error);
    }
  },
  seeding: async () => {
    try {
      const defaultPassword = await bcrypt.hash('kinopw', 10);
      
      const member = await User.create({
        email: 'kino@mail.io',
        password: defaultPassword,
      });

      const member2 = await User.create({
        email: 'kokiri@mail.io',
        password: defaultPassword,
      });

      const member3 = await User.create({
        email: 'gerudo@mail.io',
        password: defaultPassword,
      });

      const film79 = await Film.create({
        codeTMDB: 79    
      });
     
    }
    catch (error) {
      console.log(error);
    }
  },
};

// on execute la fonction qui appelle sequelize.sync qui s'occupe de crée des tables à partir des modèles
db.create();