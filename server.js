const express = require("express");
const cors = require("cors");

const configureRoutes = require("./config/routes");

const server = express();
//TODO: did not do this portion during sprint. still works, but have to shut down and reload everything.
const corsOptions = {
  // If you're moving onto the stretch problem you'll need to set this obj with the appropriate fields
  // ensure that your client's URL/Port can achieve a Handshake
  // then pass this object to the cors() function
};

server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
  server
};
