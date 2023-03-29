const { authJwt } = require("../middleware");
const controller = require("../controllers/marketplace.controller");
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

  app.post("/api/marketplace/upload", upload.single('file'), function (req, res, next) {
    const file = req.file;
    if (file) {
      res.json(req.file);
    } else throw "error";
  });

  
  app.put("/api/markeplace/:id", [authJwt.verifyToken], controller.createMarketPlace);
  app.get("/api/marketplace", [authJwt.verifyToken], controller.findAll);
  
}