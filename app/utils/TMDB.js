const TMDB = {
    API_KEY: "82184d982ef42b5548f45d546dd62ddb",
    API_URL: "https://api.themoviedb.org/3",
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

    filterMovie: async (year1, year2, genreID, providerID) => {

        console.log(year1);
        console.log(providerID);
        console.log(genreID);

        let baseUrl = `${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        let urlDecade = '';
        let urlProvider = '';
        let urlGenre = '';

        if(year1 & year2 !== NaN){
            urlDecade = `&primary_release_date.gte=${year1}&primary_release_date.lte=${year2}`; 
        } 

        if(providerID !== undefined){
            urlProvider = `&with_watch_providers=${providerID}&watch_region=FR`;
        }

        if(genreID !== undefined){
            urlGenre = `&with_genres=${genreID}`;
        }

    
        
        const fullUrl = baseUrl + urlDecade + urlProvider + urlGenre;
        console.log(fullUrl)
        return fetch(fullUrl)
    
    },

    filterRandomMovie: async (year1, year2, genreID, providerID, randomPage) => {

        console.log(year1);
        console.log(providerID);
        console.log(genreID);
        console.log(randomPage);

        let baseUrl = `${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`;
        let urlDecade = '';
        let urlProvider = '';
        let urlGenre = '';
        let urlrandomPage = '';

        if(year1 & year2 !== NaN){
            urlDecade = `&primary_release_date.gte=${year1}&primary_release_date.lte=${year2}`; 
        } 

        if(providerID !== undefined){
            urlProvider = `&with_watch_providers=${providerID}&watch_region=FR`;
        }

        if(genreID !== undefined){
            urlGenre = `&with_genres=${genreID}`;
        }

        if(randomPage !== undefined){
            urlrandomPage = `&page=${randomPage}`;
        }
        
        const fullUrl = baseUrl + urlDecade + urlProvider + urlGenre + urlrandomPage;
        console.log(fullUrl)
        return fetch(fullUrl)
    
    },

 

  



    

    
};

module.exports = TMDB;