import React, { useEffect, useState } from "react";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found, please log in");
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
        } else if (response.status === 401) {
          setErrorMessage("Unauthorized, please log in");
        } else {
          throw new Error("Failed to fetch data");
        };
      } catch (err) {
        setErrorMessage(err.message);
      };
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {courses.length > 0 && Object.keys(courses[0]).map((field) => (
              <th key={field} className="py-2 px-4 border-b border-gray-200">{field.replace('_', ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              {Object.keys(course).map((field) => (
                <td key={field} className="py-2 px-4 border-b border-gray-200">{course[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesPage;