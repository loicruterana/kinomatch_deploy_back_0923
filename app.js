//Je requête dotenv pour pouvoir avoir accès à mes variables d'environnement
require('dotenv').config();
//Je requête express
const express = require('express');
//Je requête express-session pour pouvoir créer et gérer des sessions utilisateurs
const session = require('express-session');
//Je fais appel à mon routeur
const router = require('./app/router.js');
//Je requête cors pour pouvoir donner accès à tous au serveur
const cors = require('cors');
//Je requête body-parser pour pouvoir accéder aux données envoyées par le front
const bodyParser = require('body-parser');
//Je requête cookie-parser pour pouvoir gérer les cookies
const cookieParser = require('cookie-parser')
//J'utilise express pour créer mon app
const app = express();

// Je configure cors pour ouvrir l'accès
const corsOptions = {
  origin: ['https://projet-06-kinomatch-front.vercel.app','http://localhost:5173'],// Origines autorisées
  methods: ['GET', 'POST', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // En-têtes autorisés
  credentials: true, 
};

//Je configure mon app pour gérer les cookies
app.use(cookieParser());

//Je configure mon app pour accéder aux données envoyées par le front
app.use(bodyParser.urlencoded({ extended: true }));

//Je configure mon app pour faire appel à cors
app.use(cors(corsOptions));

//Je configure mon app pour pouvoir accéder aux données envoyées en json
app.use(express.json());


// j'ajoute le middleware d'express session, qu'on configure
app.use(
  session({
    key: process.env.COOKIE_NAME, // le nom du cookie
    secret: process.env.APP_SECRET, // avec un secret specifique à mon app pour des id de session non prédictibles
    resave: false,
    saveUninitialized: false,
    cookie: { 
      expires: 60 * 60 * 24, // durée de vie du cookie en secondes (ici 1 jour) 
    },
  })
);

//Je configure mon app pour reconnaître un user connecté en session
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.logged = true;
  } else {
    res.locals.logged = false;
  }
  next();
});

//Je configure mon app pour accéder au routeur
app.use(router);

//Je branche mon app sur le port que je souhaite utiliser
app.listen(process.env.PORT || 4000);
  
