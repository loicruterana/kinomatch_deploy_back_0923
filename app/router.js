// on require le package express
const express = require('express');

const mainController = require('./controllers/mainController.js');
const userController = require('./controllers/userController');
const filmController = require('./controllers/filmController.js');
const watchedController = require('./controllers/watchedController.js');
// on crée notre routeur
const router = express.Router();


// ici j'utilise la méthode getHomePage que j'ai créé dans mon controlleur et qui s'occupe de render la page
router.get('/', mainController.getHomePage);

router.get('/detail', filmController.getMovieDetails);

router.get('/credits', filmController.getMovieCredits);

router.get('/provider', filmController.getMovieProvider);

router.get('/films', filmController.filterMovie);

router.get('/genres', filmController.getGenresList);

router.get('/providers', filmController.getProvidersList)


router.get('/watched', watchedController.watchedList);

router.post('/watched', watchedController.addWatchedMovie);

// routes login
// router.get('/signup', userController.signup);
router.post('/signup', userController.signupAction);

// router.get('/login', userController.login);
router.post('/login', userController.loginAction);

// router.get('/logout', checkLogged, userController.logout);
// router.get('/profil', checkLogged, userController.profil);

module.exports = router