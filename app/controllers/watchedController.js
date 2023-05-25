const Film = require('../models/film');
const Watched = require('../models/watched');
const TMDB = require("../utils/TMDB");


const watchedController = {


    watchedList: async (req, res) => {

        const { id, watched } = req.body;
        // const UserID = req.session.user;

        const watchedList = await Watched.findAll({
            where: {
                user_id: id,
              },
            // include: 'Watched',       
        });
        

        res.json(watchedList);
    },

    addWatchedMovie: async (req, res) => {

        const { id, watched } = req.body;


        // const UserID = req.session.users;
        // const UserID = req.body.UserID;

        // const movieID = req.body.MovieID;


             
        try {
            const addMovieWatched = await Watched.create({
                user_id: id,
                film_id: watched,
        });
            res.status(201).json({ message: 'Watched created', addMovieWatched });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    deleteWatchedMovie: async (req, res) => {

        const { id, watched } = req.body;
        // const UserID = req.session.user;
        // const UserID = req.body.UserID;
        // const movieID = req.body.MovieID;
             
        try {

            const row = await Watched.findOne({ where: { user_id: id, film_id: watched, }, }); 
            if (row) { await row.destroy();} // deletes the row }
            
            res.status(201).json({ message: 'Watched deleted', row });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },



}

module.exports = watchedController;