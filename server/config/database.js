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

// Query database to insert new user info
exports.createUser = (req, res, userInfo, password_hash) => {
    pool.query(`
        INSERT INTO ${userInfo.role}s 
            (username, first_name, last_name, email, telephone, address, password_hash) 
        VALUES 
            ('${userInfo.username}', '${userInfo.first_name}', '${userInfo.last_name}', '${userInfo.email}',
                '${userInfo.telephone}', '${userInfo.address}', '${password_hash}')
        `, (err, result) => {
            if (err) throw err;
            res.json({ message: `Successfully added new user ${userInfo.username}` });
    });
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