// on require le package express
const express = require('express');

const mainController = require('./controllers/mainController.js');
const userController = require('./controllers/userController');
const TMDBController = require('./controllers/TMDBController.js');
const bookmarkedController = require('./controllers/bookmarkedController.js');
const watchedController = require('./controllers/watchedController.js');
const toWatchController = require('./controllers/toWatchController.js');
const movieController = require('./controllers/movieController.js');
const checkLogged = require('./middlewares/checkLogged');

// on crée notre routeur
const router = express.Router();


router.get('/', mainController.getHomePage);

//ici je récupère la liste des genres tmdb
router.get('/genres', TMDBController.getGenresList);
//ici je récupère la liste des plateformes de streaming
router.get('/providers', TMDBController.getProvidersList);
//ici je récupère les détails généraux d'un film depuis son tmdbID
router.get('/detail', TMDBController.getMovieDetails);
//ici je récupère le cast&crew d'un film depuis son tmdbID
router.get('/credits', TMDBController.getMovieCredits);
//ici je récupère la plateforme où un film est dispo depuis son tmdbID
router.get('/provider', TMDBController.getMovieProvider);
//ici je sélectionne des films en fonction des filtres de la home
router.get('/films', TMDBController.filterMovie);
//ici je sélectionne des films en fonction des filtres de la home
router.get('/randomFilms', TMDBController.filterRandomMovie);
//ici je sélectionne des films en fonction de de nouveaux filtres de la home
router.get('/filmsAdvanced', TMDBController.filterMovieAdvanced);

//ici j'insère un film dans ma bdd depuis TMDB
router.post('/addMovie', movieController.checkMovie);

//routes films favoris
//ici je récupère la liste des films favoris d'un user
router.get('/bookmarkedMovies', bookmarkedController.bookmarkedList);
//ici j'insère en bdd un film qu'un user ajoute à sa liste "favoris"
router.post('/bookmarkedMovies', bookmarkedController.addBookmarkedMovie);
//ici je supprime de la bdd un film qu'un user supprime de sa liste "favoris"
router.delete('/deletebookmarked', bookmarkedController.deleteBookmarkedMovie);

//routes films vus
//ici je récupère la liste des films vus d'un user
router.get('/watchedMovies', watchedController.watchedList);
//ici j'insère en bdd un film qu'un user ajoute à sa liste "vus"
router.post('/watchedMovies', watchedController.addWatchedMovie);
//ici je supprime de la bdd un film qu'un user supprime de sa liste "vus"
router.delete('/watchedMovies', watchedController.deleteWatchedMovie);

//routes films à voir
//ici je récupère la liste des films à voir d'un user
router.get('/toWatchMovies', toWatchController.toWatchList);
//ici j'insère en bdd un film qu'un user ajoute à sa liste "à voir"
router.post('/toWatchMovies', toWatchController.addToWatchMovie);
//ici je supprime de la bdd un film qu'un user supprime de sa liste "à voir"
router.delete('/toWatchMovies', toWatchController.deleteToWatchMovie);
// routes login
// route de signup
router.post('/signup', userController.signupAction);
// route de connection
router.post('/login', userController.loginAction);
// route de déconnection
router.get('/logout', checkLogged, userController.logout);
// route de suppression de compte
router.delete('/deleteAccount', userController.deleteAccount);

module.exports = router