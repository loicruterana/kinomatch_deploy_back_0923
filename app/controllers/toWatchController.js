const Film = require('../models/film');
const ToWatch = require('../models/toWatch');
const TMDB = require("../utils/TMDB");


const toWatchController = {


    toWatchList: async (req, res) => {

        const { id, toWatch } = req.body;
        // const UserID = req.session.user;

        const toWatchList = await ToWatch.findAll({
            where: {
                user_id: id,
              },
            // include: 'toWatch',       
        });
        

        res.json(toWatchList);
    },

    addToWatchMovie: async (req, res) => {

        const { id, toWatch } = req.body;


        // const UserID = req.session.users;
        // const UserID = req.body.UserID;

        // const movieID = req.body.MovieID;


             
        try {
            const addMovieToWatch = await ToWatch.create({
                user_id: id,
                film_id: toWatch,
        });
            res.status(201).json({ message: 'toWatch created', addMovieToWatch });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    deleteToWatchMovie: async (req, res) => {

        const { id, toWatch } = req.body;
        // const UserID = req.session.user;
        // const UserID = req.body.UserID;
        // const movieID = req.body.MovieID;
             
        try {

            const row = await ToWatch.findOne({ where: { user_id: id, film_id: toWatch, }, }); 
            if (row) { await row.destroy();} // deletes the row }
            
            res.status(201).json({ message: 'toWatch deleted', row });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },



}

module.exports = toWatchController;