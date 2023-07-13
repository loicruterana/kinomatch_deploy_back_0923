// Je définis la variable Watched qui récupère le modèle Watched de app/models/watched.js
const Watched = require('../models/watched');

// Je définis la variable watchedController qui contient un objet avec les méthodes watchedList, addWatchedMovie et deleteWatchedMovie
const watchedController = {
  // Je définis la méthode watchedList qui permet de récupérer la liste des films regardés par un utilisateur
  watchedList: async (req, res) => {
    // Je définis la variable userID qui récupère l'id de l'utilisateur via la query string
    const { userID } = req.query;

    try {
      // je crée la condition qui stipule que si l'id de l'utilisateur n'est pas défini, une erreur est renvoyée
      if (!userID) {
        throw new Error('userID is not defined');
      }
      if (userID && req.session.authorized) {
        // Je définis la variable watchedList qui récupère tous les films regardés par l'utilisateur dont l'id est userID
        const watchedList = await Watched.findAll({
          where: {
            user_id: userID,
          },
        });
        // Je renvoie la liste des films regardés par l'utilisateur via un objet JSON
        res.json(watchedList);
      }
    } catch (error) {
      // si une erreur est renvoyée, je l'affiche dans la console et je renvoie une erreur 500
      console.log(error);
      // je renvoie une erreur au statut 500
      res.status(500).send('erreur');
    }
  },

  // Je définis la méthode addWatchedMovie qui permet d'ajouter un film regardé par un utilisateur à la base de données
  addWatchedMovie: async (req, res) => {
    // Je définis les variables id et watched qui récupèrent respectivement l'id de l'utilisateur et l'id du film regardé via le body
    const { id, watched } = req.body;
    // Je définis la variable existingMovie qui récupère le film regardé par l'utilisateur dont l'id est id et l'id du film regardé est watched
    const existingMovie = await Watched.findOne({
      where: { user_id: id.toString(), film_id: watched.toString() },
    });
    // Je crée la condition qui stipule que si le film regardé par l'utilisateur n'existe pas dans la base de donnée, je l'y ajoute
    if (!existingMovie && req.session.authorized) {
      try {
        // Je définis la variable addMovieToWatched qui crée dans la base de données un film regardé par l'utilisateur dont l'id est id et l'id du film regardé est watched
        const addMovieToWatched = await Watched.create({
          user_id: id,
          film_id: watched,
        });
        // Je renvoie un objet JSON avec le message "watched created" et le film regardé par l'utilisateur
        res.status(201).json({ message: 'watched created', addMovieToWatched });
        // Je retourne la fonction
        return;
      } catch (error) {
        res.status(500);
      }
    } else {
      // Si le film regardé par l'utilisateur existe déjà dans la base de données, je renvoie un objet JSON avec le message "watched already created"
      res.status(400).json({ message: 'watched already created' });
    }
  },

  // Je définis la méthode deleteWatchedMovie qui permet de supprimer un film regardé par un utilisateur de la base de données
  deleteWatchedMovie: async (req, res) => {
    // Je définis les variables userID et movieID qui récupèrent respectivement l'id de l'utilisateur et l'id du film regardé via la query string
    const { userID, movieID } = req.query;

    try {
      // Je définis la variable row qui récupère le film regardé par l'utilisateur dont l'id est userID et l'id du film regardé est movieID
      const row = await Watched.findOne({
        where: { user_id: userID, film_id: movieID },
      });
      // Je crée la condition qui stipule que si le film regardé par l'utilisateur existe dans la base de données, je le supprime
      if (row && req.session.authorized) {
        await row.destroy();
      }
      // Je renvoie un objet JSON avec le message "watched deleted" et le film regardé par l'utilisateur
      res.status(201).json({ message: 'watched deleted', row });
      // Je retourne la fonction
      return;
    } catch (error) {
      res.status(500);
    }
  },
};
// J'exporte watchedController afin de pouvoir l'utiliser dans app.js
module.exports = watchedController;
