import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMoviesToStore, addSeriesToStore } from '@/reducers/bragi';



export default function Home() {
  const [articlesList, setArticlesList]=useState<any>([]);
  const [seriesList, setSeriesList] = useState<object[]>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://bragi-be.vercel.app/movies/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addMoviesToStore(data.list));
      setArticlesList(data.list);
      console.log(articlesList);
    });

    fetch("https://bragi-be.vercel.app/series/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addSeriesToStore(data.list));
      setSeriesList(data.list);
      console.log('seriesList => ',seriesList);
    });
  },[])


  let articles:any[] = articlesList.map((el: any,i: number) => {
    let title = '';
    if(el.mediaType === "movie"){

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


  let series:any[] = seriesList.map((el: any,i: number) => {
    let title = '';
    if(el.mediaType === "serie"){

      let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
      return (
      <Link key={i} href={{pathname:`/[series]/serie`, query: {id: el.id, url: url}}} as={`/${url}/serie`} passHref>
        <div className={styles.container}>
          <div className={styles.content}>
              <div style={{backgroundImage:"url(" + el.poster + ")"}} onMouseEnter={() => title=el.frenchTitle} onMouseLeave={() => title=''} className={styles.backgroundImg}></div>       
          </div>
        </div>
      </Link>)
    }
  });




  const logos:string[] = ["2m-logo.png", "almaghribia.png", "alaoula.jpg", "mbc_logo.png", "mbc4.png", "natgeo_ad.jpg", "filmstream.png", "rak_comedy_tv.jpg", "rak_action_tv.jpg", "rak_spotlight.jpg"];
  const channelName:string[] = ["Maroc 2M", "Al Maghribia", "Al Aoula", "MBC", "MBC 4", "National Geographic Abu Dhabi", "Filmstream", "Rakuten Comedy Movies", "Rakuten Action Movies", "Rakuten Spotlight"];


  const displayLogo = logos.map((el, i) => {
    return (<Link key={i} href="/tv">
        <div style={{ cursor: 'pointer', width: 150, height:150 }}>
            <img src={el} width={100} height={100}/>
            <p>{channelName[i]}</p>
      </div>
    </Link>)
  })
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
        <div className={styles.movieContainer}>
          <h1>New movies</h1>
          <div style={{display: 'flex', overflowX: 'scroll', height: '500px',}}>{articles}</div>
        </div>
        <div className={styles.seriesContainer}>
          <h1>New series/seasons</h1>
          <div style={{display: 'flex', overflowX: 'scroll', height: '500px',}}>{series}</div>
        </div>
        <div className={styles.description}>
          <h1>Tv channels</h1>
          <div style={{display:'flex', overflowX: 'scroll'}}>{displayLogo}</div>
        </div>
      </main>

      <Footer />
    </>
  )
}
