module.exports = (sequelize, Sequelize) => {
  const Listing = sequelize.define("listings", {
    address: {
      type: Sequelize.STRING
    },
    laundry: {
      type: Sequelize.STRING
    },
    gym: {
      type: Sequelize.STRING
    },
    pool: {
      type: Sequelize.STRING
    },
    parking: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    sublease: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    personalNote: {
      type: Sequelize.STRING
    },
    wifi: {
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
    bedrooms: {
      type: Sequelize.STRING
    },
    bathrooms: {
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
