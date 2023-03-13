module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
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
      listingid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'listings',
          key: 'id'
        }
      },
    });
  
    return Comment;
};
  