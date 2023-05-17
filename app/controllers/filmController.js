const TMDB = require("../utils/TMDB");

const filmController = {

    getMovieDetails: async (req, res) => {
        const movieID = req.query.movieID;
        // const movieID = '11878';
        const response = await TMDB.getMovieDetails(movieID);
        const movie = await response.json();
        res.json(movie);  
        return;
    },

    filterMovieByGenre: async (req, res) => {
        const genreID = req.query.genreID;
        const response = await TMDB.filterMovieByGenre(genreID);
        const chosenGenre = await response.json();
        console.log(chosenGenre);
        res.json(chosenGenre);
        return;
    },

    getGenresList: async (req, res) => {

        const response = await TMDB.getGenresList();
        const genresList = await response.json();
        console.log(genresList);
        res.json(genresList);  
        return;
    },
    
    filterMovieByWatchProvider: async (req, res) => {
        const providerID = req.query.providerID;
        const movies = await TMDB.filterMovieByWatchProvider(providerID);
        return;
    },

    filterMovieByYear: async (req, res) => {
        const year = req.body.year;
        const movies = await TMDB.filterMovieByYear(year);
        return;
    },

   


}

module.exports = filmController;