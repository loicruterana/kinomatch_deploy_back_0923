const TMDB = {
    API_KEY: "82184d982ef42b5548f45d546dd62ddb",
    API_URL: "https://api.themoviedb.org/3",


fetchMovie: async (searchTerm) => {
    return fetch(`${TMDB.API_URL}search/movie?api_key=${TMDB.API_KEY}&query=${searchTerm}`);
    
}
};

module.exports = TMDB;