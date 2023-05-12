const dataMapper = require('../dataMapper.js');

const TMDB = require("../utils/TMDB");

const filmController = {

    getMovieDetails: async (request, response) => {
        try {
            const filmDetails = await dataMapper.getMovieDetailsRequest();
            const watchProvider = await dataMapper.getWatchProviderRequest();
            response.render('filmPage', {filmDetails, watchProvider})
        } catch (error) {
            console.trace(error);
            response.render('404'); 
        }
    },

    fetchAll: async (req, res) => {
        const searchTerm = req.query.searchTerm;
        const movies = await TMDB.fetchMovie(searchTerm);
    }
}

module.exports = filmController;