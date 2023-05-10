// CONNEXION A LA BASE DE DONNEE :

// on commence par require le module pg
const { Client } = require('pg');

// on crée un client qui récupère les infos de connexion à la BDD dans les variables d'envinnement (fichier.env)
const client = new Client();
// ici pas besoin de require dotenv, il est déja require une fois pour toutes dans l'index

// on connecte ce client
client.connect();

// on est connectés !

// on exporte notre client connecté
module.exports = client;

// là où on a besoin de faire des requêtes à la BDD, il faut require cette connexion