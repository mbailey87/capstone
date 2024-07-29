const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
require("dotenv").config();
const bcrypt = require('bcrypt');
const cors = require("cors");
const db = require("./config/database");

const saltRounds = 10;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

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
        await db.createUser(req, res, { role, username, first_name, last_name, email, telephone, address, password_hash: hash });
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
  console.log(`Login attempt: ${req.body.username} (${role})`); // Log the login attempt

  if (!req.body || Object.keys(req.body).length === 0) {
    console.log('No user info to process');
    return res.status(400).json({ errorMessage: "No user info to process" });
  }

  try {
    const user = await db.getUser(req.body.username, role);
    console.log('User found:', JSON.stringify(user, null, 2)); // Log the detailed user information

    if (!user || user.length === 0) {
      console.log('Invalid Credentials');
      return res.status(401).json({ errorMessage: "Invalid Credentials" });
    }

    bcrypt.compare(req.body.password, user[0].password_hash, (err, result) => {
      if (err) throw err;
      if (result) {
        const tokenPayload = {
          username: user[0].username,
          first_name: user[0].first_name,
          last_name: user[0].last_name,
          email: user[0].email,
          telephone: user[0].telephone,
          address: user[0].address,
          admin: role === "admin"
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "15m",
        });

        console.log(`Login successful for user: ${user[0].username}`); // Log successful login
        return res.json({ token: token, user: tokenPayload }); // Include user info in the response
      } else {
        console.log('Invalid Credentials');
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

// All paths require token to access
app.use(
  "/",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);

// Handle GET requests to /courses route
app.get("/courses", db.getCourses);

// Handle GET requests to /studentDashboard route
app.get("/studentDashboard", (req, res) => {
  res.json(req.auth); // Send user info from JWT payload
});

// Middleware to check if a user is an admin
function checkAdmin(req, res, next) {
  if (!req.auth.admin) {
    return res.status(403).json({ errorMessage: "Access denied" });
  }
  next();
}

// All /adminDashboard routes require user to be an admin
app.use("/adminDashboard", checkAdmin);

// Handle GET requests to /adminDashboard route
app.get("/adminDashboard", (req, res) => {
  res.json(req.auth); // Send user info from JWT payload
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
