import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboardPage = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found, please log in");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const student_id = payload.id;

        const response = await fetch(`http://localhost:3001/student/${student_id}/courses`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.ok) {
          const result = await response.json();
          setCourses(result.message);
        } else {
          throw new Error("Failed to fetch courses");
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
    };

    fetchCourses();
  }, []);

  const handleRemoveCourse = (courseId) => {
    setCourses(courses.filter(course => course.string_id !== courseId));
    // Add backend call to remove course for the student
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Dashboard</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Enrolled Courses</h2>
        <Link to="/courses" className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
          Lookup Courses
        </Link>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">String ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Title</th>
            <th className="py-2 px-4 border-b border-gray-200">Description</th>
            <th className="py-2 px-4 border-b border-gray-200">Schedule</th>
            <th className="py-2 px-4 border-b border-gray-200">Classroom Number</th>
            <th className="py-2 px-4 border-b border-gray-200">Maximum Capacity</th>
            <th className="py-2 px-4 border-b border-gray-200">Credit Hours</th>
            <th className="py-2 px-4 border-b border-gray-200">Tuition Cost</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{course.string_id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.description}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.schedule}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.classroom_number}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.maximum_capacity}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.credit_hours}</td>
                <td className="py-2 px-4 border-b border-gray-200">{course.tuition_cost}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button onClick={() => handleRemoveCourse(course.string_id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700">
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-4 text-center text-gray-500">No courses enrolled.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboardPage;
