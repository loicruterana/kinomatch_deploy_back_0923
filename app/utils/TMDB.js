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

    filterMovie: async (year1, year2, genreID, providerID) => {

        console.log(year1);
        console.log(providerID);
        console.log(genreID);

        let baseUrl = `${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        let urlDecade = '';
        let urlProvider = '';
        let urlGenre = '';


        if(year1 !== undefined){
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

        // const urlComplementArray = [];

        // if(year1 !== undefined){
        //     urlComplementArray.push(urlDecade);
        // } 

        // if(providerID !== undefined){
        //     urlComplementArray.push(urlProvider);
        // }

        // if(genreID !== undefined){
        //     urlComplementArray.push(urlGenre);
        // }
        


        // console.log(urlComplementArray);
        // const fullUrl = baseUrl + urlComplementArray;
        // console.log(fullUrl)
        // return fetch(fullUrl)



        // if (providerID !== null) {
        //     console.log('parla1');
        //     urlProvider = `&with_watch_providers=${providerID}&watch_region=FR`
        // } else {
        //     urlProvider = ' ';
        // };

        // if (year1 !== null && year2 !== null) {
        //     console.log('parla2');
        //     urlDecade = `&primary_release_date.gte=${year1}&primary_release_date.lte=${year2}`
        // } else {
        //     urlDecade = ' ';
        // };

        // if (genreID !== null) {
        //     console.log('parla3');
        //     urlGenre = `&with_genres=${genreID}`
        // } else {
        //     urlGenre = ' ';
        // };
   
       
        // const valeur = (baseUrl + (urlProvider ? urlProvider : "") + (urlDecade ? urlDecade : "") + (urlGenre ? urlGenre : "") );
        // valeur.toString()
        // console.log (valeur)
        // return fetch(baseUrl + (urlProvider ? urlProvider : "") + (urlDecade ? urlDecade : "") + (urlGenre ? urlGenre : "") );      
    },

    // filterMovie: async (year1, year2, providerID, genreID) => {

    //     return fetch(`${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${year1}&primary_release_date.lte=${year2}&with_people=287&with_genres=${genreID}&with_watch_providers=${providerID}&watch_region=FR`)
    // },

  // filterMovieByWatchProvider: async (providerID) => {

    //     return fetch(`${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_watch_providers=${providerID}&watch_region=FR`)
    // },

  



    

    
};

module.exports = TMDB;