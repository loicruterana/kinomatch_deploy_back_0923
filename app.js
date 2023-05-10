// librairies
const express = require('express');

// vars
const app = express();
const port = 3000;

const filmID = 420808;

const api_key = '82184d982ef42b5548f45d546dd62ddb';

async function getMovieDetails(req, res) {
  
  let data = []

      try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${filmID}?api_key=${api_key}&language=fr-FR`)
          // const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=82184d982ef42b5548f45d546dd62ddb&language=fr-FR`)
          const responseData = await response.json()
          data = responseData

          console.log(data)
          
          res.render('testPageFilm', {data});

      } catch (error) {
          
      }
  // return data  
}

getMovieDetails();

async function getWatchProvider(req, res) {
  
  let provider = []

      try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${filmID}/watch/providers?api_key=82184d982ef42b5548f45d546dd62ddb`)
          // const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=82184d982ef42b5548f45d546dd62ddb&language=fr-FR`)
          const responseData = await response.json()
          provider = responseData
          const providerObject = provider.results
          const platform = providerObject.FR
          const rentPlatform = platform.flatrate;
          
          console.log('watchWorking')

          console.log(rentPlatform)

          res.render('testPageFilm', {rentPlatform});

      } catch (error) {
        
      }
  // return data  
}

// getWatchProvider();

async function getAllGenres(req, res) {
 
  let data = []
  
      try {
          const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
          // const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=82184d982ef42b5548f45d546dd62ddb&language=fr-FR`)
          const responseData = await response.json()
          data = responseData
          const genres = data.genres
          for(let genre of genres){
            console.log(genre.name); 
          }
  
          res.render('testHome', {genres});

      } catch (error) {
       
      }}

// getAllGenres();

// View engine setup
app.set('view engine', 'ejs');




app.get('/', getAllGenres);

app.get('/film', getMovieDetails);




app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log('<< 401 UNAUTHORIZED - Invalid Token');
    res.status(401).send('Invalid token');
  }
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
