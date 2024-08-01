import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [initialProfileData, setInitialProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  // Don't include these fields in profile edit form
  const excludedFields = ['student_id', 'admin', 'iat', 'exp'];

  // Function to split string on underscore, capitalize the first letter of each word, then rejoin words with space
  const capitalizeFirstLetter = (str) => {
    return str
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Compare initialProfileData and profileData to find changes
    const updatedInfo = Object.keys(profileData).reduce((changes, key) => {
      if (profileData[key] !== initialProfileData[key] && !excludedFields.includes(key)) {
        changes[key] = profileData[key];
      };
      return changes;
    }, {});
    
    // If no changes, do not proceed with update
    if (Object.keys(updatedInfo).length === 0) {
      setMessage("No changes detected");
      setIsEditing(false);
      return;
    };

    const updateProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authorization token found');
        };

        // Send POST request to server with updated profile info
        const response = await fetch('/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedInfo)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        };

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setMessage(data.message);
          setInitialProfileData(profileData); // Update initial profile data to updated data
        } else {
          throw new Error('Unexpected content type: ' + contentType);
        };
      } catch (err) {
        setError(err.message);
        console.error("Update error: ", err);
      };
    };

    updateProfileData();
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authorization token found');
        }

        const response = await fetch('/profile', {
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
          setInitialProfileData(data);
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

  // Return profile edit form if isEditing is true, onSubmit set isEditing to false again
  if (isEditing) {
    return (
    <>
      <h1>Editing Profile Page</h1>
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2 w-80'>
        {Object.keys(profileData)
          .filter((data) => !excludedFields.includes(data))
          .map((data) => (
            <div key={data} className='flex gap-2 w-full'>
              <p>{capitalizeFirstLetter(data)}:</p>
              <input
                type="text"
                name={data}
                placeholder={profileData[data]}
                value={profileData[data]}
                onChange={(e) => setProfileData({
                  ...profileData,
                  [data]: e.target.value
                })}
                className='border grow'
              />
            </div>
        ))}
        <button>Submit</button>
      </form>
    </>
    );
  }

  // If isEditing is false (default), just display profile info
  else return (
    <div>
      <h1>Profile Page</h1>
      <p>Student ID: {profileData.student_id}</p>
      <p>Username: {profileData.username}</p>
      <p>First Name: {profileData.first_name}</p>
      <p>Last Name: {profileData.last_name}</p>
      <p>Email: {profileData.email}</p>
      <p>Telephone: {profileData.telephone}</p>
      <p>Address: {profileData.address}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
