const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

//app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:8081'}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("src/app/images"))
app.use(
  cookieSession({
    name: "thakurji-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
 
);


// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to VSL application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/listing.routes")(app);
require("./app/routes/comment.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
