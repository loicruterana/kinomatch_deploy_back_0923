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

//J'utilise express pour créer mon app
const app = express();

//Je configure cors pour ouvrir l'accès
const corsOptions = {
  origin: ['*'],// Origines autorisées
  methods: ['GET', 'POST'], // Méthodes HTTP autorisées
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // En-têtes autorisés
  credentials: true, 
};

//Je configure mon app pour faire appel à cors
app.use(cors(corsOptions));
app.use(express.urlencoded( {extended : true}));
app.use(express.json());

// Middleware to set the Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
next();
});

// j'ajoute le middleware d'express session, qu'on configure
app.use(
  session({
    secret: process.env.APP_SECRET, // avec un secret specifique à mon app pour des id de session non prédictibles
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // en production il faudra utiliser HTTPS
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
  
