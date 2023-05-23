const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const userController = {
  
  signupAction: async function (req, res) {
    try {
      const { email, password, passwordConfirm } = req.body;
      if (password !== passwordConfirm) {
        return res.status(400).json({ error: 'Le mot de passe ne correspond pas' });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: 'Le mot de passe est trop court' });
      }
      if (!email) {
        return res.status(400).json({ error: 'Email obligatoire' });
      }
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email déjà utilisé' });
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
      return res.status(201).json({ message: 'Utilisateur créé', user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
  },

  loginAction: async function (req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe obligatoires' });
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Email ou mot de passe invalide' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Email ou mot de passe invalide' });
      }
      // Stockez l'utilisateur en session ici si vous utilisez des sessions
      return res.status(200).json({ message: 'Utilisateur connecté', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
    }
  },

  logout: function(req, res) {
    delete req.session.user;
    
    res.status(201).json({ message: 'user loggedout' });
  },

  deleteAccount: async function(req, res) {

    const data = req.body;

    const user = await User.findOne({ where: { email: data.email }}); 
                if (user) { await user.destroy();} // deletes the user
            
    res.status(201).json({ message: 'user deleted', user });
    return;
    
  }
};

module.exports = userController;
