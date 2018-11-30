require("dotenv").config();

const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate } = require("./middlewares");
const db = require("../database/dbConfig");
const secret = require("../_secrets/keys");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "10m"
  };

  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  // implement user registration
  const creds = req.body;

  if (creds.username && creds.password) {
    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;
    db("users")
      .insert(creds)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({ error: "Error while registering user: ", err });
      });
  } else {
    res.status(400).json({ message: "Please fill all fields." });
  }
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  if (creds.username && creds.password) {
    db("users")
      .where({ username: creds.username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          //generate token
          const token = generateToken(creds);
          res.status(200).json(token);
        } else {
          res.status(401).json({ message: "Access hella denied" });
        }
      });
  } else {
    res.status(400).json({ message: "Please fill out all fields." });
  }
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
