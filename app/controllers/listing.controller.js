const db = require("../models");
const config = require("../config/auth.config");
const Listing = db.listing;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");

exports.createListing = async (req, res) => {
  // Save User to Database
  try {
    console.log("recived");
    const listing = await Listing.create({
      address: req.body.address,
      university: req.body.university,
      semester: req.body.semester,
      rent:  req.body.rent,
      userid: req.body.userid,
    });
    res.send({ message: "Listing created successfully!" });
  } catch (error) {
    console.log("failed"+ error.message);
    res.status(500).send({ message: error.message });
  }
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const university = req.query.university;
  var condition = university ? { university: { [Op.like]: `%${university}%` } } : null;

  Listing.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Listings."
      });
    });
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
          err.message || "Some error occurred while retrieving Listings."
      });
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Listing.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Listing with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Listing with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
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

