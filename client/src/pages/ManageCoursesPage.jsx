import React, { useState } from 'react';

const ManageCoursesPage = () => {
  const [courseData, setCourseData] = useState({
    courseId: '',
    title: '',
    description: '',
    schedule: '',
    classroomNumber: '',
    maximumCapacity: '',
    creditHours: '',
    tuitionCost: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/createCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(`Course ${data.title} created successfully!`);
    } catch (err) {
      console.error("Fetch error: ", err);
      alert(err.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:3001/deleteCourse/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert(`Course ${courseId} deleted successfully!`);
    } catch (err) {
      console.error("Fetch error: ", err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Manage Courses</h1>
      <form onSubmit={handleCreateCourse}>
        <div className="my-4">
          <input
            type="text"
            name="courseId"
            placeholder="COURSE ID"
            value={courseData.courseId}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="title"
            placeholder="TITLE"
            value={courseData.title}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <textarea
            name="description"
            placeholder="DESCRIPTION"
            value={courseData.description}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="schedule"
            placeholder="SCHEDULE"
            value={courseData.schedule}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="classroomNumber"
            placeholder="CLASSROOM NUMBER"
            value={courseData.classroomNumber}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="maximumCapacity"
            placeholder="MAXIMUM CAPACITY"
            value={courseData.maximumCapacity}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="creditHours"
            placeholder="CREDIT HOURS"
            value={courseData.creditHours}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="tuitionCost"
            placeholder="TUITION COST"
            value={courseData.tuitionCost}
            onChange={handleChange}
            className="bg-slate-200 mx-2 px-2 border border-black rounded"
          />
        </div>
        <button type="submit" className="bg-slate-200 mx-2 px-2 border border-black rounded">
          Create Course
        </button>
      </form>
      <h2>Delete Course</h2>
      <input
        type="text"
        placeholder="Course ID"
        className="bg-slate-200 mx-2 px-2 border border-black rounded"
        onChange={(e) => handleDeleteCourse(e.target.value)}
      />
    </div>
  );
};

export default ManageCoursesPage;
