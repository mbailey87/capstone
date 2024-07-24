const { Pool } = require("pg");

let dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Ensure SSL connection with database
};

const pool = new Pool(dbConfig);

// Query database to find and return user
exports.getUser = async (username, role) => {
    try {
        const result = await pool.query(`SELECT * FROM ${role}s WHERE username='${username}'`);
        return result.rows;
    } catch (err) {
        console.error('Database query error: ', err);
    }
};

// Query database to insert new user info
exports.createUser = (req, res, userInfo, password_hash) => {
    pool.query(`
        INSERT INTO students 
            (username, first_name, last_name, email, telephone, address, password_hash) 
        VALUES 
            ('${userInfo.username}', '${userInfo.first_name}', '${userInfo.last_name}', '${userInfo.email}',
                '${userInfo.telephone}', '${userInfo.address}', '${password_hash}')
        `, (err, result) => {
            if (err) {
                console.error('Database insert error: ', err); // Log the error for debugging purposes
                return res.status(500).json({ errorMessage: 'Database insert error' }); // Send error response if insertion fails
            }
            res.json({ message: `Successfully added new user ${userInfo.username}` }); // Send success response if insertion succeeds
    });
};

// Query database to find and display all students
exports.getStudents = (req, res) => {
    pool.query('SELECT * FROM students', (err, result) => {
        if (err) throw err; // Throw an error if the query fails
        for (const row of result.rows) {
            console.log(row); // Log each row for debugging purposes
        }
        res.json({ message: result.rows }); // Send the result rows as JSON response
        // res.status(200).json(result.rows); // Alternative way to send the result rows as JSON response
    });
};
