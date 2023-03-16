import React from 'react';
import Link from 'next/link';

import styles from '../styles/Header.module.css';

export default function Header() {

  return (
    <div className={styles.body}>
        <Link href="/"><img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1678994822/bragi/bragi_red_puuuys.png" height={60} /></Link>

        <div className={styles.container}>
            <Link href="/movies" className={styles.link}>Movies</Link>
            <Link href="/series" className={styles.link}>Series</Link>
            <Link href="/tv" style={{textDecoration:'none'}}>TV</Link>
            <input className={styles.input} />
        </div>
    </div>
  )
}

