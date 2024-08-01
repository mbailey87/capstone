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
exports.createUser = async (req, res, userInfo) => {
    try {
        await pool.query(`
            INSERT INTO students 
                (username, first_name, last_name, email, telephone, address, password_hash) 
            VALUES 
                ('${userInfo.username}', '${userInfo.first_name}', '${userInfo.last_name}', '${userInfo.email}',
                    '${userInfo.telephone}', '${userInfo.address}', '${userInfo.password_hash}')
        `);
        res.json({ message: `Successfully added new user ${userInfo.username}` });
    } catch (err) {
        console.error('Database insert error: ', err);
        return res.status(500).json({ errorMessage: 'Database insert error' });
    };
};

// Query database to delete a student
exports.deleteStudent = (req, res) => {
    const { student_id } = req.params;
    pool.query('DELETE FROM students WHERE student_id = $1', [student_id], (err, result) => {
        if (err) {
            console.error('Database delete error: ', err);
            return res.status(500).json({ errorMessage: 'Database delete error' });
        }
        res.json({ message: `Successfully deleted student with ID ${student_id}` });
    });
};

// Query database to find and display all courses
exports.getCourses = async (req, res) => {
    try {
        await pool.query('SELECT * FROM courses');
        return result.rows;
    } catch (err) {
        console.error('Database query error: ', err);
        return res.status(500).json({ errorMessage: 'Database query error' });
    };
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
exports.addStudentCourse = async (req, res) => {
    try {
        await pool.query(`
            INSERT INTO student_courses
                (student_id, course_id)
            VALUES
                ('${req.student_id}', '${req.course_id}')
    	`);
        return `Successfully added student to course`;
    } catch (err) {
        console.error('Database insert error: ', err);
        throw err;
    };
};

// Query database to remove student from course
exports.removeStudentCourse = async (id) => {
    try {
        await pool.query(`DELETE FROM student_courses WHERE id = ${id}`);
        return `Successfully removed student from course`;
    } catch (err) {
        console.error('Database delete error: ', err);
        throw err;
    };
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

// Query database to find students for a specific course
exports.getStudentsForCourse = async (courseId) => {
    try {
        const result = await pool.query(
            `SELECT s.student_id, s.first_name, s.last_name, s.email
             FROM student_courses sc
             JOIN students s ON sc.student_id = s.student_id
             WHERE sc.course_id = $1`,
            [courseId]
        );
        console.log(`Students for course ${courseId}:`, result.rows);
        return result.rows;
    } catch (err) {
        console.error('Database query error: ', err);
        throw err;
    }
};
