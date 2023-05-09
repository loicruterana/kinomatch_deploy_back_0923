// librairies
const express = require('express');

// vars
const app = express();
const port = 4000;

async function getMovieDetails(req, res) {
  
  let data = []
      try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/346?api_key=82184d982ef42b5548f45d546dd62ddb&language=fr-FR`)
          // const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=82184d982ef42b5548f45d546dd62ddb&language=fr-FR`)
          const responseData = await response.json()
          data = responseData

          console.log(Object.keys(data))
          
          res.render('testHome', {data});

      } catch (error) {
          
      }
  // return data  
}

getMovieDetails();

// View engine setup
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   // console.log('show Home');
//   res.render('testHome');
// });

app.get('/', getMovieDetails);


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log('<< 401 UNAUTHORIZED - Invalid Token');
    res.status(401).send('Invalid token');
  }
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
