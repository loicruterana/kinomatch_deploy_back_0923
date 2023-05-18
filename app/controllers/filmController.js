const TMDB = require("../utils/TMDB");

const filmController = {

   
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
  
    // getGenresList: async (req, res) => {

    //     const response = await TMDB.getGenresList();
    //     const genresList = await response.json();
    //     console.log(genresList);
    //     res.json(genresList);  
    //     return;
    // },

    // getProvidersList: async (req, res) => {

    //     const response = await TMDB.getProvidersList();
    //     const providersList = await response.json();
    //     console.log(providersList);
    //     res.json(providersList);  
    //     return;
    // },

    getPersonId: async (req, res) => {

        const typedName = req.body.typedName;
        const response = await TMDB.getPeopleId(typedName);
        const peopleID = await response.json();
        res.json(peopleID);  
        return;
    },

    filterMovie: async (req, res) => {
       
        const genreID = req.query.genreID;
        const providerID = req.query.providerID;
        const decade = req.query.decade;
        const year1 = decade;
        const year2 = decade + 9;
        // const peopleID = req.query.peopleID;


        const response = await TMDB.filterMovie(year1, year2, genreID, providerID);
        const filteredMovies = await response.json();
        res.json(filteredMovies);
        return;
    }
    // filterMovieByGenre: async (req, res) => {
    //     const genreID = req.query.genreID;
    //     const response = await TMDB.filterMovieByGenre(genreID);
    //     const chosenGenre = await response.json();
    //     console.log(chosenGenre);
    //     res.json(chosenGenre);
    //     return;
    // },

    // filterMovieByWatchProvider: async (req, res) => {
    //     const providerID = req.query.providerID;
    //     const movies = await TMDB.filterMovieByWatchProvider(providerID);
    //     return;
    // },

    // filterMovieByPeople: async (req, res) => {
    //     const peopleID = req.query.peopleID;
    //     const response = await TMDB.filterMovieByActor(peopleID);
    //     const chosenPeople = await response.json();
    //     console.log(chosenPeople);
    //     res.json(chosenPeople);
    //     return;
    // },

   
    

}



module.exports = filmController;