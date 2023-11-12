// je définis la variable recommended qui récupère le film recommandé
const Recommended = require('../models/recommended');
// je définis la variable TMDB qui récupère les informations du film recommandé
const TMDB = require('../utils/TMDB');

const recommendedController = {
    // je définis la méthode recommendedList
    recommendedList: async (req, res) => {
    // je définis la variable id qui récupère l'id de l'utilisateur
    const { userID } = req.query;

    try {
        // Je crée une condition qui renvoie une erreur si l'id de l'utilisateur n'est pas défini
        if (!userID) {
          throw new Error('userID is not defined');
        }
  
        // Je vérifie si l'utilisateur est autorisé en utilisant req.session.authorized
        // et si c'est le cas, je récupère la liste des films recommandés de l'utilisateur
        if (userID && req.session.authorized) {
        // if (userID) {
          console.log('YOOOOOOO');
          const recommendedList = await Recommended.findAll({
            where: {
              user_id: userID,
            },
          });
  
          // je crée un tableau qui va contenir les informations de chaque film à regarder
          const recommendedListTitles = [];
  
          // je crée une boucle qui permet de récupérer les informations de chaque film à regarder
          for (const movie of recommendedList) {
            // je définis la variable movieDetails qui récupère les informations de chaque film à regarder
            const movieDetails = await TMDB.getMovieDetails(
              movie.dataValues.film_id
            );
            // je convertis les informations de chaque film à regarder en json
            const response = await movieDetails.json();
            // je retourne le titre de chaque film à regarder
            console.log(
              'movieTitle :',
              response.title,
              'movieID :',
              movie.dataValues.film_id
            );
            recommendedListTitles.push({
              film_id: movie.dataValues.film_id,
              film_title: response.title,
            });
          }
  
          // res.json(recommendedList);
          res.json({ recommendedList });
        } else {
          // Sinon, je renvoie une erreur indiquant que l'utilisateur n'est pas autorisé
          throw new Error('User is not authorized');
        }
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
    },

    // je définis la méthode addRecommendedMovie
  addRecommendedMovie: async (req, res) => {
    // je définis les variables id et Recommended qui récupère les id de l'utilisateur et du film via le body
    const { senderUserID, movieID, receiverUserID } = req.body;
    // je définis la variable existingMovie qui récupère les films recommandés de l'utilisateur
    const existingMovie = await Recommended.findOne({
      where: { user_id: receiverUserID.toString(), film_id: movieID.toString(), sentBy: senderUserID.toString() },
    });
    // je vérifie si le film n'est pas déjà recommandé par le même selectedUserId chez l'utilisateur
    if (!existingMovie && req.session.authorized) {
      try {
        // si ce n'est pas le cas, je définis la variable addMovieToRecommended qui ajoute le film dans la bdd Recommended
        const addMovieToRecommended = await Recommended.create({
          user_id: receiverUserID,
          film_id: movieID,
          sentBy: senderUserID,
        });
        res
          .status(200)
          .json({ message: 'Recommended created', addMovieToRecommended });
        return;
      } catch (error) {
        console.log(error);
        res.status(500);
      }
    } else {
      // si le film est déjà dans les favoris de l'utilisateur, je renvoie un message d'erreur
      res.status(400).json({ message: 'recommended already created' });
    }
  },
  // je définis la méthode deleteRecommendedMovie
  deleteRecommendedMovie: async (req, res) => {
    // je définis les variables userID et movieID qui récupèrent les id de l'utilisateur et du film via la query
    const { userID, movieID } = req.query;

    try {
      // je définis la variable row qui récupère le film favori en question
      const row = await Recommended.findOne({
        where: { user_id: userID, film_id: movieID },
      });
      // si le film existe, je le supprime
      if (row && req.session.authorized) {
        await row.destroy();
      } // deletes the row }
      // je renvoie un message de confirmation
      res.status(201).json({ message: 'Recommended deleted', row });
      return;
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};

// j'exporte recommendedController
module.exports = recommendedController;
