import React, { useState } from 'react';
import useCourses from '../hooks/useCourses';
import CourseForm from '../components/CourseForm';
import CourseTable from '../components/CourseTable';
import StudentTable from '../components/StudentTable';

const ManageCoursesPage = () => {
  const { courses, students, expandedCourse, addCourse, removeCourse, fetchStudentsForCourse } = useCourses();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCourse(courseData);
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

  const filteredCourses = courses.filter(course => 
    Object.values(course).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
      <CourseForm courseData={courseData} handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <CourseTable
        courses={filteredCourses}
        handleToggle={fetchStudentsForCourse}
        handleRemoveCourse={removeCourse}
        expandedCourse={expandedCourse}
        students={students}
        courseData={courseData}
      />
    </div>
  );
};

export default ManageCoursesPage;
