import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");

    const location = useLocation();
    const { enrolledCourseIds } = location.state || { enrolledCourses: [] };

    const handleEnrollment = async (string_id, enrollment) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setErrorMessage("No token found, please log in");
            return;
        };

        try {
            const response = await fetch('/courses', {
                method: enrollment,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ string_id })
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message);
            } else if (response.status === 401) {
                setErrorMessage("Unauthorized, please log in");
            } else {
                throw new Error("Failed to fetch data");
            };
        } catch (err) {
            setErrorMessage(err.message);
        };
    };

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("No token found, please log in");
        return;
      };

      try {
        const response = await fetch("/courses", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.ok) {
          const result = await response.json();
          setCourses(result);
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
      {message && <p>{message}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th key="enrollment" className="py-2 px-4 border-b border-gray-200">Enrollment</th>
            {courses.length > 0 && Object.keys(courses[0]).map((field) => (
              <th key={field} className="py-2 px-4 border-b border-gray-200">{field.replace('_', ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enrolledCourseIds && 
            courses.map((course, index) => (
                <tr key={index}>
                {enrolledCourseIds.includes(course.string_id) ? 
                    <td><button onClick={() => handleEnrollment(course.string_id, "DELETE")} className="bg-red-400 p-2">Unenroll</button></td> :
                    <td><button onClick={() => handleEnrollment(course.string_id, "POST")} className="bg-green-400 p-2">Enroll</button></td>
                }
                {Object.keys(course).map((field) => (
                    <td key={field} className="py-2 px-4 border-b border-gray-200">{course[field]}</td>
                ))}
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default CoursesPage;
