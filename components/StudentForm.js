import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function StudentForm({ studentId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (studentId) {
      const fetchStudent = async () => {
        try {
          const { data } = await axios.get(`/api/students/${studentId}`);
          
          // Reset form with student data
          reset({
            name: data.data.name,
            email: data.data.email,
            grade: data.data.grade,
            phone: data.data.phone,
            address: data.data.address || ''
          });
        } catch (error) {
          console.error('Error fetching student:', error);
          setError('Failed to load student data');
        }
      };
      
      fetchStudent();
    }
  }, [studentId, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      if (studentId) {
        // Update existing student
        await axios.put(`/api/students/${studentId}`, data);
      } else {
        // Create new student
        await axios.post('/api/students', data);
      }
      
      router.push('/students');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to save student data');
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>{studentId ? 'Edit Student' : 'Add New Student'}</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={styles.input}
          />
          {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Please enter a valid email'
              }
            })}
            className={styles.input}
          />
          {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="grade">Grade</label>
          <input
            id="grade"
            type="text"
            {...register('grade', { required: 'Grade is required' })}
            className={styles.input}
          />
          {errors.grade && <span className={styles.errorText}>{errors.grade.message}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            {...register('phone', { required: 'Phone is required' })}
            className={styles.input}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone.message}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="address">Address (Optional)</label>
          <textarea
            id="address"
            {...register('address')}
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => router.push('/students')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Saving...' : 'Save Student'}
          </button>
        </div>
      </form>
    </div>
  );
}