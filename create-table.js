require('dotenv').config();
const bcrypt = require('bcrypt');
// pour réaliser une création de table avec sequelize
// on part de notre objet connecté à la bdd
// un require va executer le code du module ciblé
const sequelize = require('./app/database');
// on définit déjà les modèles, sans ça impossible pour sequelize de les connaitre
const  { User, Film, Bookmarked }  = require('./app/models');
// const  Watched  = require('./app/models/watched');

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