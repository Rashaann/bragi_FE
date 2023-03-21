import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';

import styles from '@/styles/Movies.module.css';
import Footer from './Footer';

import { useDispatch } from 'react-redux';
import { addSeriesToStore } from '@/reducers/bragi';

import Link from 'next/link';


import useMediaQuery from '@mui/material/useMediaQuery';

export default function Series() {
  const matches = useMediaQuery('(min-width:904px)');
  
  const [articlesList, setArticlesList]=useState<any>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://bragi-be.vercel.app/series/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addSeriesToStore(data.list));
      setArticlesList(data.list);
    });
  },[])


  let articles:any[] = articlesList.map((el: any,i: number) => {
    let title = '';
    if(el.mediaType === "serie"){

      let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
      return (
      <Link key={i} href={{pathname:`/[series]/serie`, query: {id: el.id, url: url}}} as={`/${el.id}/serie`} passHref>
        {matches?
        <div className={styles.container}>
          <div className={styles.content}>
              <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.backgroundImg}></div>       
          </div>
        </div>:
        <div className={styles.smContainer}>
          <div className={styles.smContent}>
              <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.smBackgroundImg}></div>       
          </div>
        </div>}
      </Link>)
    }
  });


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
        <div className={styles.body}>
          {articles}
        </div>
      </main>

      <Footer />
    </>
  )
}