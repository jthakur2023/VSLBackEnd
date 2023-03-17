const { authJwt } = require("../middleware");
const controller = require("../controllers/listing.controller");
const multer  = require('multer')
const path  = require('path')


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  const storage = multer.diskStorage({
    destination:'src/app/images/',
    filename:(req, file, cb) => {
      return cb(null, `${Date.now()}_${path.extname(file.originalname)}`)
    }
  })

  const upload = multer({
    storage: storage
  })

  app.post("/api/listings/upload", upload.single('file'), function (req, res, next) {
    const file = req.file;
    if (file) {
      res.json(req.file);
    } else throw "error";
  });

  app.post("/api/listings",  [authJwt.verifyToken], controller.createListing);
  app.put("/api/listings/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/listings/:id", [authJwt.verifyToken], controller.delete);
  
  app.get("/api/listings/:id", [authJwt.verifyToken], controller.findOne);
  app.get("/api/listingsByUser/:id", [authJwt.verifyToken], controller.findAllByUser);
  app.get("/api/listings", [authJwt.verifyToken], controller.findAll);

  
  app.post("/api/favorites", [authJwt.verifyToken], controller.createFavorite);
  app.get("/api/favorites/:userid", [authJwt.verifyToken], controller.findFavorites);
  app.post("/api/favorites/delete", [authJwt.verifyToken], controller.deleteFavorite);
}