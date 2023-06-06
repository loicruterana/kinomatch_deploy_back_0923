const Film = require('../models/film');
const ToWatch = require('../models/toWatch');
const TMDB = require("../utils/TMDB");


const toWatchController = {


    toWatchList: async (req, res) => {

        const { userID } = req.query;
               
        console.log(userID);

        try {

            if(!userID){
                throw new Error("userID is not defined");
            }
            const toWatchList = await ToWatch.findAll({
                where: {
                    user_id: userID,
                },
            
            });
            res.json(toWatchList);
        } catch (error) {
            console.log(error);
            res.status(500).send("erreur");
        }
            
    },

    addToWatchMovie: async (req, res) => {

        const { id, toWatch } = req.body;

        console.log(id, toWatch);
             
        try {
            const addMovieTotoWatch = await ToWatch.create({
                user_id: id,
                film_id: toWatch,
        });
            res.status(201).json({ message: 'toWatch created', addMovieTotoWatch });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    deleteToWatchMovie: async (req, res) => {

        const { userID, movieID } = req.query;
             
        try {

            const row = await ToWatch.findOne({ where: { user_id: userID, film_id: movieID, }, }); 
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