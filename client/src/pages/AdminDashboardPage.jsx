import React, { useEffect, useState } from 'react';
import StudentTable from '../components/StudentTable';
import EditStudentModal from '../components/EditStudentModal';

const AdminDashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('No token found, please log in');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/adminDashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setStudents(result.students);
        } else if (response.status === 401) {
          setErrorMessage('Unauthorized, please log in');
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (err) {
        setErrorMessage(err.message);
      }
    };

    fetchStudents();
  }, []);

  const handleRemoveStudent = async (student_id) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('No token found, please log in');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/students/${student_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStudents(students.filter(student => student.student_id !== student_id));
      } else {
        throw new Error('Failed to delete student');
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleSaveStudent = async (updatedStudent) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setErrorMessage('No token found, please log in');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/students/${updatedStudent.student_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedStudent),
      });

      if (response.ok) {
        setStudents(students.map(student => 
          student.student_id === updatedStudent.student_id ? updatedStudent : student
        ));
        setIsEditModalOpen(false);
      } else {
        throw new Error('Failed to update student');
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name} ${student.email} ${student.telephone} ${student.address}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-bold mb-4">All Students</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Search students"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <StudentTable
        students={filteredStudents}
        handleRemoveStudent={handleRemoveStudent}
        handleEditStudent={handleEditStudent}
      />
      {isEditModalOpen && (
        <EditStudentModal
          student={selectedStudent}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
