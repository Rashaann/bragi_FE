import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';

import styles from '@/styles/Movies.module.css';
import Footer from './Footer';
import Router from 'next/router';

import uid2 from 'uid2';


export default function Movies() {

  
  const [articlesList, setArticlesList]=useState<any>([]);
  useEffect(() => {
    fetch("http://192.168.0.35:3000/movies/all")
    .then(response => response.json())
    .then(data => {
      setArticlesList(data.list);
    });
  },[])


  let articles:any[] = articlesList.map((el: any,i: number) => {
    if(el.mediaType === "movie"){

      let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + uid2(7)

      return (<div
      key={i}
      className={styles.content}
      onClick={() => Router.push({pathname: '/movie', query: { url: url }})} //"query" -> send url to movie page in order to create a dynamic url
      >
        <a href={"movie?url="+url}>
            <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.backgroundImg}></div>
            <div className={styles.title}>{el.frenchTitle}</div>
            {/* ON HOVER -> SHOW TITLE */}
        </a>
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