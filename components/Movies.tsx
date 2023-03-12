import React from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Movies() {
  return (
    <>
      <Head>
        <title>Bragi | Free streaming website</title>
        <meta name="description" content="Free streaming website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          Movies
        </div>
      </main>
    </>
  )
}