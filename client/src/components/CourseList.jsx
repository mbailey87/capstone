import React, { useState } from 'react';

const CourseList = ({ courses, onRemoveCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(course =>
    Object.values(course).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search Courses"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {courses.length > 0 && Object.keys(courses[0]).map((field) => (
              <th key={field} className="py-2 px-4 border-b border-gray-200">{field.replace('_', ' ').toUpperCase()}</th>
            ))}
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={index}>
              {Object.keys(course).map((field) => (
                <td key={field} className="py-2 px-4 border-b border-gray-200">{course[field]}</td>
              ))}
              <td className="py-2 px-4 border-b border-gray-200">
                <button onClick={() => onRemoveCourse(course.course_id)} className="bg-red-500 text-white p-2 rounded">
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

export default CourseList;
