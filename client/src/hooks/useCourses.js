import { useState, useEffect } from 'react';

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please log in");
      return;
    }

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
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async (courseData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please log in");
      return;
    }

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
        fetchCourses();
      } else {
        console.error("Failed to add course");
      }
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  const removeCourse = async (string_id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, please log in");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/courses/${string_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        fetchCourses();
      } else {
        console.error("Failed to remove course");
      }
    } catch (err) {
      console.error("Error removing course:", err);
    }
  };

  const fetchStudentsForCourse = async (courseId) => {
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

  return {
    courses,
    students,
    expandedCourse,
    addCourse,
    removeCourse,
    fetchStudentsForCourse
  };
};

export default useCourses;
