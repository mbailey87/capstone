const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
require("dotenv").config();
const bcrypt = require('bcrypt');
const db = require("./config/database");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Validate student login credentials and get token
const loginHandler = async (req, res, role) => {
  if (Object.keys(req.body)[0] === undefined) {
    return res.status(400).json({ errorMessage: "No user info to process" });
  };

  try {
    const user = await db.getUser(req.body.username, role);
    console.log('found user from database: ', user);
  
    // If user doesn't exist or password doesn't match, don't create token
    // hardcoded admin password hash until I implement bcrypt
    if (!user || user[0].password_hash !== "$1$.5JR2Q15$VD6Uyz2.j4FVqYt5yioMe.") {
      return res.status(401).json({ errorMessage: "Invalid Credentials" });
    };
  
    const token = jwt.sign({username: user[0].username, admin: role === "admin"}, process.env.secret, {
      algorithm: "HS256",
      expiresIn: "15m",
    });
  
    return res.json({ token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  };
};

// Validate student login credentials and get token
app.post("/studentLogin", (req, res) => loginHandler(req, res, "student"));

// Validate admin login credentials and get token
app.post("/adminLogin", (req, res) => loginHandler(req, res, "admin"));

// All home paths require token to access
app.use(
  "/home", 
  expressjwt({ secret: process.env.secret, algorithms: ["HS256"] })
);

// Handle GET requests to /home/student route
app.get("/home/student", (req, res) => {
  res.json({ message: "Hello student!" });
});

// Middleware to check if a user is an admin
function checkAdmin(req, res, next) {
  if (!req.auth.admin) {
    return res.status(403).json({ errorMessage: "Access denied" });
  }
  next();
};

// All /home/admin routes require user to be an admin
app.use("/home/admin", checkAdmin);

// Handle GET requests to /getStudents route
app.get("/home/admin/getStudents", db.getStudents);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});