// client/src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';

const AdminDashboardPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/home/admin/getStudents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setStudents(data.message);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Registered Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.first_name} {student.last_name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboardPage;
