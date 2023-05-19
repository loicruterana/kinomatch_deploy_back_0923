// const Film = require('./film');
// const User = require('./user');
// const Watched = require('./watched');



// User.belongstoMany(Film, {
//     through: "user_has_film",
//     foreignKey: "user_id",
//     otherKey: "film_id",
//     as: "watchedList",
//     });

// Film.belongsToMany(User,{
//     through: "user_has_film",
//     foreignKey: "film_id",
//     otherKey: "user_id",
//     as: "watchedOwners",
//     })

// // User.belongstoMany(Film, {
// //     foreignKey: "user_id",
// //     foreignKey: "film_id",
// //     as: "want_to_seeList",
// // });

// // Film.belongsToMany(User,{
// //     foreignKey: "user_id",
// //     foreignKey: "film_id",
// //     as: "want_to_seeOwners",
// // })

// // User.belongstoMany(Film, {
// //     foreignKey: "user_id",
// //     foreignKey: "film_id",
// //     as: "bookmarked",
// // });

// // Film.belongsToMany(User,{
// //     foreignKey: "user_id",
// //     foreignKey: "film_id",
// //     as: "bookmarkedOwners",
// // })


// module.exports = { Film, User };