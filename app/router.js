// on require le package express
const express = require('express');

const mainController = require('./controllers/mainController.js');
const userController = require('./controllers/userController');
const TMDBController = require('./controllers/TMDBController.js');
const bookmarkedController = require('./controllers/bookmarkedController.js');
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
//ici je sélectionne des films en fonction des filtres de la home
router.get('/filmsAdvanced', TMDBController.filterMovieAdvanced);

//ici j'insère un film dans ma bdd
router.post('/addMovie', movieController.checkMovie);

//routes films sauvegardés
//ici je récupère la liste des films favoris d'un user
router.get('/bookmarkedMovies', bookmarkedController.bookmarkedList);
//ici j'insère en bdd un film qu'un user ajoute à sa liste "favoris"
router.post('/bookmarkedMovies', bookmarkedController.addBookmarkedMovie);
//ici je supprime de la bdd un film qu'un user supprime de sa liste "favoris"
router.delete('/bookmarkedMovies', bookmarkedController.deleteBookmarkedMovie);

// routes login
// route d'inscription
router.post('/signup', userController.signupAction);
// route de connection
router.post('/login', userController.loginAction);
// route de déconnection
router.get('/logout', checkLogged, userController.logout);
// route de suppression de compte
router.delete('/deleteAccount', userController.deleteAccount);

module.exports = router