import React, { useEffect, useState } from 'react';

const AdminDashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
          setData(data);
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
    <div>
      <h1>Admin Dashboard</h1>
      <p>Username: {data.username}</p>
      <p>First Name: {data.first_name}</p>
      <p>Last Name: {data.last_name}</p>
      <p>Email: {data.email}</p>
      <p>Telephone: {data.telephone}</p>
      <p>Address: {data.address}</p>
    </div>
  );
};

export default AdminDashboardPage;
