import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    studentCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/students');
        setStats({
          studentCount: data.data.length
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>School ERP Dashboard</h1>
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h2>Total Students</h2>
          <p className={styles.statNumber}>{stats.studentCount}</p>
        </div>
        {/* Add more stat cards here as you expand your ERP */}
      </div>
    </div>
  );
}