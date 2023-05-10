// pour utiliser les variables que l'on a définit dans le fichier .env on a besoin d'un petit module ! Il s'apelle dotenv
// pour l'utiliser il faut d'ja l'installer (nom i dotenv), puis le require et on execute la méthonde "config" comme dit dans la doc
require('dotenv').config();

const bodyParser = require('body-parser');
// on require le package express (module node = trouvé dans le dossier node_modules)
const express = require('express');

// on récupère le module express-session, pour gérer les sessions
const session = require('express-session');

// on require notre router (module custom = on indique le chemin jusqu'au fichier)
const router = require("./app/router.js")

// j'execute la fonction "express"
// je range la valeur de retour de la fonction express(), dans une variable "app"
const app = express();

const port = 5000;

app.set('view engine', 'ejs');

app.set('views', __dirname + '/app/views');

const filmID = 420808;

const api_key = '82184d982ef42b5548f45d546dd62ddb';

app.use(router);





// async function getAllGenres(req, res) {
 
//   let data = []
  
//       try {
//           const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
//           // const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=82184d982ef42b5548f45d546dd62ddb&language=fr-FR`)
//           const responseData = await response.json()
//           data = responseData
//           const genres = data.genres
//           for(let genre of genres){
//             console.log(genre.name); 
//           }
  
//           res.render('testHome', {genres});

//       } catch (error) {
       
//       }}

// getAllGenres();


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
