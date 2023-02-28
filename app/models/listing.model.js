module.exports = (sequelize, Sequelize) => {
  const Listing = sequelize.define("listings", {
    address: {
      type: Sequelize.STRING
    },
    university: {
      type: Sequelize.STRING
    },
    semester: {
      type: Sequelize.STRING
    },
    rent: {
      type: Sequelize.STRING
    },
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         
        model: 'users',
        key: 'id'
      }
    },
  });
  return Listing;
};
