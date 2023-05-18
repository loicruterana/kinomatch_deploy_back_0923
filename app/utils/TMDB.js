const TMDB = {
    API_KEY: "82184d982ef42b5548f45d546dd62ddb",
    API_URL: "https://api.themoviedb.org/3",

    
    getGenresList: async () => {

        return fetch(`${TMDB.API_URL}/genre/movie/list?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    getProvidersList: async () => {

        return fetch(`${TMDB.API_URL}/watch/providers/movie?api_key=${TMDB.API_KEY}&language=fr-FR`)

    },

    getMovieDetails: async (movieID) => {

        return fetch(`${TMDB.API_URL}/movie/${movieID}?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    getMovieProvider: async (movieID) => {

        return fetch(`${TMDB.API_URL}/movie/${movieID}/watch/providers?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    getMovieCredits: async (movieID) => {

        return fetch(`${TMDB.API_URL}/movie/${movieID}/credits?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    getPeopleId: async (typedName) => {

        return fetch(`${TMDB.API_URL}/search/person?api_key=${TMDB.API_KEY}&query=${typedName}`)

    },

    filterMovieByWatchProvider: async (providerID) => {

        return fetch(`${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_watch_providers=${providerID}&watch_region=FR`)
    },



    filterMovieByYear: async (year1, year2) => {

        return fetch(`${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${year1}&primary_release_date.lte=${year2}&with_genres=18&with_people=287&with_genres=80`)
    },


  



    

    
};

module.exports = TMDB;