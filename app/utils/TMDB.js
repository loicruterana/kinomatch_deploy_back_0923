// Je crée l'objet TMDB qui contient les méthodes pour appeler l'API TMDB
const TMDB = {
    // Je crée une propriété API_KEY qui contient ma clé API TMDB
    API_KEY: "82184d982ef42b5548f45d546dd62ddb",
    // Je crée une propriété API_URL qui contient l'URL de base de l'API TMDB
    API_URL: "https://api.themoviedb.org/3",
    
    // Je crée une méthode getGenresList qui appelle l'API TMDB pour récupérer la liste des genres de films en vue de l'afficher sur la home
    getGenresList: async () => {

        return fetch(`${TMDB.API_URL}/genre/movie/list?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    // Je crée une méthode getProvidersList qui appelle l'API TMDB pour récupérer la liste des plateformes de streaming en vue de l'afficher sur la home
    getProvidersList: async () => {

        return fetch(`${TMDB.API_URL}/watch/providers/movie?api_key=${TMDB.API_KEY}&language=fr-FR`)

    },

    // Je crée une méthode getMovieDetails qui appelle l'API TMDB pour récupérer les détails généraux d'un film en vue de les afficher sur la page du film
    getMovieDetails: async (movieID) => {

        return fetch(`${TMDB.API_URL}/movie/${movieID}?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    // Je crée une méthode getMovieProvider qui appelle l'API TMDB pour récupérer la plateforme où un film est dispo en vue de les afficher sur la page du film
    getMovieProvider: async (movieID) => {

        return fetch(`${TMDB.API_URL}/movie/${movieID}/watch/providers?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    // Je crée une méthode getMovieCredits qui appelle l'API TMDB pour récupérer les acteurs et l'équipe technique d'un film en vue de les afficher sur la page du film
    getMovieCredits: async (movieID) => {

        return fetch(`${TMDB.API_URL}/movie/${movieID}/credits?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    // Je crée une méthode getRecommendedMovies qui appelle l'API TMDB pour récupérer les films recommandés en vue de les afficher sur la page du film
    getRecommendedMovies: async (movieID) => {

        return fetch(`${TMDB.API_URL}/movie/${movieID}/recommendations?api_key=${TMDB.API_KEY}&language=fr-FR`)
    },

    // Je crée une méthode getPeopleID qui appelle l'API TMDB pour récupérer l'ID d'une personne en vue de les afficher sur la home
    getPeopleId: async (typedName) => {

        return fetch(`${TMDB.API_URL}/search/person?api_key=${TMDB.API_KEY}&query=${typedName}`)

    },

    // Je crée une méthode searchMovie qui appelle l'API TMDB pour récupérer les films en fonction du nom tapé dans la barre de recherche
    searchMovie: async (typedName, page) => {

            console.log(typedName, page)
            return fetch(`${TMDB.API_URL}/search/movie?api_key=${TMDB.API_KEY}&language=fr-FR&query=${typedName}&page=${page}`)
    },

    // Je crée une méthode filterMovie qui appelle l'API TMDB pour récupérer les films filtrés en fonction de l'année, du genre et de la plateforme
    filterMovie: async (year1, year2, genreID, providerID) => {

        let baseUrl = `${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        let urlDecade = '';
        let urlProvider = '';
        let urlGenre = '';


        if(!isNaN(year1)){
            urlDecade = `&primary_release_date.gte=${year1}&primary_release_date.lte=${year2}`; 
        }

        

       

        if(providerID !== undefined){
            if(providerID.constructor === Array){
                let newArr = providerID.join(',').replace(/,/g, '|').split();
                providerID = newArr;
            }
            urlProvider = `&with_watch_providers=${providerID}&watch_region=FR`;
        }
        

        if(genreID !== undefined){
            urlGenre = `&with_genres=${genreID}`;
        }

    
        
        const fullUrl = baseUrl + urlDecade + urlProvider + urlGenre;
        return fetch(fullUrl)
    
    },

    // Je crée la même méthode que filterMovie mais avec un paramètre randomPage en plus pour pouvoir faire un appel à l'API TMDB avec une page aléatoire
    filterRandomMovie: async (year1, year2, genreID, providerID, randomPage) => {

        let baseUrl = `${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false`;
        let urlDecade = '';
        let urlProvider = '';
        let urlGenre = '';
        let urlrandomPage = '';

        if(!isNaN(year1)){
            urlDecade = `&primary_release_date.gte=${year1}&primary_release_date.lte=${year2}`; 
        }

        if(providerID !== undefined){
            if(providerID.constructor === Array){
                let newArr = providerID.join(',').replace(/,/g, '|').split();
                providerID = newArr;
            }
            urlProvider = `&with_watch_providers=${providerID}&watch_region=FR`;
        }

        if(genreID !== undefined){
            urlGenre = `&with_genres=${genreID}`;
        }

        if(randomPage !== undefined){
            urlrandomPage = `&page=${randomPage}`;
        }
        
        const fullUrl = baseUrl + urlDecade + urlProvider + urlGenre + urlrandomPage;
        return fetch(fullUrl)
    
    },

    // Je crée une méthode filterMovieAdvanced qui appelle l'API TMDB pour récupérer les films filtrés en fonction de l'année, du genre, de la plateforme, du pays et du casting
    filterMovieAdvanced: async (year1, year2, genreID, providerID, countryID, castID) => {


        let baseUrl = `${TMDB.API_URL}/discover/movie?api_key=${TMDB.API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        let urlDecade = '';
        let urlProvider = '';
        let urlGenre = '';
        let urlCountry = '';
        // let urlRuntime = '';
        let urlCast = '';

        if(!isNaN(year1)){
            urlDecade = `&primary_release_date.gte=${year1}&primary_release_date.lte=${year2}`; 
        }

        if(providerID !== undefined){
            urlProvider = `&with_watch_providers=${providerID}&watch_region=FR`;
        }

        if(genreID !== undefined){
            urlGenre = `&with_genres=${genreID}`;
        }

        if(countryID !== undefined){
            urlCountry = `&with_origin_country=${countryID}`;
        }

        if(castID !== undefined){
            urlCast = `&with_cast=${castID}`;
        }
       

    
        
        const fullUrl = baseUrl + urlDecade + urlProvider + urlGenre + urlCountry + urlCast;
        return fetch(fullUrl)
    
    },
 

  



    

    
};

module.exports = TMDB;