// on require le package express
const express = require('express');

const mainController = require('./controllers/mainController.js');

const filmController = require('./controllers/filmController.js');

// on crée notre routeur
const router = express.Router();


// ici j'utilise la méthode getHomePage que j'ai créé dans mon controlleur et qui s'occupe de render la page
router.get('/', mainController.getHomePage);
// ici j'utilise la méthode getMovieDetails que j'ai créé dans mon controlleur et qui s'occupe de render la page
router.get('/film', filmController.getMovieDetails);

// on n'oublie pas d'exporter le module (= le rendre dispo aux autre modules, aux autres fichiers)
module.exports = router