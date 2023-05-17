const checkLogged = (req, res, next) => {
    if (!req.session.user) {
      res.redirect('/login');
      return; // return stoppe l'execution de la fonction, on va plus loin
    }
    next(); // si on n'est pas rentrée dans le if, c'est qu'on est connecté, donc on appelle next pour passer au middleware suivant
  };
  
  module.exports = checkLogged;