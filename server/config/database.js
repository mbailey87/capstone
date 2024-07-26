const { Pool } = require("pg");

let dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
};

const pool = new Pool(dbConfig);

// Query database to find and return user
exports.getUser = async (username, role) => {
    try {
        const result = await pool.query(`SELECT * FROM ${role}s WHERE username='${username}'`);
        return result.rows;
    } catch (err) {
        console.error('Database query error: ', err);
        throw err;
    }
};

// Query database to insert new user info
exports.createUser = (req, res, userInfo) => {
    pool.query(`
        INSERT INTO students 
            (username, first_name, last_name, email, telephone, address, password_hash) 
        VALUES 
            ('${userInfo.username}', '${userInfo.first_name}', '${userInfo.last_name}', '${userInfo.email}',
                '${userInfo.telephone}', '${userInfo.address}', '${userInfo.password_hash}')
        `, (err, result) => {
            if (err) {
                console.error('Database insert error: ', err);
                return res.status(500).json({ errorMessage: 'Database insert error' });
            }
            res.json({ message: `Successfully added new user ${userInfo.username}` });
    });
};

// Query database to find and display all courses
exports.getCourses = (req, res) => {
    pool.query('SELECT * FROM courses', (err, result) => {
        if (err) {
            console.error('Database query error: ', err);
            return res.status(500).json({ errorMessage: 'Database query error' });
        }
        res.json({ message: result.rows });
    });
};

// Query database to find and display all students
exports.getStudents = (req, res) => {
    pool.query('SELECT student_id, first_name, last_name, email, telephone, address FROM students', (err, result) => {
        if (err) {
            console.error('Database query error: ', err);
            return res.status(500).json({ errorMessage: 'Database query error' });
        }
        res.json({ message: result.rows });
    });
};
   