module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define("favorites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
     });
  
    return Favorite;
  };
  