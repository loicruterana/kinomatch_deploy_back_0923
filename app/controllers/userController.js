// sanitize-html permet de nettoyer les entrées utilisateur pour éviter les attaques XSS
const sanitizeHtml = require('sanitize-html');
// Je définis une variable validator qui récupère le module validator
const validator = require('validator');
// Je définis une variable user qui récupère le modèle User
const User = require('../models/user');
// Je définis une variable Picture qui récupère le modèle Picture
const Picture = require('../models/picture');
// Je définis une variable bcrypt qui récupère le module bcrypt
const bcrypt = require('bcrypt');
// Je définis une variable userController qui contient un objet avec les méthodes signupAction, loginAction, logoutAction et deleteAccount
const userController = {
  // Je définis la méthode signupAction qui permet à un utilisateur de s'inscrire
  signupAction: async function (req, res) {
    try {
      // Je définis les variables email, password et passwordConfirm qui récupèrent respectivement l'email, le mot de passe et la confirmation du mot de passe via le body
      const email = sanitizeHtml(req.body.email);
      const password = sanitizeHtml(req.body.password);
      const passwordConfirm = sanitizeHtml(req.body.passwordConfirm);
      //fonction isEmail de validator.js pour vérifier l'email
      // if (!validator.isEmail(email)) {
      //   return res.status(400).json({ error: 'Adresse e-mail invalide' });
      // }

      // Je vérifie si le mot de passe répond aux critères de complexité (au moins un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial)
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z\d!@#$%^&*()_+]).{12,}$/;
      if (!password.match(passwordRegex)) {
        return res.status(400).json({
          error:
            'Le mot de passe doit contenir au moins un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial.',
        });
      }
      // Je crée la condition qui stipule que si le mot de passe et la confirmation du mot de passe ne correspondent pas, une erreur est renvoyée
      if (password !== passwordConfirm) {
        // Je renvoie une erreur au statut 400
        return res
          .status(400)
          .json({ error: 'Le mot de passe ne correspond pas' });
      }
      // Je crée la condition qui stipule que si le mot de passe est inférieur à 8 caractères, une erreur est renvoyée
      if (password.length < 12) {
        // Je renvoie une erreur au statut 400
        return res
          .status(400)
          .json({ error: 'Le mot de passe est trop court' });
      }
      // Je crée la condition qui stipule que si l'email n'est pas défini, une erreur est renvoyée avec le message "Email obligatoire"
      if (!email) {
        return res.status(400).json({ error: 'Pseudo obligatoire' });
      }
      // Je crée une variable existingUser qui cherche un utilisateur dans la base de données avec l'email récupéré via le body
      const existingUser = await User.findOne({ where: { email } });
      // Je crée la condition qui stipule que si l'utilisateur existe déjà, une erreur est renvoyée avec le message "Email déjà utilisé"
      if (existingUser) {
        return res.status(400).json({ error: 'Pseudo déjà utilisé' });
      }
      // Je crée une variable saltRounds qui contient le nombre de tours de hashage du password
      const saltRounds = 10;
      // Je crée une variable hashedPassword qui contient le mot de passe hashé
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Je crée une variable newUser qui crée un utilisateur dans la base de données avec l'email et le mot de passe hashé
      const user = await User.create({
        email,
        password: hashedPassword,
        picture: 'SamplePicCircle',
      });
      // Je renvoie un message de succès au statut 201 avec l'utilisateur créé
      req.session.user = user;
      req.session.authorized = true; // console.log(req.session.user);      console.log('le cookies de la session', req.session.cookie);
      return res.status(201).json({ message: 'Utilisateur créé', user: user });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erreur lors de la création de l'utilisateur" });
    }
  },
  // Je définis la méthode loginAction qui permet à un utilisateur de se connecter
  loginAction: async function (req, res) {
    console.log(req.session.user);
    try {
      // Je définis les variable email et password qui récupèrent respectivement l'email et le mot de passe via le body
      const email = sanitizeHtml(req.body.email);
      const password = sanitizeHtml(req.body.password);
      // Je crée la condition qui stipule que si l'email ou le mot de passe ne sont pas définis, une erreur est renvoyée avec le message "Email et mot de passe obligatoires"
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: 'Pseudo et mot de passe obligatoires' });
      }
      // Je crée une variable user qui cherche un utilisateur dans la base de données avec l'email récupéré via le body
      const user = await User.findOne({ where: { email } });
      // Je crée la condition qui stipule que si l'utilisateur n'existe pas, une erreur est renvoyée avec le message "Email ou mot de passe invalide"
      if (!user) {
        return res.status(400).json({ error: 'Pseudo invalide' });
      }
      // Je crée une variable isPasswordValid qui compare le mot de passe récupéré via le body avec le mot de passe de l'utilisateur
      const isPasswordValid = await bcrypt.compare(password, user.password);
      // Je crée la condition qui stipule que si le mot de passe n'est pas celui du user, une erreur est renvoyée avec le message "Email ou mot de passe invalide"
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Mot de passe invalide' });
      } else if (isPasswordValid) {
        if (user) {
          req.session.user = user;
          req.session.authorized = true; // console.log(req.session.user);
          console.log(req.cookies);
        }

        // Stockez l'utilisateur en session ici si vous utilisez des sessions
        return res.status(200).json({ message: 'Utilisateur connecté', user });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erreur lors de la connexion de l'utilisateur" });
    }
  },

  checkLogin: function (req, res) {
    console.log(req.session);

    try {
      if (req.session.user) {
        return res
          .status(200)
          .json({ authorized: true, user: req.session.user });
      } else {
        return res.status(200).json({ authorized: false });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erreur lors de la vérification de l'utilisateur" });
    }
  },

  // Je définis la méthode logoutAction qui permet à un utilisateur de se déconnecter
  logout: function (req, res) {
    // Je supprime l'utilisateur de la session
    // req.session.authorized = false;
    req.session = null;
    res.clearCookie('connect.sid', { path: '/' }).status(200).send('Ok.');

    // Je renvoie un message de succès au statut 201
    res.status(201).json({ message: 'user loggedout' });
  },
  // Je définis la méthode deleteAccount qui permet à un utilisateur de supprimer son compte
  deleteAccount: async function (req, res) {
    // Je définis la variable userID qui récupère l'id de l'utilisateur via la query
    const { userID } = req.query;

    // Je crée une variable user qui cherche un utilisateur dans la base de données avec l'id récupéré via la query
    const user = await User.findOne({ where: { id: userID } });
    // Je crée la condition qui stipule que si l'utilisateur existe, il est supprimé
    if (user) {
      await user.destroy();
      req.session = null;
    }
    // Je renvoie un message de succès au statut 201 avec l'utilisateur supprimé
    res.status(201).json({ message: 'user deleted', user });
    // Je retourne ma fonction
    return;
  },

  picturesList: async function (req, res) {
    try {
      const picturesList = await Picture.findAll();
      res.status(200).json({ picturesList });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updatePicture: async function (req, res) {
    try {
      const { userID } = req.query;
      const { picture } = req.body;
      const user = await User.findOne({ where: { id: userID } });
      if (user) {
        await user.update({ picture: picture });
      }
      res.status(201).json({ message: 'user updated', user });
      return;
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  },
};
// J'exporte mon objet userController
module.exports = userController;
