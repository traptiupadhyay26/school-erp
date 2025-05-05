import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import StudentForm from '../../components/StudentForm';

export default function EditStudent() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      {id ? <StudentForm studentId={id} /> : <div>Loading...</div>}
    </Layout>
  );
}