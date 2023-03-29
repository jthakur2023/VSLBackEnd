module.exports = (sequelize, Sequelize) => {
    const Marketplace = sequelize.define("marketplaces", {
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
      negociable: {
        type: Sequelize.STRING
      },
      interested: {
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
    return Marketplace;
  };
  