const { Pool } = require("pg");

let dbConfig = {
    connectionString: process.env.DATABASE_URL
};

const pool = new Pool(dbConfig);

// Query database to find and return user
exports.getUser = async (username, role) => {
    try {
        const result = await pool.query(`SELECT * FROM ${role}s WHERE username='${username}'`);
        return result.rows;
    } catch (err) {
        console.error('Database query error: ', err);
    };
};

// Query database to find and display all students
exports.getStudents = (req, res) => {
    pool.query('SELECT * FROM students', (err, result) => {
        if (err) throw err;
        for (const row of result.rows) {
            console.log(row);
        };
        res.json({ message: result.rows });
        // res.status(200).json(result.rows);
    });
};