// #merciOQuiz
const  User = require('../models/user');
const bcrypt = require('bcrypt');

console.log(User);

const userController = {
  // signup: function (req, res) {
  //   res.render('signup');
  //   console.log('parici');
  // },

  signupAction: async function (req, res) {
    // objectif : valider ou non l'inscription
    // récupérer les infos envoyées
    const data = req.body;
    // console.log(req);
    // console.log(data);
    console.log('parla!');

    // essayer de créer un user à partir de ça
    let error = '';
    if (data.password !== data.passwordConfirm) {
      error = 'Le mot de passe ne correspond pas';
      console.log('ok');
      res.json(error);
      return;
    } else if (data.password.length < 8) {
      error = 'Le mot de passe est trop court';
      console.log('ok2');
      res.json(error);
      return;
    } else if (!data.email) {
      error = 'Email obligatoire';
      res.json(error);
      return;
    }

    // on vérifie que l'utilisateur n'existe pas déjà
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      error = 'Email déjà utilisé';
      res.json(error);
      return;

    }

    if (!error) {
      try {
        // pour bcrypt on prépare un nombre de "round"
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const user = await User.create({
          email: data.email,
          password: hashedPassword,
        });
        console.log('passeparcreate');
        res.status(201).json({ message: 'user created', user });
        return;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when creating the user' });
        return;
      }
    }

    return;
  },

  // login: function (req, res) {
  //   res.render('login');
  // },

  loginAction: async function (req, res) {
    // on part des données saisies
    const data = req.body;

    // on vérifie la présence des champs
    let error = '';
    if (!data.email) {
      error = 'Email obligatoire';
      res.json(error);
      return;
    } else if (!data.password) {
      error = 'Mot de passe obligatoire';
      res.json(error);
      return;
    }

    let user;

    if (!error) {
      // on vérifie que l'utilisateur existe
      const user = await User.findOne({ where: { email: data.email } });
      if (!user) {
        error = 'Couple email/mot de passe invalide';
        res.json(error);
        return;
      }

      // on vérifie que le mot de passe est le bon
      const checkPassword = await bcrypt.compare(data.password, user.password);
      if (!checkPassword) {
        error = 'Couple email/mot de passe invalide';
        res.json(error);
        return;

      }
    }

    // si tout va bien
    if (!error) {
      // il faut mémoriser l'user en session
      req.session.user = user;
      // et rediriger sur la home
      res.status(201).json({ message: 'user validated', user });
      return;
      // res.redirect('/');
    } else {
      // sinon on affiche les erreurs
      res.status(500).json({ message: 'Error when logging the user', error: error,
      data: data });
      // res.render('login', {
      //   error: error,
      //   data: data,
      // });


      
    }
  },
};

module.exports = userController;
