const csurf = require('csurf');

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
const cookieParser = require('cookie-parser');
//J'utilise express pour créer mon app
const app = express();

// Je configure cors pour ouvrir l'accès
const corsOptions = {
  origin: [
    'https://kinomatch-front.vercel.app',
    'http://localhost:5173',
    'https://deploy-back-kinomatch.herokuapp.com/',
    'https://kinomatch-back-production.up.railway.app',
    'https://kinomatch-front-ob2v215qk-kinomatch.vercel.app',
    'https://application.kinomatch.com',
    'https://www.api.kinomatch.com'
  ], // Origines autorisées
  // origin: ['http://localhost:5173'],// Origines autorisées
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'], // Méthodes HTTP autorisées
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ], // En-têtes autorisés
  credentials: true,
};

//Je configure mon app pour gérer les cookies
app.use(cookieParser());

//Je configure mon app pour accéder aux données envoyées par le front
app.use(bodyParser.urlencoded({ extended: true }));

//Je configure mon app pour pouvoir accéder aux données envoyées en json
app.use(express.json());

// j'ajoute le middleware d'express session, qu'on configure
app.use(
  session({
    secret: process.env.APP_SECRET, // avec un secret specifique à mon app, chaine de caractère qui est utilisé pour encoder les cookies
    // autres otpions : on met celles recommandées par la doc
    resave: true, // si on laisse à false, on est obligé de déclencher la sauvegarde à la main avec request.session.save()
    saveUninitialized: false, // pour ne pas avoir le deprecated dans le terminal
    cookie: {
      sameSite: 'strict',
      secure: false,
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 heure
      // saveUninitialized : false,
      domain: 'kinomatch.com',
      // httpOnly : le cookie ne peut être accessible ou modifié que par le serveur web via des requêtes HTTP
      // pour se protéger notamment des attaques XSS
      httpOnly: true,
    },
  })
);

//Je configure mon app pour faire appel à cors
app.use(cors(corsOptions));

//Je configure mon app pour accéder au routeur
app.use(router);

//Je branche mon app sur le port que je souhaite utiliser
app.listen(process.env.PORT || 4000);