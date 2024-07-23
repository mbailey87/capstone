// client/src/pages/StudentDashboardPage.jsx
import React, { useState, useEffect } from 'react';

const StudentDashboardPage = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('/home/student', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setStudentData(data);
    };

    fetchData();
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {studentData.username}</h1>
      <p>First Name: {studentData.first_name}</p>
      <p>Last Name: {studentData.last_name}</p>
      <p>Email: {studentData.email}</p>
      <p>Telephone: {studentData.telephone}</p>
      <p>Address: {studentData.address}</p>
    </div>
  );
};

export default StudentDashboardPage;
