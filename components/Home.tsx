import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMoviesToStore } from '@/reducers/bragi';



export default function Home() {
  const [articlesList, setArticlesList]=useState<any>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://192.168.0.35:3000/movies/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addMoviesToStore(data.list));
      setArticlesList(data.list);
      console.log(articlesList);
    });
  },[])


  let articles:any[] = articlesList.map((el: any,i: number) => {
    let title = '';
    if(el.mediaType === "movie"){

      let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
      return (
      <Link key={i} href={{pathname:`/movies/[movie]`, query: {id: el.id}}} as={`/movies/${el.id}`} passHref>
        <div className={styles.content}>
            <div style={{backgroundImage:"url(" + el.poster + ")"}} onMouseEnter={() => title=el.frenchTitle} onMouseLeave={() => title=''} className={styles.backgroundImg}></div>       
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
        <div className={styles.description}>
          <h1>New movies</h1>
          <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', overflowX: 'scroll', height: '65vh',}}>{articles}</div>
        </div>
        <div className={styles.description}>
          <h1>New series/seasons</h1>
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
