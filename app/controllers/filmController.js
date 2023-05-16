const TMDB = require("../utils/TMDB");

const filmController = {

    getMovieDetails: async (req, res) => {
        // const movieID = req.query.movieID;
        // const movieID = '11878';
        const response = await TMDB.getMovieDetails();
        const movie = await response.json();
        console.log(movie)
        
        return;
    },

    filterMovieByGenre: async (req, res) => {
        // const genreID = req.query.genreID;
        const response = await TMDB.filterMovieByGenre();
        const chosenGenre = await response.json();
        console.log(chosenGenre);
        return;
    },

    filterMovieByYear: async (req, res) => {
        const year = req.body.year;
        const movies = await TMDB.filterMovieByYear(year);
        return;
    },

    filterMovieByWatchProvider: async (req, res) => {
        const providerID = req.query.providerID;
        const movies = await TMDB.filterMovieByWatchProvider(providerID);
        return;
    }
}

module.exports = filmController;