import { config } from "./config.js"

const BASE_URL = config.api_base_url
const API_KEY = config.api_key

// export async function getPopularMovies(page = 1) {
//     let data = []
//     try {
//         const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`)
//         const responseData = await response.json()
//         data = responseData?.results
//     } catch (error) {
        
//     }
//     return data
// }

export async function getMovieDetails(page = 1) {
    let data = []
    try {
        const response = await fetch(`${BASE_URL}movie/346?api_key${API_KEY}language=fr-FR`)
        const responseData = await response.json()
        data = responseData?.results
    } catch (error) {
        
    }
    
    console.log(data)
    
    return data
    
    
}

