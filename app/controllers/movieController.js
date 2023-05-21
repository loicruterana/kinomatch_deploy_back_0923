const TMDB = require("../utils/TMDB");
const TMDBController = require('./TMDBController');
const Film = require('../models/film');


const movieController = {

    checkMovie: async (req, res) => {

    //1. Aller chercher dans notre Database si le film requis existe
    const movieID = 79;
    // const movieID = req.body.movieID;

    const verifyMovie = await Film.findOne({
        where: {codeTMDB: movieID}
    });
    
    //2. Si ce n'est pas le cas, l'ajouter
    if (!verifyMovie){
    
        try {
            const addMovie = await Film.create({
                codeTMDB: movieID
            });
            console.log("movieAdded!");
            res.status(201).json({ message: 'movie added', addMovie });
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error when adding movie' });
            return;      
        }
       
    } else {
        res.status(201).json({ message: 'movie already exist' });

        return;
    }
    return;
    
    }
}

module.exports = movieController;