const db = require("../models");
const config = require("../config/auth.config");
const Marketplace = db.marketplace;
const User = db.user;
const Favorite = db.favorite;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");

exports.createMarketPlace = async (req, res) => {
  // Save User to Database
  try {
    console.log("recived");
    const marketplace = await Marketplace.create({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      price:  req.body.price,
      userid: req.body.userid,
      negoctiable: req.body.negoctiable,
    });
    res.send({ message: "Item created successfully!" });
  } catch (error) {
    console.log("failed"+ error.message);
    res.status(500).send({ message: error.message });
  }
};


// Retrieve all Tutorials from the database.
exports.findAllByUser = (req, res) => {
  const id = req.params.id;
  

  Listing.findAll({ where: { userid: id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Items."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Listing.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Item with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};

// Update a listings by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Listing.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Listings was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Listings with id=${id}. Maybe Listings was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Listings with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Listing.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Listings was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Listings with id=${id}. Maybe Listings was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Listings with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Listing.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Listings were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all listings."
      });
    });
};


// Retrieve all Tutorials from the database.
exports.findFavorites = (req, res) => {
  const id = req.params.userid;
  
  User.findOne({ where: { id: id}, include: Listing })
    .then(data => {
      //console.log(data.dataValues.listings);
      res.send(data.dataValues.listings);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Listings."
      });
    });
};


exports.deleteFavorite = (req, res) => {
  const userId = req.body.userid;
  const listingId = req.body.listingid;
 
  //console.log(userId);
  //console.log(listingId); 
  Favorite.destroy({
    where: { userId: userId, listingId: listingId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Listings was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete favorite. Maybe Listings was not found!`
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete favorite"
      });
    });
};


