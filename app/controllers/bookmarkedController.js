const Film = require('../models/film');
const Bookmarked = require('../models/bookmarked');
const TMDB = require("../utils/TMDB");


const bookmarkedController = {


    bookmarkedList: async (req, res) => {

        const userID = req.body.id;
        // const UserID = req.session.user;

        const bookmarkedList = await Bookmarked.findAll({
            where: {
                user_id: userID,
              },
            // include: 'bookmarked',       
        });
        

        res.json(bookmarkedList);
    },

    addBookmarkedMovie: async (req, res) => {

        const { id, bookmarked } = req.body;


        // const UserID = req.session.user;
        // const UserID = req.body.UserID;

        // const movieID = req.body.MovieID;


             
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

        const UserID = '30';
        const movieID = '90';
        // const UserID = req.session.user;
        // const UserID = req.body.UserID;
        // const movieID = req.body.MovieID;
             
        try {

            const row = await Bookmarked.findOne({ where: { user_id: UserID, film_id: movieID, }, }); 
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