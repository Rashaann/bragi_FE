import React from 'react';

import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.body}>
      <div></div>
      <div className={styles.container}>
        <p>Made with 💚 by Zak<span className={styles.hiddenName}>stein</span></p>
      </div>
    </div>
  )
}