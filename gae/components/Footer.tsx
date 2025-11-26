'use client';

import styles from '@/styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <p className={styles.footerText}>{new Date().getFullYear()} Allanic Energie ©</p>
            </div>
        </footer>
    );
}