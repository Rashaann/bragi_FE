import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from './Header';

import styles from '@/styles/Movies.module.css';
import Footer from './Footer';
import Router, { useRouter } from 'next/router';

import uid2 from 'uid2';
import { useDispatch } from 'react-redux';
import { addMoviesToStore } from '@/reducers/bragi';

import Link from 'next/link';

export default function Categories() {
  const router = useRouter();
  
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
  },[])


  let articles:any[] = articlesList.map((el: any,i: number) => {
    let title = '';
    if(el.mediaType === "movie" && (router.query.category !== 'recent' && el.category === router.query.category)){
      let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
      return (
      <Link key={i} href={{pathname:`/movies/[movie]`, query: {id: el.id}}} as={`/movies/${el.id}`} passHref>
        <div className={styles.container}>
          <div className={styles.content}>
              <div style={{backgroundImage:"url(" + el.poster + ")"}} onMouseEnter={() => title=el.frenchTitle} onMouseLeave={() => title=''} className={styles.backgroundImg}></div>       
          </div>
        </div>
      </Link>)
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
        <p className={styles.title}>Movies for category: {router.query.category}</p>
        <div className={styles.body}>
          {articles}
        </div>
      </main>

      <Footer />
    </>
  )
}