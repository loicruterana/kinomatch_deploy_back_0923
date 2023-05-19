const Watched  = require('../models/watched');

const watchedController = {

    watchedList: async (req, res) => {
        const watchedList = await Watched.findAll();
        res.json(watchedList);
    },

    addWatchedMovie: async (req, res) => {

        const movieID = req.body.movieID;
             
        try {
            const addMovie = await Watched.create({movieID});
            res.status(201).json({ message: 'watched created', addMovie });
            return;
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }


}

module.exports = watchedController;