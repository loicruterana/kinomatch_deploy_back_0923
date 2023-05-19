const Film = require('./film');
const User = require('./user');

User.belongstoMany(Film, {
    foreignKey: "user_id",
    foreignKey: "film_id",
    as: "watchedList",
    through: 'user_has_watched'
});

Film.belongsToMany(User,{
    foreignKey: "user_id",
    foreignKey: "film_id",
    as: "watchedOwners",
    through: 'user_has_watched'
})

User.belongstoMany(Film, {
    foreignKey: "user_id",
    foreignKey: "film_id",
    as: "want_to_seeList",
    through: 'user_wants_to_see'
});

Film.belongsToMany(User,{
    foreignKey: "user_id",
    foreignKey: "film_id",
    as: "want_to_seeOwners",
    through: 'user_wants_to_see'
})

User.belongstoMany(Film, {
    foreignKey: "user_id",
    foreignKey: "film_id",
    as: "bookmarked",
    through: 'user_has_bookmarked'
});

Film.belongsToMany(User,{
    foreignKey: "user_id",
    foreignKey: "film_id",
    as: "bookmarkedOwners",
    through: 'user_has_bookmarked'
})


module.exports = { Film, User };