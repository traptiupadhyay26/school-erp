import Head from 'next/head';
import Navbar from './Navbar';
import styles from '../styles/Home.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>School ERP System</title>
        <meta name="description" content="A School ERP System built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </>
  );
}