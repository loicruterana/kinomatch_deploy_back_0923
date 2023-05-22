const TMDB = require("../utils/TMDB");

const TMDBController = {

   
    getMovieDetails: async (req, res) => {
        const movieID = req.query.movieID;
        const response = await TMDB.getMovieDetails(movieID);
        const details = await response.json();
        res.json(details);  
        return;
    },

    getMovieCredits: async (req, res) => {
        const movieID = req.query.movieID;
        const response = await TMDB.getMovieCredits(movieID);
        const credits = await response.json();
        res.json(credits);  
        return;
    },

    getMovieProvider: async (req, res) => {
        const movieID = req.query.movieID;
        const response = await TMDB.getMovieProvider(movieID);
        const provider = await response.json();
        res.json(provider);  
        return;
    },
  
    getGenresList: async (req, res) => {

        const response = await TMDB.getGenresList();
        const genresList = await response.json();
        console.log(genresList);
        res.json(genresList);  
        return;
    },

    getProvidersList: async (req, res) => {

        const response = await TMDB.getProvidersList();
        const providersList = await response.json();
        console.log(providersList);
        res.json(providersList);  
        return;
    },

    getPersonId: async (req, res) => {

        const typedName = req.body.typedName;
        const response = await TMDB.getPeopleId(typedName);
        const peopleID = await response.json();
        res.json(peopleID);  
        return;
    },

    filterMovie: async (req, res) => {
       
        const genreID = req.query.genreID;
        // const genreID = req.query.genreID;
        const providerID = req.query.providerID;
        // const providerID = req.query.providerID;
        const decade = req.query.decade;
        // const decade = req.query.decade;
        const year1 = decade;
        const year2 = decade + 9;
        // const peopleID = req.query.peopleID;


        const response = await TMDB.filterMovie(year1, year2, genreID, providerID);
        const filteredMovies = await response.json();
        console.log(filteredMovies);
        res.json(filteredMovies);
        return;
    }
   

   
    

}



module.exports = TMDBController;