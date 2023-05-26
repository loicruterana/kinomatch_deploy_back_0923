const Film = require('../models/film');
const Watched = require('../models/watched');
const TMDB = require("../utils/TMDB");


const watchedController = {


    watchedList: async (req, res) => {

        const { userID } = req.query;

        console.log(userID);

        try {

            if(!userID){
                throw new Error("userID is not defined");
            }
            const watchedList = await Watched.findAll({
                where: {
                    user_id: userID,
                },
            
            });
            res.json(watchedList);
        } catch (error) {
            console.log(error);
            res.status(500).send("erreur");
        }
            
    },

    addWatchedMovie: async (req, res) => {

        const { id, watched } = req.body;
             
        try {
            const addMovieToWatched = await Watched.create({
                user_id: id,
                film_id: watched,
        });
            res.status(201).json({ message: 'watched created', addMovieToWatched });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    deleteWatchedMovie: async (req, res) => {

        const { userID, movieID } = req.query;
             
        try {

            const row = await Watched.findOne({ where: { user_id: userID, film_id: movieID, }, }); 
            if (row) { await row.destroy();} // deletes the row }
            
            res.status(201).json({ message: 'watched deleted', row });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },



}

module.exports = watchedController;