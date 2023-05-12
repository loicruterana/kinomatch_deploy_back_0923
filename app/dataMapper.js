const filmID = 1585;

const api_key = '82184d982ef42b5548f45d546dd62ddb';


const dataMapper = {
    

    getMovieDetailsRequest: async () => {
        
        

        let data = []
        const response = await fetch(`https://api.themoviedb.org/3/movie/${filmID}?api_key=${api_key}&language=fr-FR`)
        const responseData = await response.json()
        data = responseData
        

        console.log(data);
        return data;        
    },

    getWatchProviderRequest: async () => {

        let provider = []

        const response = await fetch(`https://api.themoviedb.org/3/movie/${filmID}/watch/providers?api_key=${api_key}`)
        const responseData = await response.json()
        provider = responseData
        const providerObject = provider.results
        const platform = providerObject.FR
        const rentPlatform = platform.flatrate;
        
        return rentPlatform;
        }
    
    
}

module.exports = dataMapper;