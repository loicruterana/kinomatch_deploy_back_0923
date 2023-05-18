const DecadeConverter = {

    getDecade: async (date) => {
        return (Math.floor(date.getFullYear() / 10) * 10) + 's';
      }

};

module.exports = DecadeConverter;