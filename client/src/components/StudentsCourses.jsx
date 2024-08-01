import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StudentsCourses = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([
    // Placeholder data
    { student_id: 1, first_name: "John", last_name: "Doe", email: "john.doe@example.com" },
    { student_id: 2, first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com" }
  ]);

  useEffect(() => {
    // Placeholder fetch logic for fetching students enrolled in the course
    // Replace with actual fetch logic when backend is implemented
    const fetchStudents = async () => {
    };

    fetchStudents();
  }, [courseId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students Enrolled in Course: {courseId}</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Student ID</th>
            <th className="py-2 px-4 border-b border-gray-200">First Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Last Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td className="py-2 px-4 border-b border-gray-200">{student.student_id}</td>
              <td className="py-2 px-4 border-b border-gray-200">{student.first_name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{student.last_name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsCourses;
