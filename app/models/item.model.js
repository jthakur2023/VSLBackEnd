module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
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
      negotiable: {
        type: Sequelize.STRING
      }
    });
    return Item;
  };
  