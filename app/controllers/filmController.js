const TMDB = require("../utils/TMDB");

const filmController = {

    getMovieDetails: async (req, res) => {
        // const movieID = req.body.genreID;
        const movieID = '11878';
        const movies = await TMDB.getMovieDetails(movieID);
        return;
    },

    filterMovieByGenre: async (req, res) => {
        const genreID = req.body.genreID;
        const movies = await TMDB.filterMovieByGenre(genreID);
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