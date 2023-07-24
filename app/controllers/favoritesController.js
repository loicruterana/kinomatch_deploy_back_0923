// je définis la variable favorites qui récupère le model favorites
const Favorites = require('../models/favorites');
// je définis la variable favoritesController qui contient les méthodes favoritesList, addfavoritesMovie et deletefavoritesMovie
const favoritesController = {
  // je définis la méthode favoritesList
  favoritesList: async (req, res) => {
    // Je définis la variable userID qui récupère l'id de l'utilisateur via la query
    const { userID } = req.query;

    try {
      // Je crée une condition qui renvoie une erreur si l'id de l'utilisateur n'est pas défini
      if (!userID) {
        throw new Error('userID is not defined');
      }

      // Je vérifie si l'utilisateur est autorisé en utilisant req.session.authorized
      // et si c'est le cas, je récupère la liste des films favoris de l'utilisateur
      if (userID && req.session.authorized) {
        console.log('YOOOOOOO');
        const favoritesList = await Favorites.findAll({
          where: {
            user_id: userID,
          },
        });
        res.json(favoritesList);
      } else {
        // Sinon, je renvoie une erreur indiquant que l'utilisateur n'est pas autorisé
        throw new Error('User is not authorized');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // je définis la méthode addFavoritesMovie
  addFavoritesMovie: async (req, res) => {
    // je définis les variables id et favorites qui récupèrent les id de l'utilisateur et du film via le body
    const { id, favorites } = req.body;
    // je définis la variable existingMovie qui récupère le film favoris de l'utilisateur
    const existingMovie = await Favorites.findOne({
      where: { user_id: id.toString(), film_id: favorites.toString() },
    });
    // je vérifie si le film n'est pas déjà favoris de l'utilisateur
    if (!existingMovie && req.session.authorized) {
      try {
        // si ce n'est pas le cas, je définis la variable addMovieToFavorites qui ajoute le film dans la bdd Favorites
        const addMovieToFavorites = await Favorites.create({
          user_id: id,
          film_id: favorites,
        });
        res
          .status(200)
          .json({ message: 'Favorites created', addMovieToFavorites });
        return;
      } catch (error) {
        console.log(error);
        res.status(500);
      }
    } else {
      // si le film est déjà dans les favoris de l'utilisateur, je renvoie un message d'erreur
      res.status(400).json({ message: 'favorites already created' });
    }
  },
  // je définis la méthode deleteFavoritesMovie
  deleteFavoritesMovie: async (req, res) => {
    // je définis les variables userID et movieID qui récupèrent les id de l'utilisateur et du film via la query
    const { userID, movieID } = req.query;

    try {
      // je définis la variable row qui récupère le film favori en question
      const row = await Favorites.findOne({
        where: { user_id: userID, film_id: movieID },
      });
      // si le film existe, je le supprime
      if (row && req.session.authorized) {
        await row.destroy();
      } // deletes the row }
      // je renvoie un message de confirmation
      res.status(201).json({ message: 'favorites deleted', row });
      return;
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
// j'exporte le module favoritesController
module.exports = favoritesController;
