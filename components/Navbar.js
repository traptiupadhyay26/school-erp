import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <Link href="/">
          <a className={styles.navbarLogo}>School ERP</a>
        </Link>
      </div>
      <div className={styles.navbarLinks}>
        <Link href="/">
          <a className={styles.navbarLink}>Dashboard</a>
        </Link>
        <Link href="/students">
          <a className={styles.navbarLink}>Students</a>
        </Link>
        <Link href="/students/add">
          <a className={styles.navbarLink}>Add Student</a>
        </Link>
      </div>
    </nav>
  );
}