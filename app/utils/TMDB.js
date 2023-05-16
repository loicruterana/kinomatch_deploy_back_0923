const TMDB = {
    API_KEY: "82184d982ef42b5548f45d546dd62ddb",
    API_URL: "https://api.themoviedb.org/3",



    getMovieDetails: async () => {

        return fetch(`${TMDB.API_URL}/movie/78?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },


    filterMovieByGenre: async (genreID) => {

        return fetch(`${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreID}`)
    },


    filterMovieByYear: async (year) => {

        return fetch(`${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.asc&include_adult=false&include_video=false&page=${year}&${year}`)
    },

    filterMovieByWatchProvider: async (providerID) => {

        return fetch(`${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_watch_providers=${providerID}&watch_region=FR`)
    },

    
};

module.exports = TMDB;