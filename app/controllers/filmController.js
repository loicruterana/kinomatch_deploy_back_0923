const TMDB = require("../utils/TMDB");

const filmController = {

    getMovieDetails: async (req, res) => {
        const movieID = 1102776;

        const response1 = await TMDB.getMovieDetails(movieID);
        const response2 = await TMDB.getMovieCredits(movieID);
        const response3 = await TMDB.getMovieProvider(movieID);

        const details = await response1.json();
        const credits = await response2.json(); 
        const provider = await response3.json(); 

        res.json({
            result1: details, 
            result2: credits,
            result3: provider
        });  
        // console.log(result3);
        return;
    },

    getMovieCredits: async (req, res) => {
        const movieID = req.query.movieID;
        const response = await TMDB.getMovieCredits(movieID);
        const credits = await response.json();
        res.json(credits);  
        return;
    },

    getMovieWatchProvider: async (req, res) => {
        const movieID = req.query.movieID;
        const response = await TMDB.getMovieWatchProvider(movieID);
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
        const peopleId = await response.json();
        res.json(peopleId);  
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

    filterMovieByWatchProvider: async (req, res) => {
        const providerID = req.query.providerID;
        const movies = await TMDB.filterMovieByWatchProvider(providerID);
        return;
    },

    filterMovieByPeople: async (req, res) => {
        const peopleID = req.query.peopleID;
        const response = await TMDB.filterMovieByActor(peopleID);
        const chosenPeople = await response.json();
        console.log(chosenPeople);
        res.json(chosenPeople);
        return;
    },

    filterMovieByDecade: async (req, res) => {
        const decade = 1990;
        const year1 = decade;
        const year2 = decade + 9;

        const response = await TMDB.filterMovieByYear(year1, year2);
        const moviesByYear = await response.json();
        res.json(moviesByYear);
        return;
    }
    

}



module.exports = filmController;