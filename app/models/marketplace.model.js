module.exports = (sequelize, Sequelize) => {
    const Marketplace = sequelize.define("marketplace", {
      image: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      condition: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      university: {
        type: Sequelize.STRING
      },
    });
    return Marketplace;
  };
  