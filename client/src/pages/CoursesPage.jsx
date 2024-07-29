import React, { useEffect, useState } from "react";

const CoursesPage = () => {
    const [data, setData] = useState(null);
    const [courseTable, setCourseTable] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const makeTable = () => {
        let coursesRows = [];
        
        for (let i = 0; i < data.length; i++) {
            coursesRows.push(
                <tr key={data[i].string_id}>
                    <td>{data[i].string_id}</td>
                    <td>{data[i].title}</td>
                    <td>{data[i].description}</td>
                    <td>{data[i].schedule}</td>
                    <td>{data[i].classroom_number}</td>
                    <td>{data[i].maximum_capacity}</td>
                    <td>{data[i].credit_hours}</td>
                    <td>{data[i].tuition_cost}</td>
                </tr>
            );
        };

        setCourseTable(
            <table>
                <thead>
                    <tr key="header">
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

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setErrorMessage("No token found, please log in");
                return;
            };

            try {
                const response = await fetch("/server/courses", {
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

    useEffect(() => {
        if (data) {
            makeTable();
        };
    }, [data]);
    
    return (
        <>
            <h1>Courses</h1>
            <h2>{!courseTable ? "Loading..." : courseTable}</h2>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
};

export default CoursesPage;