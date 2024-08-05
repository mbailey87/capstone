import React from 'react';

const StudentTable = ({ students, handleRemoveStudent, handleEditStudent }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">Student ID</th>
          <th className="py-2 px-4 border-b border-gray-200">First Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Last Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Email</th>
          <th className="py-2 px-4 border-b border-gray-200">Phone Number</th>
          <th className="py-2 px-4 border-b border-gray-200">Address</th>
          <th className="py-2 px-4 border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.student_id}>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.student_id}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.first_name}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.last_name}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.email}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.telephone}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.address}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">
              <button
                onClick={() => handleEditStudent(student)}
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveStudent(student.student_id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
