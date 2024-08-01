import React from 'react';
import StudentTable from './StudentTable';

const CourseTable = ({ courses, handleToggle, handleRemoveCourse, expandedCourse, students, courseData }) => {
  return (
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
        {courses.map((course, index) => (
          <React.Fragment key={index}>
            <tr onClick={() => handleToggle(course.string_id)} className="hover:bg-gray-100">
              {Object.keys(courseData).map((field) => (
                <td key={field} className="py-2 px-4 border-b border-gray-200">{course[field]}</td>
              ))}
              <td className="py-2 px-4 border-b border-gray-200">
                <button onClick={(e) => {e.stopPropagation(); handleRemoveCourse(course.string_id)}} className="bg-red-500 text-white p-2 rounded">
                  Remove
                </button>
              </td>
            </tr>
            {expandedCourse === course.string_id && (
              <tr>
                <td colSpan={Object.keys(courseData).length + 1}>
                  <div className="p-4 bg-gray-100">
                    <h2 className="text-xl font-bold mb-2">Enrolled Students</h2>
                    <StudentTable students={students} />
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;
