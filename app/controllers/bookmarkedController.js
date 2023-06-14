// je définis la variable bookmarked qui récupère le model bookmarked
const Bookmarked = require('../models/bookmarked');
// je définis la variable bookmarkedController qui contient les méthodes bookmarkedList, addBookmarkedMovie et deleteBookmarkedMovie
const bookmarkedController = {
    // je définis la méthode bookmarkedList
    bookmarkedList: async (req, res) => {
        // je définis la variable userID qui récupère l'id de l'utilisateur via la query
        const { userID } = req.query;

        try {
            // je crée une condition qui renvoie une erreur si l'id de l'utilisateur n'est pas défini
            if(!userID){
                throw new Error("userID is not defined");
            }
            // je définis la variable bookmarkedList qui récupère la liste des films favoris de l'utilisateur grâce à son id
            const bookmarkedList = await Bookmarked.findAll({
                where: {
                    user_id: userID,
                },
            });
            res.json(bookmarkedList);
        } catch (error) {
            console.log(error);
            res.status(500).send("erreur");
        }        
    },
    // je définis la méthode addBookmarkedMovie
    addBookmarkedMovie: async (req, res) => {
        // je définis les variables id et bookmarked qui récupèrent les id de l'utilisateur et du film via le body
        const { id, bookmarked } = req.body;
        // je définis la variable existingMovie qui récupère le film favoris de l'utilisateur
        const existingMovie = await Bookmarked.findOne({ where: { user_id: id.toString(), film_id: bookmarked.toString() }});
        // je vérifie si le film n'est pas déjà favoris de l'utilisateur
        if (!existingMovie){
            try {
                // si ce n'est pas le cas, je définis la variable addMovieToBookmarked qui ajoute le film dans la bdd
                const addMovieToBookmarked = await Bookmarked.create({
                    user_id: id,
                    film_id: bookmarked,
            });
                res.status(200).json({ message: 'bookmarked created', addMovieToBookmarked });
                return;
            } catch (error) {
                console.log(error);
                res.status(500);
            }
        } else {
            // si le film est déjà dans les favoris de l'utilisateur, je renvoie un message d'erreur
            res.status(400).json({ message: 'bookmarked already created'});

        }
    },
    // je définis la méthode deleteBookmarkedMovie
    deleteBookmarkedMovie: async (req, res) => {
        // je définis les variables userID et movieID qui récupèrent les id de l'utilisateur et du film via la query
        const { userID, movieID } = req.query;
             
        try {
            // je définis la variable row qui récupère le film favori en question
            const row = await Bookmarked.findOne({ where: { user_id: userID, film_id: movieID, }, });
            // si le film existe, je le supprime 
            if (row) { await row.destroy();} // deletes the row }
            // je renvoie un message de confirmation
            res.status(201).json({ message: 'bookmarked deleted', row });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },



}
// j'exporte le module bookmarkedController
module.exports = bookmarkedController;