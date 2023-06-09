import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMoviesToStore, addSeriesToStore, addChannelsToStore } from '@/reducers/bragi';

import useMediaQuery from '@mui/material/useMediaQuery';
import ModalConnection from './ModalConnection';


export default function Home() {
  const [articlesList, setArticlesList]=useState<any>([]);
  const [seriesList, setSeriesList] = useState<object[]>([]);
  const [tvChannels, setTvChannels] = useState<object[]>([]);
  const [showTitle, setShowTitle] = useState<boolean>(false);

  const [isConnectionModal, setIsConnectionModal] = useState<boolean>(false);

  const matches = useMediaQuery('(min-width:904px)');

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://bragi-be.vercel.app/movies/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addMoviesToStore(data.list.sort((a:{date: string},b:{date: string}) => {
        return new Date(a.date)<new Date(b.date);
      })));
      setArticlesList(data.list);
      console.log(articlesList);
    });

    fetch("https://bragi-be.vercel.app/series/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addSeriesToStore(data.list.sort((a:{date: string},b:{date: string}) => {
        return new Date(a.date)<new Date(b.date);
      })));
      setSeriesList(data.list);
      console.log('seriesList => ',seriesList);
    });


    fetch("https://bragi-be.vercel.app/tv/all")
    .then(response => response.json())
    .then(data => {
      dispatch(addChannelsToStore(data.list));
      setTvChannels(data.list);
      console.log('tvChannels => ',tvChannels);
    });
  },[])
  
  

  let articles:any[] = articlesList.map((el: any, i: number) => {
    //let title = '';
    if(el.mediaType === "movie" && i<=8){
      
      //let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
      return (
      <Link key={i} href={{pathname:`/movies/[movie]`, query: {id: el.id}}} as={`/movies/${el.id}`} passHref>
        {matches?
        <div key={i} className={styles.container}>
          <div className={styles.content}>
              <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.backgroundImg}></div>       
          </div>
        </div>:
        <div key={i} className={styles.smContainer}>
          <div className={styles.smContent}>
              <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.smBackgroundImg}></div>       
          </div>
        </div>}
      </Link>)
    } else if(i === articlesList.length-1){
      if(matches){
        return (<div className={styles.btnContent}>
          <Link href={{pathname:`/movies`}}>
            <button style={{display: 'flex', justifyContent:'center', alignItems:'center', width: 200, height: 70, backgroundColor: 'black', cursor: 'pointer', color: 'white', borderRadius: 10, fontSize: 16}}>See more movies</button>
          </Link>
        </div>)
      } else {
        return (<div className={styles.smBtnContent}>
          <Link href={{pathname:`/movies`}}>
            <button style={{display: 'flex', justifyContent:'center', alignItems:'center', width: 180, height: 60, backgroundColor: 'black', cursor: 'pointer', color: 'white', borderRadius: 10, fontSize: 16}}>See more movies</button>
          </Link>
        </div>)
      }
    }
  });


  let series:any[] = seriesList.map((el: any,i: number) => {
    //let title = '';
    //console.log
    if(el.mediaType === "serie" && i<=8){

      //let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
      return (
      <Link key={i} href={{pathname:`/[series]/serie`, query: {id: el.id}}} as={`/${el.id}/serie`} passHref>
        {matches?
        <div key={i} className={styles.container}>
          <div className={styles.content}>
              <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.backgroundImg}></div>       
          </div>
        </div>:
        <div key={i} className={styles.smContainer}>
          <div className={styles.smContent}>
              <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.smBackgroundImg}></div>       
          </div>
        </div>}
      </Link>)
    } else if(i === seriesList.length-1){
      if(matches){
        return (<div className={styles.btnContent}>
          <Link href={{pathname:`/series`}}>
            <button style={{display: 'flex', justifyContent:'center', alignItems:'center', width: 200, height: 70, backgroundColor: 'black', cursor: 'pointer', color: 'white', borderRadius: 10, fontSize: 16}}>See more series</button>
          </Link>
        </div>)
      } else {
        return (<div className={styles.smBtnContent}>
          <Link href={{pathname:`/series`}}>
            <button style={{display: 'flex', justifyContent:'center', alignItems:'center', width: 180, height: 60, backgroundColor: 'black', cursor: 'pointer', color: 'white', borderRadius: 10, fontSize: 16}}>See more series</button>
          </Link>
        </div>)
      }
    }
  });




  const logos:string[] = ["2m-logo.png", "almaghribia.png", "alaoula.jpg", "mbc_logo.png", "mbc4.png", "natgeo_ad.jpg", "filmstream.png", "rak_comedy_tv.jpg", "rak_action_tv.jpg", "rak_spotlight.jpg"];
  const channelName:string[] = ["Maroc 2M", "Al Maghribia", "Al Aoula", "MBC", "MBC 4", "National Geographic Abu Dhabi", "Filmstream", "Rakuten Comedy Movies", "Rakuten Action Movies", "Rakuten Spotlight"];


  const displayLogo = tvChannels.map((el:any, i:number) => {
    return (<Link key={i} href="/tv">
        <div key={i} style={{ cursor: 'pointer', width: 150, height:150 }}>
            <img src={el.image} width={100} height={100}/>
            <p>{el.title}</p>
      </div>
    </Link>)
  })
  return (
    <>
      <Head>
        <title>Bragi | Free streaming website</title>
        <meta name="description" content="Free streaming website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
        <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
      </Head>

      {isConnectionModal && <ModalConnection setIsConnectionModal={setIsConnectionModal} isConnectionModal={isConnectionModal} />}
      <Header isConnectionModal={isConnectionModal} setIsConnectionModal={setIsConnectionModal} />
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
