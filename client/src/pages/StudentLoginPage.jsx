import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to server with login credentials
      const response = await fetch("/studentLogin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCourses = enrolledCourses.filter(course => course.id !== courseId);
      setEnrolledCourses(updatedCourses);
      alert(`Course ${courseId} removed successfully!`);
    } catch (err) {
      console.error("Fetch error: ", err);
      alert(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Student Dashboard</h1>
        <Link to="/courses" className="hover:text-purple">Lookup Courses</Link>
      </div>
      <div>
        <h2>Enrolled Courses</h2>
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map(course => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.schedule}</td>
                <td>
                  <button onClick={() => handleRemoveCourse(course.id)} className="hover:text-purple">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentDashboardPage;