require('dotenv').config();
const express = require('express');
const session = require('express-session');
const router = require('./app/router.js');
const cors = require('cors');

const app = express();

const port = 4000;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5173/profile'],// Remplacez par l'origine autorisée pour votre application
  methods: ['GET', 'POST'], // Méthodes HTTP autorisées
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // En-têtes autorisés
};

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(cors(corsOptions));
app.use(express.static('./public'));
app.use(express.urlencoded( {extended : true}));
app.use(express.json());

// on ajoute le middleware d'express session, qu'on configure
app.use(
  session({
    secret: process.env.APP_SECRET, // avec un secret specifique à mon app pour des id de session non prédictibles
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // en production il faudra utiliser HTTPS
  })
);

// middleware pour l'info logged dans les views
// ps : on pourrait faire un module à part comme pour checkLogged
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.logged = true;
    if (req.session.user.role === 'admin') {
      res.locals.isAdmin = true;
    } else {
      res.locals.isAdmin = false;
    }
  } else {
    res.locals.logged = false;
    res.locals.isAdmin = false;
  }
  next();
});

app.use(router);

app.listen(process.env.PORT || 4000);
  
