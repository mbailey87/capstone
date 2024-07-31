import React, { useState, useEffect } from 'react';

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    string_id: '',
    title: '',
    description: '',
    schedule: '',
    classroom_number: '',
    maximum_capacity: '',
    credit_hours: '',
    tuition_cost: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, please log in");
        return;
      };

      try {
        const response = await fetch("http://localhost:3001/courses", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.ok) {
          const result = await response.json();
          setCourses(result.message);
        } else {
          console.error("Failed to fetch courses");
        };
      } catch (err) {
        console.error("Error fetching courses:", err);
      };
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCourses([...courses, courseData]);
    setCourseData({
      string_id: '',
      title: '',
      description: '',
      schedule: '',
      classroom_number: '',
      maximum_capacity: '',
      credit_hours: '',
      tuition_cost: ''
    });
  };

  const handleRemoveCourse = (string_id) => {
    const newCourses = courses.filter(course => course.string_id !== string_id);
    setCourses(newCourses);
  };

  const filteredCourses = courses.filter(course => 
    Object.values(course).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Object.keys(courseData).map((field) => (
            field !== 'description' ? (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace('_', ' ').toUpperCase()}
                value={courseData[field]}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            ) : (
              <textarea
                key={field}
                name={field}
                placeholder={field.replace('_', ' ').toUpperCase()}
                value={courseData[field]}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            )
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Course
        </button>
      </form>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {Object.keys(courseData).map((field) => (
              <th key={field} className="py-2 px-4 border-b border-gray-200">{field.replace('_', ' ').toUpperCase()}</th>
            ))}
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={index}>
              {Object.keys(courseData).map((field) => (
                <td key={field} className="py-2 px-4 border-b border-gray-200">{course[field]}</td>
              ))}
              <td className="py-2 px-4 border-b border-gray-200">
                <button onClick={() => handleRemoveCourse(course.string_id)} className="bg-red-500 text-white p-2 rounded">
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

export default ManageCoursesPage;
