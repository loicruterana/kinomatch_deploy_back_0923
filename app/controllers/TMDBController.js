// je définis la variable TMDB qui récupère le fichier TMDB.js
const TMDB = require("../utils/TMDB");
// je définis la variable TMDBController qui contient un objet avec les méthodes getMovieDetails, getMovieCredits, getRecommendedMovies, getMovieProvider, getGenresList, getProvidersList, getPersonId, searchMovie, filterMovie
const TMDBController = {

    // je définis la méthode getMovieDetails qui permet de récupérer les détails d'un film depuis son tmdbID
    getMovieDetails: async (req, res) => {
        // je définis la variable movieID qui récupère l'id du film via la query string
        const movieID = req.query.movieID;
        console.log(movieID);
        // je définis la variable response qui envoie le movieID à la méthode getMovieDetails du fichier TMDB.js
        const response = await TMDB.getMovieDetails(movieID);
        // je récupère les détails du film dans un objet json
        const details = await response.json();
        // j'envoie les détails du film dans un nouveau fichier json
        res.json(details);  
        return;
    },
    // je définis la méthode getMovieCredits qui permet de récupérer les acteurs et l'équipe technique d'un film depuis son tmdbID
    getMovieCredits: async (req, res) => {
        // je définis la variable movieID qui récupère l'id du film via la query string
        const movieID = req.query.movieID;
        // je définis la variable response qui envoie le movieID à la méthode getMovieCredits du fichier TMDB.js
        const response = await TMDB.getMovieCredits(movieID);
        // je récupère les acteurs et l'équipe technique du film dans un objet json
        const credits = await response.json();
        // j'envoie les acteurs et l'équipe technique du film dans un nouveau fichier json
        res.json(credits);  
        return;
    },
    // je définis la méthode getRecommendedMovies qui permet de récupérer les films recommandés depuis le tmdbID d'un film
    getRecommendedMovies: async (req, res) => {
        // je définis la variable movieID qui récupère l'id du film via la query string
        const movieID = req.query.movieID;
        // je définis la variable response qui envoie le movieID à la méthode getRecommendedMovies du fichier TMDB.js
        const response = await TMDB.getRecommendedMovies(movieID);
        // je récupère les films recommandés dans un objet json
        const recommendedMovies = await response.json();
        console.log(recommendedMovies);
        // j'envoie les films recommandés dans un nouveau fichier json
        res.json(recommendedMovies);  
        return;
    },
     getRecommendedMoviesSecondPage: async (req, res) => {
        // je définis la variable movieID qui récupère l'id du film via la query string
        const filmID = req.query.filmID;
        // je définis la variable page qui récupère le numéro de la page via la query string
        const page = req.query.page;
        // je définis la variable response qui envoie le movieID à la méthode getRecommendedMovies du fichier TMDB.js
        const response = await TMDB.getRecommendedMoviesSecondPage(filmID, page);
        // je récupère les films recommandés dans un objet json
        const recommendedMovies = await response.json();
        // j'envoie les films recommandés dans un nouveau fichier json
        res.json(recommendedMovies);  
        return;
    },
    // je définis la méthode getMovieProvider qui permet de récupérer les plateformes de streaming d'un film depuis son tmdbID
    getMovieProvider: async (req, res) => {
        // je définis la variable movieID qui récupère l'id du film via la query string
        const movieID = req.query.movieID;
        // je définis la variable response qui envoie le movieID à la méthode getMovieProvider du fichier TMDB.js
        const response = await TMDB.getMovieProvider(movieID);
        // je récupère les plateformes de streaming du film dans un objet json
        const provider = await response.json();
        // j'envoie les plateformes de streaming du film dans un nouveau fichier json
        res.json(provider);  
        return;
    },
    getMovieImages: async (req, res) => {
        // je définis la variable movieID qui récupère l'id du film via la query string
        const movieID = req.query.movieID;
        console.log(movieID);
        // je définis la variable response qui envoie le movieID à la méthode getMovieImages du fichier TMDB.js
        const response = await TMDB.getMovieImages(movieID);
        // je récupère les images du film dans un objet json
        const images = await response.json();
        // j'envoie les images du film dans un nouveau fichier json
        res.json(images);
        return;
    },
    // je définis la méthode getGenresList qui récupère la liste des genres de films depuis la méthode getGenresList du fichier TMDB.js
    getGenresList: async (req, res) => {
        // je définis la variable response qui récupère la méthode getGenresList du fichier TMDB.js
        const response = await TMDB.getGenresList();
        // je transforme la liste des genres de films en objet json
        const genresList = await response.json();
        // j'envoie la liste des genres de films dans un nouveau fichier json
        res.json(genresList);  
        return;
    },
    // je définis la méthode getProvidersList qui permet de récupérer la liste des plateformes de streaming
    getProvidersList: async (req, res) => {
        // je définis la variable response qui récupère les plateformes de streaming depuis la méthode getProvidersList du fichier TMDB.js
        const response = await TMDB.getProvidersList();
        // je transforme la liste des plateformes de streaming en objet json
        const providersList = await response.json();
        // j'envoie la liste des plateformes de streaming dans un nouveau fichier json
        res.json(providersList);  
        return;
    },
    // je définis la méthode getPersonId qui permet de récupérer l'id d'une personne depuis son nom
    getPersonId: async (req, res) => {
        // je définis la variable typedName qui récupère le nom de la personne via la query string
        const typedName = req.body.typedName;
        // je définis la variable response qui envoie le nom de la personne à la méthode getPersonId du fichier TMDB.js
        const response = await TMDB.getPeopleId(typedName);
        // je récupère l'id de la personne dans un objet json
        const peopleID = await response.json();
        // j'envoie l'id de la personne dans un nouveau fichier json
        res.json(peopleID);  
        return;
    },
    // je définis la méthode searchMovie qui permet de récupérer les films correspondant à la recherche de l'utilisateur
    searchMovie: async (req, res) => {
        // je définis la variable typedName qui récupère le nom du film via la query string
        const typedName = req.query.typedName;
        // je définis la variable page qui récupère le numéro de la page via la query string
        const page = req.query.page;
        // je définis la variable response qui envoie le nom du film à la méthode searchMovie du fichier TMDB.js
        const response = await TMDB.searchMovie(typedName, page);
        // je récupère les films correspondant à la recherche dans un objet json
        const searchedMovies = await response.json();
        // j'envoie les films correspondant à la recherche dans un nouveau fichier json
        res.json(searchedMovies);  
        return;
    },
    // je définis la méthode filterMovie qui permet de récupérer les films correspondant aux filtres choisis par l'utilisateur
    filterMovie: async (req, res) => {
       // je définis la variable genreID qui récupère l'id du genre via la query string
        const genreID = req.query.genreID;
        // je définis la variable providerID qui récupère l'id de la plateforme de streaming via la query string
        const providerID = req.query.providerID;
        // je définis la variable decade qui récupère la décennie via la query string
        const decade = req.query.decade;
        // je définis la variable year1 qui transforme la décennie en nombre correspondant à la première année de la décennie
        const year1 = Number(decade);
        // je définis la variable year2 qui transforme la décennie en nombre correspondant à la dernière année de la décennie
        const year2 = Number(decade) + 9;
        // je définis la variable response qui envoie les paramètres à la méthode filterMovie du fichier TMDB.js
        const response = await TMDB.filterMovie(year1, year2, genreID, providerID);
        // je récupère les films correspondant aux filtres dans un objet json
        const filteredMovies = await response.json();
        // j'envoie les films correspondant aux filtres dans un nouveau fichier json  
        res.json(filteredMovies);
        return;
    },
    // je définis la méthode filterRandomMovie qui correspond à la méthode filterMovie mais avec un paramètre randomPage récupéré grâce au front
    filterRandomMovie: async (req, res) => {
       
        // je définis la variable genreID qui récupère l'id du genre via la query string
        const genreID = req.query.genreID;
        // je définis la variable providerID qui récupère l'id de la plateforme de streaming via la query string
        const providerID = req.query.providerID;
       // je définis la variable decade qui récupère la décennie via la query string
        const decade = req.query.decade;
        // je définis la variable year1 qui transforme la décennie en nombre correspondant à la première année de la décennie
        const year1 = Number(decade);
        // je définis la variable year2 qui transforme la décennie en nombre correspondant à la dernière année de la décennie
        const year2 = Number(decade) + 9;
        // je définis la variable randomPage qui récupère la page aléatoire via la query string
        const randomPage = req.query.randomPage;
        // je définis la variable response qui envoie les paramètres à la méthode filterRandomMovie du fichier TMDB.js
        const response = await TMDB.filterRandomMovie(year1, year2, genreID, providerID, randomPage);
        // je récupère les films correspondant aux filtres dans un objet json
        const filteredMovies = await response.json();
        // j'envoie les films correspondant aux filtres dans un nouveau fichier json
        console.log(filteredMovies);
        res.json(filteredMovies);
        return;

    },
    // même méthode que filterMovie mais avec des paramètres supplémentaires (country pour la nationalité, cast pour les acteurs)
    filterMovieAdvanced: async (req, res) => {
       // je définis la variable genreID qui récupère l'id du genre via la query string
        const genreID = req.query.genreID;
        // je définis la variable providerID qui récupère l'id de la plateforme de streaming via la query string
        const providerID = req.query.providerID;
        // je définis la variable decade qui récupère la décennie via la query string
        const decade = req.query.decade;
        // je définis la variable year1 qui transforme la décennie en nombre correspondant à la première année de la décennie
        const year1 = Number(decade);
        // je définis la variable year2 qui transforme la décennie en nombre correspondant à la dernière année de la décennie
        const year2 = Number(decade) + 9;
        // je définis la variable countryID qui récupère l'id du pays via la query string
        const countryID = req.query.countryID;
        // je définis la variable castID qui récupère l'id de l'acteur via la query string
        const castID = req.query.castID;


        // const runtime = 120;
        // const runtime = req.query.runtime; (ex : )
        // const runtime2 = Number(runtime);
        // const runtime1 = Number(runtime) - 30;

        // je définis la variable response qui envoie les paramètres à la méthode filterMovieAdvanced du fichier TMDB.js
        const response = await TMDB.filterMovieAdvanced(year1, year2, genreID, providerID, countryID, castID);
        // je récupère les films correspondant aux filtres dans un objet json
        const filteredMovies = await response.json();
        // j'envoie les films correspondant aux filtres dans un nouveau fichier json
        res.json(filteredMovies);
        return;
    },
}

// j'exporte le module TMDBController
module.exports = TMDBController;