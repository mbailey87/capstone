import React, { useState } from 'react';
import CourseList from '../components/CourseList';

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    course_id: '',
    title: '',
    description: '',
    schedule: '',
    classroom_number: '',
    maximum_capacity: '',
    credit_hours: '',
    tuition_cost: ''
  });

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
      course_id: '',
      title: '',
      description: '',
      schedule: '',
      classroom_number: '',
      maximum_capacity: '',
      credit_hours: '',
      tuition_cost: ''
    });
  };

  const handleRemoveCourse = (course_id) => {
    const newCourses = courses.filter(course => course.course_id !== course_id);
    setCourses(newCourses);
  };

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
      <CourseList courses={courses} onRemoveCourse={handleRemoveCourse} />
    </div>
  );
};

export default ManageCoursesPage;
