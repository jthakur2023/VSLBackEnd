module.exports = (sequelize, Sequelize) => {
  const Listing = sequelize.define("listings", {
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.STRING
    },
    rooms: {
      type: Sequelize.STRING
    },
    baths: {
      type: Sequelize.STRING
    },
    area: {
      type: Sequelize.STRING
    },
    gender: {
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
    views: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    },
    image2: {
      type: Sequelize.STRING
    },
    image3: {
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
