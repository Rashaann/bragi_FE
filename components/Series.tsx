import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';

import styles from '@/styles/Movies.module.css';
import Footer from './Footer';

import { useDispatch } from 'react-redux';
import { addSeriesToStore } from '@/reducers/bragi';

import Link from 'next/link';


import useMediaQuery from '@mui/material/useMediaQuery';
import dispSeriesPerCat from '@/modules/dispSeriesPerCat';

export default function Series() {
  const matches = useMediaQuery('(min-width:904px)');
  
  const [articlesList, setArticlesList]=useState<any>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://bragi-be.vercel.app/series/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addSeriesToStore(data.list.sort((a:{date: string},b:{date: string}) => {
        return new Date(a.date)<new Date(b.date);
      })));
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

  const categories = ['all', 'comedy', 'horror', 'drama', 'crime', 'action', 'scifi', 'animation', 'superhero'];

  const dispSeries = categories.map((el, i) => {
    console.log(dispSeriesPerCat(el, articlesList, matches).length);
      if(matches){
        return(
          <div key={i} className={styles.movieContainer}>
            <h1 className={styles.title}>{el[0].toUpperCase() + el.slice(1)} shows:</h1>
            {dispSeriesPerCat(el, articlesList, matches).length !== 0?
            <div style={{display: 'flex', overflowX: 'scroll', height: 850}}>
              {dispSeriesPerCat(el, articlesList, matches)}
              <div className={styles.btnContent}>
                <Link href={{pathname:`/series/category/[category]`, query: {id: el}}} as={`/series/category/${el}`}>
                  <button style={{display: 'flex', justifyContent:'center', alignItems:'center', width: 200, height: 70, backgroundColor: 'black', cursor: 'pointer', color: 'white', borderRadius: 10, fontSize: 16}}>See more {el} shows</button>
                </Link>
              </div>
            </div>:
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height:850, fontSize:30}}>❌ No series for this category...</div>}
          </div>
        )
      } else {
        return (
          <div key={i} className={styles.movieContainer}>
            <h1>{el[0].toUpperCase() + el.slice(1)} shows:</h1>
            {dispSeriesPerCat(el, articlesList, matches).length !== 0?
            <div style={{display: 'flex', overflowX: 'scroll', height: 450}}>
              {dispSeriesPerCat(el, articlesList, matches)}
              <div className={styles.smBtnContent}>
                <Link href={{pathname:`/series/category/[category]`, query: {id: el}}} as={`/series/category/${el}`}>
                  <button style={{display: 'flex', justifyContent:'center', alignItems:'center', width: 180, height: 60, backgroundColor: 'black', cursor: 'pointer', color: 'white', borderRadius: 10, fontSize: 16}}>See more {el} shows</button>
                </Link>
              </div>
            </div>:
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height:450, fontSize:30}}>No series for this category</div>}
          </div>)
      }
    
  })


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
        <div className={styles.bodyCategory}>
          {dispSeries}
        </div>
      </main>

      <Footer />
    </>
  )
}