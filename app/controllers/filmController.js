const TMDB = require("../utils/TMDB");

const filmController = {

    getMovieDetails: async (req, res) => {
        const movieID = req.query.movieID;
        const movies = await TMDB.getMovieDetails(movieID);
        return;
    },

    filterMovieByGenre: async (req, res) => {
        const genreID = req.query.genreID;
        const movies = await TMDB.filterMovieByGenre(genreID);
        return;
    },

    filterMovieByYear: async (req, res) => {
        const genreID = req.query.genreID;
        const movies = await TMDB.filterMovieByGenre(genreID);
        return;
    }
}

module.exports = filmController;