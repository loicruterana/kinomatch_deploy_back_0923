const dataMapper = require('../dataMapper.js');

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
    }
}

module.exports = filmController;