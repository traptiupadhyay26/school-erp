import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get('/api/students');
      setStudents(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.studentList}>
      <h1>Students</h1>
      <Link href="/students/add">
        <a className={styles.addButton}>Add New Student</a>
      </Link>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td className={styles.actions}>
                  <Link href={`/students/${student._id}`}>
                    <a className={styles.editButton}>Edit</a>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className={styles.noData}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}