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
        const year1 = Number(decade);
        const year2 = Number(decade) + 9;
        // const peopleID = req.query.peopleID;

        const response = await TMDB.filterMovie(year1, year2, genreID, providerID);
        const filteredMovies = await response.json();
        
        console.log(filteredMovies.total_pages);
        
        let total = filteredMovies.total_pages;

        let number = Math.random() * (total - 1) + 1;
        let maxNumber = Math.random() * (500 - 1) + 1;
        const roundNumber = Math.round(number);
        let newNumber;

        if(roundNumber >= 500){
            newNumber = Math.round(maxNumber)
        } else {
            newNumber = roundNumber
        }
        console.log(newNumber)
          
        res.json(filteredMovies);
        return;
    },

    filterRandomMovie: async (req, res) => {
       

        const genreID = req.query.genreID;

        const providerID = req.query.providerID;
       
        const decade = req.query.decade;

        const year1 = Number(decade);
        const year2 = Number(decade) + 9;
        // const peopleID = req.query.peopleID;
        const randomPage = req.query.randomPage;
        // const randomPage = req.query.randomPage;

        const response = await TMDB.filterRandomMovie(year1, year2, genreID, providerID, randomPage);
        const filteredMovies = await response.json();
    
        res.json(filteredMovies);
        return;

    },

    filterMovieAdvanced: async (req, res) => {
       
        const genreID = req.query.genreID;
        // const genreID = req.query.genreID;
        const providerID = req.query.providerID;
        // const providerID = req.query.providerID;
        const decade = req.query.decade;
        // const decade = req.query.decade;
        const year1 = Number(decade);
        const year2 = Number(decade) + 9;
        // const peopleID = req.query.peopleID;
        const countryID = req.query.countryID;
        // const countryID = req.query.countryID; (ex : FR)
        const castID = req.query.castID;
        // const castID = req.query.castID; (ex : 287)


        // const runtime = 120;
        // const runtime = req.query.runtime; (ex : )
        // const runtime2 = Number(runtime);
        // const runtime1 = Number(runtime) - 30;
        

        console.log(castID);
        console.log(countryID);

        const response = await TMDB.filterMovieAdvanced(year1, year2, genreID, providerID, countryID, castID);
        const filteredMovies = await response.json();
       
          
        res.json(filteredMovies);
        return;
    },

    

  



   
    

}



module.exports = TMDBController;