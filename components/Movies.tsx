import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';

import styles from '@/styles/Movies.module.css';
import Footer from './Footer';

import { useDispatch } from 'react-redux';
import { addMoviesToStore } from '@/reducers/bragi';

import Link from 'next/link';

import useMediaQuery from '@mui/material/useMediaQuery';
import dispMoviesPerCat from '@/modules/dispMoviesPerCat';

export default function Movies() {
  const matches = useMediaQuery('(min-width:904px)');
  
  const [articlesList, setArticlesList]=useState<any>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://bragi-be.vercel.app/movies/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addMoviesToStore(data.list));
      setArticlesList(data.list);
    });
  },[]);

  const categories = ['comedy', 'horror', 'drama', 'action', 'scifi', 'animation', 'superhero'];

  const dispMovies = categories.map((el, i) => {
    console.log(dispMoviesPerCat(el, articlesList, matches).length);
      if(matches){
        return(
          <div key={i} className={styles.movieContainer}>
            <h1 className={styles.title}>{el[0].toUpperCase() + el.slice(1)} movies:</h1>
            {dispMoviesPerCat(el, articlesList, matches).length !== 0?
            <div style={{display: 'flex', overflowX: 'scroll', height: 850}}>
              {dispMoviesPerCat(el, articlesList, matches)}
              <div className={styles.btnContent}>
                <Link href={{pathname:`/movies/category/[category]`, query: {id: el}}} as={`/movies/category/${el}`}>
                  <button style={{display: 'flex', justifyContent:'center', alignItems:'center', width: 200, height: 70, backgroundColor: 'black', cursor: 'pointer', color: 'white', borderRadius: 10, fontSize: 16}}>See more {el} movies</button>
                </Link>
              </div>
            </div>:
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height:850, fontSize:30}}>❌ No movies for this category...</div>}
          </div>
        )
      } else {
        return (
          <div key={i} className={styles.movieContainer}>
            <h1>{el[0].toUpperCase() + el.slice(1)} movies:</h1>
            {dispMoviesPerCat(el, articlesList, matches).length !== 0?
            <div style={{display: 'flex', overflowX: 'scroll', height: 450}}>
              {dispMoviesPerCat(el, articlesList, matches)}
              <div className={styles.smBtnContent}>
                <Link href={{pathname:`/movies/category/[category]`, query: {id: el}}} as={`/movies/category/${el}`}>
                  <button style={{display: 'flex', justifyContent:'center', alignItems:'center', width: 180, height: 60, backgroundColor: 'black', cursor: 'pointer', color: 'white', borderRadius: 10, fontSize: 16}}>See more {el} movies</button>
                </Link>
              </div>
            </div>:
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height:450, fontSize:30}}>No movies for this category</div>}
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
        <div className={styles.body}>
          {dispMovies}
        </div>
      </main>

      <Footer />
    </>
  )
}