const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);

db.listing = require("../models/listing.model.js")(sequelize, Sequelize);

db.comment = require("../models/comment.model.js")(sequelize, Sequelize);
db.favorite = require("../models/favorites.model.js")(sequelize, Sequelize);
db.item = require("./item.model.js")(sequelize, Sequelize);

db.listing.belongsToMany(db.user, {
  through: "favorites",
  foreignKey: "listingId",
  otherKey: "userId"
});
db.user.belongsToMany(db.listing, {
  through: "favorites",
  foreignKey: "userId",
  otherKey: "listingId"
});

db.listing.hasMany(db.item, {as: "items"});
db.item.belongsTo(db.listing, {
  foreignKey: "listingId",
  as: "listing"
});

module.exports = db;
