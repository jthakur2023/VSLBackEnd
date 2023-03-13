const db = require("../models");
const config = require("../config/auth.config");
const Comment = db.comment;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");

exports.createComment = async (req, res) => {
  // Save User to Database
  try {
    const comment = await Comment.create({
      comment: req.body.comment,
      userid: req.body.userid,
      listingid: req.body.listingid,
    });
    res.send({ message: "Comment created successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


// Retrieve all Tutorials from the database.
exports.findAllCommentByListingId = (req, res) => {
  const id = req.params.id;
  
  Comment.findAll({ where: { listingid : id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    });
};


// Retrieve all Tutorials from the database.
exports.findAllCommentByUserId = (req, res) => {
    const id = req.params.id;
    
    Comment.findAll({ where: { userid : id} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving comments."
        });
      });
  };
  
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving comment with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update comment with id=${id}. Maybe comment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating comment with id=" + id
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Listing.findAll({  })
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
  

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete comment with id=${id}. Maybe comment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete comment with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Comment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} comments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all comments."
      });
    });
};

