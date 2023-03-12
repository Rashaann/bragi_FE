import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';

import styles from '@/styles/Series.module.css';
import Footer from './Footer';
import Router from 'next/router';


export default function Series() {
  const [articlesList, setArticlesList]=useState<any>([]);
  useEffect(() => {
    fetch("http://192.168.0.35:3000/movies/all")
    .then(response => response.json())
    .then(data => {
      setArticlesList(data.list);
    });
  },[])


  let articles:any[] = articlesList.map((el: any,i: number) => {
    if(el.mediaType === "serie"){
      return (<div 
      style={{backgroundColor:'black', height:'60vh', width:'16vw', borderRadius:10, cursor: 'pointer'}}
      onClick={() => Router.push('/article')}
      >
            <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.backgroundImg}></div>
            <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height:'10vh', width:'16vw', color:'rgb(218,38,41)'}}>{el.frenchTitle}</div>
            {/* ON HOVER -> SHOW TITLE */}
        </div>)
    }
  });


  return (
    <>
      <Head>
        <title>Bragi | Free streaming website</title>
        <meta name="description" content="Free streaming website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {articles}
        </div>
      </main>

      <Footer />
    </>
  )
}