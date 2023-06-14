// je définis la variable Film qui récupère le model Film
const Film = require('../models/film');
// je définis la variable movieController qui contient la méthode checkMovie
const movieController = {
    // je définis la méthode checkMovie
    checkMovie: async (req, res) => {

    //1. Aller chercher dans notre Database si le film requis existe
    const movieID = req.body.movieID;
    // je définis la variable verifyMovie qui récupère le film dans la bdd
    const verifyMovie = await Film.findOne({
        where: {codeTMDB: movieID}
    });
    
    //2. Si ce n'est pas le cas, l'ajouter
    if (!verifyMovie){
    
        try {
            // je définis la variable addMovie qui ajoute le film dans la bdd
            const addMovie = await Film.create({
                codeTMDB: movieID
            });
            // je renvoie un message de confirmation
            res.status(201).json({ message: 'movie added', addMovie });
            return;
        } catch (error) {
            console.error(error);
            // si erreur, je renvoie un message d'erreur
            res.status(500).json({ message: 'Error when adding movie' });
            return;      
        }
       
    } else {
        // si le film existe déjà, je renvoie un message d'erreur
        res.status(201).json({ message: 'movie already exist' });

        return;
    }
    return;
    
    }
}
// j'exporte le module movieController
module.exports = movieController;