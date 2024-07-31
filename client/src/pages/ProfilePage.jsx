import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authorization token found');
        }

        const response = await fetch('http://localhost:3001/profile', {
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
          setProfileData(data);
        } else {
          throw new Error('Unexpected content type: ' + contentType);
        }
      } catch (err) {
        setError(err.message);
        console.error("Fetch error: ", err);
      }
    };

    fetchProfileData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Username: {profileData.username}</p>
      <p>First Name: {profileData.first_name}</p>
      <p>Last Name: {profileData.last_name}</p>
      <p>Email: {profileData.email}</p>
      <p>Telephone: {profileData.telephone}</p>
      <p>Address: {profileData.address}</p>
    </div>
  );
};

export default ProfilePage;
