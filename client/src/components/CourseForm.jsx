import React from 'react';

const CourseForm = ({ courseData, handleChange, handleSubmit }) => {
  return (
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
  );
};

export default CourseForm;
