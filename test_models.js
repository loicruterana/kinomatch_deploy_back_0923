// On pense à executer la méthode config() du module dotenv pour avoir accès aux variables d'environnements
require('dotenv').config();

const { User } = require('./app/models/user');

// Fonction pour tester nos modèles
async function run() {
  // =====
  // Lists
  // =====

  // Lecture
  const users = await User.findAll();
  console.log(users);

}

run();