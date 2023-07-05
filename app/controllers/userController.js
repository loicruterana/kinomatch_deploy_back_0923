// Je définis une variable user qui récupère le modèle User
const User = require('../models/user');
// Je définis une variable bcrypt qui récupère le module bcrypt
const bcrypt = require('bcrypt');
// Je définis une variable userController qui contient un objet avec les méthodes signupAction, loginAction, logoutAction et deleteAccount
const userController = {
  // Je définis la méthode signupAction qui permet à un utilisateur de s'inscrire
  signupAction: async function (req, res) {
    try {
      // Je définis les variables email, password et passwordConfirm qui récupèrent respectivement l'email, le mot de passe et la confirmation du mot de passe via le body
      const { email, password, passwordConfirm } = req.body;
      // Je crée la condition qui stipule que si le mot de passe et la confirmation du mot de passe ne correspondent pas, une erreur est renvoyée
      if (password !== passwordConfirm) {
        // Je renvoie une erreur au statut 400
        return res.status(400).json({ error: 'Le mot de passe ne correspond pas' });
      }
      // Je crée la condition qui stipule que si le mot de passe est inférieur à 8 caractères, une erreur est renvoyée
      if (password.length < 8) {
        // Je renvoie une erreur au statut 400
        return res.status(400).json({ error: 'Le mot de passe est trop court' });
      }
      // Je crée la condition qui stipule que si l'email n'est pas défini, une erreur est renvoyée avec le message "Email obligatoire"
      if (!email) {
        return res.status(400).json({ error: 'Email obligatoire' });
      }
      // Je crée une variable existingUser qui cherche un utilisateur dans la base de données avec l'email récupéré via le body
      const existingUser = await User.findOne({ where: { email } });
      // Je crée la condition qui stipule que si l'utilisateur existe déjà, une erreur est renvoyée avec le message "Email déjà utilisé"
      if (existingUser) {
        return res.status(400).json({ error: 'Email déjà utilisé' });
      }
      // Je crée une variable saltRounds qui contient le nombre de tours de hashage du password
      const saltRounds = 10;
      // Je crée une variable hashedPassword qui contient le mot de passe hashé
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Je crée une variable newUser qui crée un utilisateur dans la base de données avec l'email et le mot de passe hashé
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
      // Je renvoie un message de succès au statut 201 avec l'utilisateur créé
      return res.status(201).json({ message: 'Utilisateur créé', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
  },
  // Je définis la méthode loginAction qui permet à un utilisateur de se connecter
  loginAction: async function (req, res) {
    try {
      // Je définis les variables email et password qui récupèrent respectivement l'email et le mot de passe via le body
      const { email, password } = req.body;
      // Je crée la condition qui stipule que si l'email ou le mot de passe ne sont pas définis, une erreur est renvoyée avec le message "Email et mot de passe obligatoires"
      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe obligatoires' });
      }
      // Je crée une variable user qui cherche un utilisateur dans la base de données avec l'email récupéré via le body
      const user = await User.findOne({ where: { email } });
      // Je crée la condition qui stipule que si l'utilisateur n'existe pas, une erreur est renvoyée avec le message "Email ou mot de passe invalide"
      if (!user) {
        return res.status(400).json({ error: 'Email ou mot de passe invalide' });
      }
      // Je crée une variable isPasswordValid qui compare le mot de passe récupéré via le body avec le mot de passe de l'utilisateur
      const isPasswordValid = await bcrypt.compare(password, user.password);
      // Je crée la condition qui stipule que si le mot de passe n'est pas celui du user, une erreur est renvoyée avec le message "Email ou mot de passe invalide"
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Email ou mot de passe invalide' });
      } else if(isPasswordValid){
        // Je stocke l'utilisateur en session
        req.session.user = user;

        console.log(req.session.user);
        console.log(req.headers)
        res.cookie('userToken', user.id, { maxAge: 24 * 60 * 60 * 1000
          // , 
          // httpOnly: false 
        });

         // Stockez l'utilisateur en session ici si vous utilisez des sessions
        return res.status(200).json({ message: 'Utilisateur connecté', user });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
    }
  },

  checkLogin: function(req, res) {
    try {
      if (req.session.user) {
          return res.status(200).json({ loggedIn: true, user: req.session.user })
        } else { 
          return res.status(200).json({ loggedIn: false })}
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur lors de la vérification de l\'utilisateur' });
    }
  },

  // Je définis la méthode logoutAction qui permet à un utilisateur de se déconnecter
  logout: function(req, res) {
    // Je supprime l'utilisateur de la session
    delete req.session.user;
    // Je renvoie un message de succès au statut 201
    res.status(201).json({ message: 'user loggedout' });
  },
  // Je définis la méthode deleteAccount qui permet à un utilisateur de supprimer son compte
  deleteAccount: async function(req, res) {
    // Je définis la variable userID qui récupère l'id de l'utilisateur via la query
    const { userID } = req.query;

    // Je crée une variable user qui cherche un utilisateur dans la base de données avec l'id récupéré via la query
    const user = await User.findOne({ where: { id: userID }});
                // Je crée la condition qui stipule que si l'utilisateur existe, il est supprimé 
        if (user) { await user.destroy();}
        // Je renvoie un message de succès au statut 201 avec l'utilisateur supprimé    
    res.status(201).json({ message: 'user deleted', user });
    // Je retourne ma fonction
    return;
  }
  
};
// J'exporte mon objet userController
module.exports = userController;
