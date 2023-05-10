const dataMapper = require('../dataMapper.js');

const filmController = {

    getMovieDetails: async (request, response) => {
        try {
            const filmDetails = await dataMapper.getMovieDetailsRequest();
            response.render('filmPage', {filmDetails})
        } catch (error) {
            console.trace(error);
            response.render('404'); 
        }
    }
}

module.exports = filmController;