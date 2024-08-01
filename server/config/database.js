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
exports.getStudents = async () => {
    try {
        const result = await pool.query('SELECT student_id, first_name, last_name, email, telephone, address FROM students');
        return result.rows;
    } catch (err) {
        console.error('Database query error: ', err);
        throw err;
    };
};

// Query database to find and display all courses a student is registered in
exports.getStudentCourses = async (student_id) => {
    try {
        const result = await pool.query(`SELECT * FROM student_courses WHERE student_id=${student_id}`);
        let resArr = [];
        for (row in result.rows) {
            resArr.push(result.rows[row].course_id);
        };
        return resArr;
    } catch (err) {
        console.error('Database query error: ', err);
        throw err;
    };
};
   
// Query database to add student to course
exports.addStudentCourse = (req, res) => {
	pool.query(`
    	INSERT INTO student_courses
        	(student_id, course_id)
    	VALUES
        	('${req.student_id}', '${req.course_id}')
    	`, (err, result) => {
            	if (err) {
                	console.error('Database insert error: ', err);
                	return res.status(500).json({ errorMessage: 'Database insert error' });
            	}
            	res.json({ message: `Successfully added student to course` });
	});
};

// Query database to update user profile info
exports.updateProfile = async (student_id, role, updatedInfo) => {
    try {
        let setClauses = [];
        let values = [];

        // Add updated profile info to setClauses and values arrays
        Object.keys(updatedInfo).forEach((key, index) => {
            setClauses.push(`${key} = $${index + 1}`);
            values.push(updatedInfo[key]);
        });

        // Add student_id as last parameter
        values.push(student_id);

        // Build parameterized query
        const query = `
            UPDATE ${role}s
            SET ${setClauses.join(", ")}
            WHERE student_id = $${values.length}
        `;

        await pool.query(query, values);
        return "Successfully updated profile info";
    } catch (err) {
        console.error('Database query error: ', err);
        throw err;
    };
};
