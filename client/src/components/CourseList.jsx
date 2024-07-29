import React from 'react';

const CourseList = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const coursesRows = data.map(course => (
    <tr key={course.string_id}>
      <td>{course.string_id}</td>
      <td>{course.title}</td>
      <td>{course.description}</td>
      <td>{course.schedule}</td>
      <td>{course.classroom_number}</td>
      <td>{course.maximum_capacity}</td>
      <td>{course.credit_hours}</td>
      <td>{course.tuition_cost}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Course ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Schedule</th>
          <th>Classroom Number</th>
          <th>Max Capacity</th>
          <th>Credit Hours</th>
          <th>Tuition Cost</th>
        </tr>
      </thead>
      <tbody>
        {coursesRows}
      </tbody>
    </table>
  );
};

export default CourseList;
