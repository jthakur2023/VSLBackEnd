const { authJwt } = require("../middleware");
const controller = require("../controllers/comment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/comments", controller.createComment);
  app.put("/api/comments/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/comments/:id", [authJwt.verifyToken], controller.delete);
  
  app.get("/api/comments/:id", [authJwt.verifyToken], controller.findOne);
  app.get("/api/commentsByListingId/:id", [authJwt.verifyToken], controller.findAllCommentByListingId);
  app.get("/api/commentsByUserid/:id", [authJwt.verifyToken], controller.findAllCommentByUserId);
  app.get("/api/comments", [authJwt.verifyToken], controller.findAll);
  

}
