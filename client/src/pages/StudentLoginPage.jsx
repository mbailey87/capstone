import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Assuming you have a state for enrolled courses

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found, please log in");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/studentDashboard`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.ok) {
          const result = await response.json();
          setEnrolledCourses(result.courses);
          setData(result);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
  }, []);

  const handleRemoveCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found, please log in");
        return;
      }

      const response = await fetch(`/student/courses/${courseId}`, {
        method: "DELETE",
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
