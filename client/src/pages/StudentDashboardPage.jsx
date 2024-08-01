import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import graduationImg from '../assets/photos/graduation.webp';
import studentDeskImg from '../assets/photos/student_at_desk.webp';
import studentsTableImg from '../assets/photos/students_at_table.webp';
import studentsHallImg from '../assets/photos/students_in_hall.webp';

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

        const response = await fetch('student/${student_id}/courses', {
          method: 'GET',
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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <Link to="/courses" className="hover:text-purple mb-4 inline-block">Lookup Courses</Link>
      <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <table className="min-w-full bg-white">
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
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200">{course.string_id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{course.title}</td>
              <td className="py-2 px-4 border-b border-gray-200">{course.description}</td>
              <td className="py-2 px-4 border-b border-gray-200">{course.schedule}</td>
              <td className="py-2 px-4 border-b border-gray-200">{course.classroom_number}</td>
              <td className="py-2 px-4 border-b border-gray-200">{course.maximum_capacity}</td>
              <td className="py-2 px-4 border-b border-gray-200">{course.credit_hours}</td>
              <td className="py-2 px-4 border-b border-gray-200">{course.tuition_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-8">
        <img src={graduationImg} alt="Graduation" className="w-1/4 mx-2" />
        <img src={studentDeskImg} alt="Student at Desk" className="w-1/4 mx-2" />
        <img src={studentsTableImg} alt="Students at Table" className="w-1/4 mx-2" />
        <img src={studentsHallImg} alt="Students in Hall" className="w-1/4 mx-2" />
      </div>
    </div>
  );
};

export default StudentDashboardPage;
