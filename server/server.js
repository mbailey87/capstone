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
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));

// Serve the React app files
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Validate login credentials and create token
const loginHandler = async (req, res, role) => {
  console.log(`Login attempt: ${req.body.username} (${role})`);

  if (!req.body || Object.keys(req.body).length === 0) {
    console.log('No user info to process');
    return res.status(400).json({ errorMessage: "No user info to process" });
  }

  try {
    const user = await db.getUser(req.body.username, role);
    console.log('User found:', JSON.stringify(user, null, 2));

    if (!user || user.length === 0) {
      console.log('Invalid Credentials');
      return res.status(401).json({ errorMessage: "Invalid Credentials" });
    }

    bcrypt.compare(req.body.password, user[0].password_hash, (err, result) => {
      if (err) throw err;
      if (result) {
        const tokenPayload = {
          student_id: user[0].student_id,
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

        console.log(`Login successful for user: ${user[0].username}`);
        return res.json({ token: token, user: tokenPayload });
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
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }).unless({ path: ["/studentLogin", "/adminLogin", "/createUser"] })
);

// Handle GET requests to /courses route
app.get("/courses", db.getCourses);

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
app.get("/adminDashboard", async (req, res) => {
  try {
    const students = await db.getStudents();
    const payload = { ...req.auth, students: students };
    res.json(payload);
  } catch (err) {
    console.error("Error fetching students: ", err);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Handle PUT requests to update student information
app.put("/students/:student_id", checkAdmin, async (req, res) => {
  const { student_id } = req.params;
  const updatedStudent = req.body;

  try {
    await db.updateStudent(student_id, updatedStudent);
    res.json({ message: `Successfully updated student with ID ${student_id}` });
  } catch (err) {
    console.error('Database update error: ', err);
    res.status(500).json({ errorMessage: 'Database update error' });
  }
});


// Handle DELETE requests to delete a student in adminDashboard
app.delete("/students/:student_id", checkAdmin, db.deleteStudent);

// Handle GET requests to fetch students for a specific course
app.get("/courses/:courseId/students", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const students = await db.getStudentsForCourse(courseId);
    res.json(students);
  } catch (err) {
    console.error("Error fetching students for course: ", err);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Handle GET requests to /studentDashboard route
app.get("/studentDashboard", async (req, res) => {
  try {
    const courses = await db.getStudentCourses(req.auth.student_id);
    const payload = { ...req.auth, courses: courses };
    res.json(payload);
  } catch (err) {
    console.error("Error fetching courses: ", err);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Handle GET requests to /profile route
app.get("/profile", (req, res) => {
  res.json(req.auth);
});

// Handle POST requests to /profile route
app.post("/profile", async (req, res) => {
  const role = req.auth.admin ? "admin" : "student";
  const message = await db.updateProfile(req.auth.student_id, role, req.body);
  res.json({ message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
