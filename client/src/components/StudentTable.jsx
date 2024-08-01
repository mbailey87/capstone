import React from 'react';

const StudentTable = ({ students }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">Student ID</th>
          <th className="py-2 px-4 border-b border-gray-200">First Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Last Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Email</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.student_id}>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.student_id}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.first_name}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.last_name}</td>
            <td className="py-2 px-4 border-b border-gray-200 text-center">{student.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
