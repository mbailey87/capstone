import React, { useEffect, useState } from 'react';

const AdminDashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found, please log in");
        return;
      }

      try {
        const response = await fetch('/adminDashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.ok) {
          const result = await response.json();
          setStudents(result.students);
        } else if (response.status === 401) {
          setErrorMessage("Unauthorized, please log in");
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
    };

    fetchStudents();
  }, []);

  const handleRemoveStudent = async (student_id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("No token found, please log in");
      return;
    }

    try {
      const response = await fetch(`students/${student_id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        setStudents(students.filter(student => student.student_id !== student_id));
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-bold mb-4">All Students</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Student ID</th>
            <th className="py-2 px-4 border-b border-gray-200">First Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Last Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Email</th>
            <th className="py-2 px-4 border-b border-gray-200">Telephone</th>
            <th className="py-2 px-4 border-b border-gray-200">Address</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{student.student_id}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{student.first_name}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{student.last_name}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{student.email}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{student.telephone}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">{student.address}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-center">
                <button
                  onClick={() => handleRemoveStudent(student.student_id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardPage;
