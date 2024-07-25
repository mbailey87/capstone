const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
require("dotenv").config();
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require("./config/database");

const saltRounds = 10;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

// Serve the React app files
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Create new user in the database
app.post("/createUser", async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ errorMessage: "No user info to process" });
  }

  const { username, first_name, last_name, email, telephone, address, password } = req.body;
  const role = "student"; // Default role is student

  try {
    const user = await db.getUser(username, role);
    if (user.length > 0) {
      return res.status(400).json({ errorMessage: "Username already in use, try again" });
    } else if (username && first_name && last_name && email && telephone && address && password) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) throw err;
        await db.createUser(req, res, { role, username, first_name, last_name, email, telephone, address, password: hash });
      });
    } else {
      return res.status(400).json({ errorMessage: "All fields are required" });
    }
  } catch (err) {
    console.error("Database query error: ", err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Validate login credentials and create token
const loginHandler = async (req, res, role) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ errorMessage: "No user info to process" });
  }

  try {
    const user = await db.getUser(req.body.username, role);
    if (!user || user.length === 0) {
      return res.status(401).json({ errorMessage: "Invalid Credentials" });
    }

    // Check if passwords match and create token, or send error message if they don't
    bcrypt.compare(req.body.password, user[0].password_hash, (err, result) => {
      if (err) throw err;
      if (result) {
        const token = jwt.sign({ username: user[0].username, admin: role === "admin" }, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "15m",
        });

        return res.json({ token: token });
      } else {
        return res.status(401).json({ errorMessage: "Invalid Credentials" });
      }
    });
  } catch (err) {
    console.error("Database query error: ", err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

// Validate student login credentials and get token
app.post("/studentLogin", (req, res) => loginHandler(req, res, "student"));

// Validate admin login credentials and get token
app.post("/adminLogin", (req, res) => loginHandler(req, res, "admin"));

// All home paths require token to access
app.use("/home", expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }));

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
}

// All /home/admin routes require user to be an admin
app.use("/home/admin", checkAdmin);

// Handle GET requests to /home/admin route
app.get("/home/admin", (req, res) => {
  res.json({ message: "Hello admin!" });
});

// Handle GET requests to /home/admin/getStudents route
app.get("/home/admin/getStudents", db.getStudents);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
