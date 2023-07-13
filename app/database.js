// ici je require le package sequelize
const Sequelize = require('sequelize');

// ici je crée une instance sequelize qui se connecte à ma bdd
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   // dialectModule: pg,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {}, //removed ssl
});

// ici j'établis la connexion à la bdd heroku
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

//
module.exports = sequelize;
