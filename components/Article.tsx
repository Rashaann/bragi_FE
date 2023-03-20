import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';

import styles from '@/styles/Movies.module.css';
import Footer from './Footer';
import Router from 'next/router';


export default function Article() {
  return (
    <>
      <Head>
        <title>Bragi | Free streaming website</title>
        <meta name="description" content="Free streaming website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
      </Head>

      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
        <iframe src="https://uqload.co/embed-1l5h7gvu3ekz.html" width={640} height={360} allowFullScreen></iframe>
        </div>
      </main>

      <Footer />
    </>
  )
}