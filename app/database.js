// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.PG_URL, { define: {
//   underscored: true,
// }});
const pg = require('pg');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectModule: pg,  
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;