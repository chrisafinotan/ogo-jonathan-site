import styles from '../styles/Navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.home}>
                <Link href="/">OGO</Link>
            </div>
            <div className={styles.pages}>
                <div className={styles.page}>
                    <Link href="/projects">Projects</Link>
                </div>
                <div className={styles.page}>
                    <Link href="/about">About</Link>
                </div>
                <div className={styles.page}>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>
        </div>
    )
}