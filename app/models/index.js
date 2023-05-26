const Film = require('./film');
const User = require('./user');
const Bookmarked = require('./bookmarked');
const ToWatch = require('./toWatch');
const Watched = require('./watched');




// User.belongsToMany(Film, {
//     through: Watched,
//     foreignKey: "user_id",
//     as: "watchedList",
//     });

// Film.belongsToMany(User,{
//     through: Watched,
//     foreignKey: "film_id",
//     as: "watchedOwners",
//     })

// User.belongstoMany(Film, {
//     foreignKey: "user_id",
//     foreignKey: "film_id",
//     as: "want_to_seeList",
// });

// Film.belongsToMany(User,{
//     foreignKey: "user_id",
//     foreignKey: "film_id",
//     as: "want_to_seeOwners",
// })

// User.belongstoMany(Film, {
//     foreignKey: "user_id",
//     foreignKey: "film_id",
//     as: "bookmarked",
// });

// Film.belongsToMany(User,{
//     foreignKey: "user_id",
//     foreignKey: "film_id",
//     as: "bookmarkedOwners",
// })


module.exports = { Film, User, Bookmarked };