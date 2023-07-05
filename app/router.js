// on require le package express
const express = require('express');

// on require les controllers
const userController = require('./controllers/userController');
const TMDBController = require('./controllers/TMDBController.js');
const bookmarkedController = require('./controllers/bookmarkedController.js');
const watchedController = require('./controllers/watchedController.js');
const toWatchController = require('./controllers/toWatchController.js');
const movieController = require('./controllers/movieController.js');
const checkLogged = require('./middlewares/checkLogged');

// on crée notre routeur
const router = express.Router();

//ici je récupère la liste des genres tmdb
router.get('/genres', TMDBController.getGenresList);
//ici je récupère la liste des plateformes de streaming
router.get('/providers', TMDBController.getProvidersList);
//ici je récupère les détails généraux d'un film depuis son tmdbID
router.get('/detail', TMDBController.getMovieDetails);
//ici je récupère le cast&crew d'un film depuis son tmdbID
router.get('/credits', TMDBController.getMovieCredits);
//ici je récupère les films similaires à un film depuis son tmdbID
router.get('/recommendedMovies', TMDBController.getRecommendedMovies);
//ici je récupère les films similaires à un film depuis son tmdbID
router.get('/recommendedMoviesSecondPage', TMDBController.getRecommendedMoviesSecondPage);
//ici je récupère la plateforme où un film est dispo depuis son tmdbID
router.get('/provider', TMDBController.getMovieProvider);
//ici je récupère les images d'un film depuis son tmdbID
router.get('/images', TMDBController.getMovieImages);
//ici je récupère les vidéos d'un film depuis son tmdbID
router.get('/videos', TMDBController.getMovieVideos);
// ici je cherche un film en fonction du nom tapé dans la barre de recherche
router.get('/search', TMDBController.searchMovie);
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
router.delete('/deleteWatchedMovie', watchedController.deleteWatchedMovie);

//routes films à voir
//ici je récupère la liste des films à voir d'un user
router.get('/toWatchMovies', toWatchController.toWatchList);
//ici j'insère en bdd un film qu'un user ajoute à sa liste "à voir"
router.post('/toWatchMovies', toWatchController.addToWatchMovie);
//ici je supprime de la bdd un film qu'un user supprime de sa liste "à voir"
router.delete('/deleteToWatchMovie', toWatchController.deleteToWatchMovie);

// routes login
// route de signup
router.post('/signup', userController.signupAction);
// route de connection
router.post('/login', userController.loginAction);
// route de vérification de connection
router.get('/login', userController.checkLogin);
// route de déconnection
router.get('/logout', userController.logout);
// route de suppression de compte
router.delete('/deleteAccount', userController.deleteAccount);

// on exporte le routeur
module.exports = router