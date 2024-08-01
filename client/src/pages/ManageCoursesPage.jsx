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
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [students, setStudents] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please log in");
      return;
    };

    try {
      const response = await fetch("http://localhost:3001/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(courseData)
      });

      if (response.ok) {
        const newCourse = await response.json();
        setCourses([...courses, newCourse]);
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
      } else {
        console.error("Failed to add course");
      }
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  const handleRemoveCourse = async (string_id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please log in");
      return;
    };

    try {
      const response = await fetch(`http://localhost:3001/courses/${string_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        const newCourses = courses.filter(course => course.string_id !== string_id);
        setCourses(newCourses);
      } else {
        console.error("Failed to remove course");
      }
    } catch (err) {
      console.error("Error removing course:", err);
    }
  };

  const handleToggle = async (courseId) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
      setStudents([]);
    } else {
      setExpandedCourse(courseId);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/courses/${courseId}/students`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });
        if (response.ok) {
          const students = await response.json();
          setStudents(students);
        } else {
          console.error("Failed to fetch students for course");
        }
      } catch (err) {
        console.error("Error fetching students for course:", err);
      }
    }
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
            <React.Fragment key={index}>
              <tr onClick={() => handleToggle(course.string_id)}>
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
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCoursesPage;