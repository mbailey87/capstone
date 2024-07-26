import React, { useEffect, useState } from 'react';

const StudentDashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authorization token found');
            }

            const response = await fetch('http://localhost:3001/home/student', {
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
      <h1>Student Dashboard</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default StudentDashboardPage;
