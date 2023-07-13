// je définis la variable ToWatch qui récupère le modèle ToWatch
const ToWatch = require('../models/toWatch');

// je définis la variable toWatchController qui contient un objet avec les méthodes toWatchList, addToWatchMovie et deleteToWatchMovie
const toWatchController = {
  // Je définis la méthode toWatchList qui permet de récupérer la liste des films à regarder par un utilisateur
  toWatchList: async (req, res) => {
    // Je définis la variable userID qui récupère l'id de l'utilisateur via la query string
    const { userID } = req.query;

    try {
      // je crée une condition qui permet de vérifier si l'id de l'utilisateur est bien défini
      if (!userID) {
        throw new Error('userID is not defined');
      }
      if (userID && req.session.authorized) {
        // je définis la variable toWatchList qui récupère la liste des films à regarder par un utilisateur
        const toWatchList = await ToWatch.findAll({
          where: {
            user_id: userID,
          },
        });
        // je retourne la liste des films à regarder par un utilisateur
        res.json(toWatchList);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('erreur');
    }
  },
  // Je définis la méthode addToWatchMovie qui permet d'ajouter un film à regarder dans la bdd par un utilisateur
  addToWatchMovie: async (req, res) => {
    // Je définis la variable id qui récupère l'id de l'utilisateur et son film à regarder via le body
    const { id, toWatch } = req.body;

    // je définis la variable existingMovie qui va vérifier si le film à regarder n'est pas déjà présent dans la bdd
    const existingMovie = await ToWatch.findOne({
      where: { user_id: id.toString(), film_id: toWatch.toString() },
    });
    // je stipule que si le film à regarder n'est pas présent dans la bdd, alors je l'ajoute
    if (!existingMovie && req.session.authorized) {
      try {
        // je définis la variable addMovieTotoWatch qui permet d'ajouter un film à regarder dans la bdd par un utilisateur
        const addMovieTotoWatch = await ToWatch.create({
          user_id: id,
          film_id: toWatch,
        });
        // je retourne le message "toWatch created" et le film à regarder ajouté dans la bdd
        res.status(201).json({ message: 'toWatch created', addMovieTotoWatch });
        return;
      } catch (error) {
        console.log(error);
        res.status(500);
      }
    } else {
      // je retourne le message "toWatch already created" si le film à regarder est déjà présent dans la bdd
      res.status(400).json({ message: 'toWatch already created' });
    }
  },

  // Je définis la méthode deleteToWatchMovie qui permet de supprimer de la bdd un film à regarder par un utilisateur
  deleteToWatchMovie: async (req, res) => {
    // Je définis la variable userID et movieID qui récupère l'id de l'utilisateur et l'id du film à regarder via la query string
    const { userID, movieID } = req.query;

    try {
      // je définis la variable row qui va vérifier si le film à regarder est bien présent dans la bdd
      const row = await ToWatch.findOne({
        where: { user_id: userID, film_id: movieID },
      });
      // je stipule que si le film à regarder est bien présent dans la bdd, alors je le supprime
      if (row && req.session.authorized) {
        await row.destroy();
      } // deletes the row }
      // je retourne le message "toWatch deleted" et le film à regarder supprimé de la bdd
      res.status(201).json({ message: 'toWatch deleted', row });
      return;
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
//
module.exports = toWatchController;
