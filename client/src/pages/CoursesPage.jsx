import React, { useEffect, useState } from "react";
import CourseList from '../components/CourseList';

const CoursesPage = () => {
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
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
                    setData(result.message);
                } else if (response.status === 401) {
                    setErrorMessage("Unauthorized, please log in");
                } else {
                    throw new Error("Failed to fetch data");
                };
            } catch (err) {
                setErrorMessage(err.message);
            };
        };

        fetchData();
    }, []);
    
    return (
        <>
            <h1>Courses</h1>
            {data ? <CourseList courses={data} /> : <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
};

export default CoursesPage;
