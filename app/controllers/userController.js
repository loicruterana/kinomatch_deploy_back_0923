// #merciOQuiz
const  { User }  = require('../models/user');
const bcrypt = require('bcrypt');

console.log(User);

const userController = {
  signup: function(req, res) {
    res.render('signup');
  },
  signupAction: async function(req, res) {
    // objectif : valider ou non l'inscription
    // récupérer les infos envoyées
    const data = req.body;
    // essayer de créer un user à partir de ça
    let error = '';
    if (data.password !== data.passwordConfirm) {
      error = 'Le mot de passe ne correspond pas';
    }
    else if (data.password.length < 8) {
      error = 'Le mot de passe est trop court';
    }
    else if (!data.email) {
      error = 'Email obligatoire';
    }

    // on vérifie que l'utilisateur n'existe pas déjà
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      error = 'Email déjà utilisé';
    }

    // il manque certaines verif : est-ce que l'email est unique ?
    // il faut pas oubliger de créer l'utilisateur
    // faisons appel à sequelize si tout va bien jusque là
    if (!error) {
      try {
        // pour bcrypt on prépare un nombre de "round"
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const user = await User.create({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: hashedPassword,
        });
      }
      catch (error) {
        if (error.errors && error.errors[0].type === 'Validation error') {
          error = 'Email invalide';
        }
        else {
          res.status(500).render('error', {
            message: 'Le serveur n\'a pas pu traiter correctement votre requête.',
          });
          return;
        }
      }
    }

    // si c'est ok, le rediriger vers la page de connexion
    if (!error) {
      res.redirect('/login');
    }
    // sinon le remettre sur le formulaire avec des messages d'erreur
    else {
      res.render('signup', {
        error: error,
        data: data,
      });
    }
  },
  login: function(req, res) {
    res.render('login');
  },
  loginAction: async function(req, res) {
    // on part des données saisies
    const data = req.body;

    // on vérifie la présence des champs
    let error = '';
    if (!data.email) {
      error = 'Email obligatoire';
    }
    else if(!data.password) {
      error = 'Mot de passe obligatoire';
    }
    
    let user;

    if (!error) {
      // on vérifie que l'utilisateur existe
      user = await User.findOne({ where: { email: data.email } });
      if (!user) {
        error = 'Couple email/mot de passe invalide';
      }
      
      // on vérifie que le mot de passe est le bon
      const checkPassword = await bcrypt.compare(data.password, user.password);
      if (!checkPassword) {
        error = 'Couple email/mot de passe invalide';
      }
    }

    // si tout va bien
    if (!error) {
      // il faut mémoriser l'user en session
      req.session.user = user;
      // et rediriger sur la home
      res.redirect('/');
    }
    else {
      // sinon on affiche les erreurs
      res.render('login', {
        error: error,
        data: data,
      });
    }
  },
 
};

module.exports = userController;
