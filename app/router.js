// on require le package express
const express = require('express');

const mainController = require('./controllers/mainController.js');
const userController = require('./controllers/userController');
const filmController = require('./controllers/filmController.js');

// on crée notre routeur
const router = express.Router();


// ici j'utilise la méthode getHomePage que j'ai créé dans mon controlleur et qui s'occupe de render la page
router.get('/', mainController.getHomePage);

// ici j'utilise la méthode getMovieDetails que j'ai créé dans mon controlleur et qui s'occupe de render la page
router.get('/film', filmController.getMovieDetails, filmController.getMovieCredits);

// ici j'utilise la méthode filterMovieByGenre que j'ai créé dans mon controlleur
router.get('/films', filmController.filterMovieByGenre);

// ici j'utilise la méthode getGenresList que j'ai créé dans mon controlleur
router.get('/genres', filmController.getGenresList)

// ici j'utilise la méthode getGenresList que j'ai créé dans mon controlleur
router.get('/providers', filmController.getProvidersList)

// routes login
// router.get('/signup', userController.signup);
router.post('/signup', userController.signupAction);

// router.get('/login', userController.login);
router.post('/login', userController.loginAction);

// router.get('/logout', checkLogged, userController.logout);
// router.get('/profil', checkLogged, userController.profil);

module.exports = router