import Link from 'next/link';
import React from 'react';

import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.subContent}>
            <h1>Movies</h1>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'recent'}}} as={'/movies/category/recent'}>
              <p>Recently added</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'comedy'}}} as={'/movies/category/comedy'}>
              <p>Comedy</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'horror'}}} as={'/movies/category/horror'}>
              <p>Horror</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'drama'}}} as={'/movies/category/drama'}>
              <p>Drama</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'action'}}} as={'/movies/category/action'}>
              <p>Action</p>
            </Link>
          </div>
          <div className={styles.subContent}>
            <h1>Series</h1>
            <p>Recently added</p>
            <p>Comedy</p>
            <p>Horror</p>
            <p>Drama</p>
            <p>Action</p>
          </div>
          <div className={styles.subContent}>
            <h1>TV</h1>
            <p>Maroc 2M</p>
            <p>Al Aoula</p>
            <p>Al Maghribia</p>
            <p>MBC</p>
            <p>MBC 4</p>
          </div>
        </div>
        <div className={styles.signature}><p>Made with 💚 by Zak<span className={styles.hiddenName}>stein</span></p></div>
      </div>
    </div>
  )
}