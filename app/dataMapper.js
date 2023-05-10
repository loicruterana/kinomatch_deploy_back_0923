const dataMapper = {

   

    getMovieDetailsRequest: async () => {
        
        let data = []
        const response = await fetch(`https://api.themoviedb.org/3/movie/420808;?api_key=82184d982ef42b5548f45d546dd62ddb&language=fr-FR`)
        const responseData = await response.json()
        data = responseData
        
        return data        
    },
}

module.exports = dataMapper;