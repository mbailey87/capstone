import React, { useEffect, useState } from 'react';

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authorization token found');
        }

        const response = await fetch('http://localhost:3001/adminDashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(data)
          console.log(data.students)
          setData(data);
          setStudentData(data.students || []); 
        } else {
          throw new Error('Unexpected content type: ' + contentType);
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error: ", err);
      }
      
    };
  
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div>
      <h1>Admin Dashboard</h1>
      <p>Username: {data.username}</p>
      <p>First Name: {data.first_name}</p>
      <p>Last Name: {data.last_name}</p>
      <p>Email: {data.email}</p>
      <p>Telephone: {data.telephone}</p>
      <p>Address: {data.address}</p>
    </div>
    <div>
      <h2>Students</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.telephone}</td>
              <td>{student.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>    

  );
};

export default AdminDashboardPage;