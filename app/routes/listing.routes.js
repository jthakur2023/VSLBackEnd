const { authJwt } = require("../middleware");
const controller = require("../controllers/listing.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/listings", controller.createListing);
  app.put("/api/listings/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/listings/:id", [authJwt.verifyToken], controller.delete);
  
  app.get("/api/listings/:id", [authJwt.verifyToken], controller.findOne);
  app.get("/api/listingsByUser/:id", [authJwt.verifyToken], controller.findAllByUser);
  app.get("/api/listings", [authJwt.verifyToken], controller.findAll);
  
}




// module.exports = app => {
//   const listings = require("../controllers/listing.controller.js");

//   var router = require("express").Router();

//   // Create a new Tutorial
//   router.post("/", listings.create);

//   // Retrieve all Tutorials
//   router.get("/", listings.findAll);

//   // Retrieve a single Tutorial with id
//   router.get("/:id", listings.findOne);

//   // Update a Tutorial with id
//   router.put("/:id", listings.update);

//   // Delete a Tutorial with id
//   router.delete("/:id", listings.delete);

//   // Delete all Tutorials
//   router.delete("/", listings.deleteAll);

//   app.use('/api/listings', router);
// };
