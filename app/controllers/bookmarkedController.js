const Film = require('../models/film');
const Bookmarked = require('../models/bookmarked');
const TMDB = require("../utils/TMDB");


const bookmarkedController = {


    bookmarkedList: async (req, res) => {

        const { userID } = req.query;

        try {

            if(!userID){
                throw new Error("userID is not defined");
            }
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

    addBookmarkedMovie: async (req, res) => {

        const { id, bookmarked } = req.body;
             
        try {
            const addMovieToBookmarked = await Bookmarked.create({
                user_id: id,
                film_id: bookmarked,
        });
            res.status(201).json({ message: 'bookmarked created', addMovieToBookmarked });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    deleteBookmarkedMovie: async (req, res) => {

        const { userID, movieID } = req.query;
             
        try {

            const row = await Bookmarked.findOne({ where: { user_id: userID, film_id: movieID, }, }); 
            if (row) { await row.destroy();} // deletes the row }
            
            res.status(201).json({ message: 'bookmarked deleted', row });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },



}

module.exports = bookmarkedController;