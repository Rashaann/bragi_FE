import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/TV.module.css';
import Header from './Header';
import Footer from './Footer';

export default function TV() {

  const logos = ["2m-logo.png", "almaghribia.png", "alaoula.jpg", "2m-logo.png", "almaghribia.png", "alaoula.jpg"];
  const channelName = ["Maroc 2M", "Al Maghribia", "Al Aoula", "MBC", "MBC 4", "National Geographic Abu Dhabi"];
  const sources = [
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2Fal_maghribia_snrt%2Fhls_snrt%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2Fal_aoula_inter%2Fhls_snrt%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fd3o3cim6uzorb4.cloudfront.net%2Fout%2Fv1%2F0965e4d7deae49179172426cbfb3bc5e%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fshls-masr-ak.akamaized.net%2Fout%2Fv1%2Fc08681f81775496ab4afa2bac7ae7638%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fadmdn2.cdn.mangomolo.com%2Fnagtv%2Fsmil%3Anagtv.stream.smil%2Fplaylist.m3u8&duration=734.097415"
  ];


  const spanishName = ["Filmstream", "Rakuten Comedy Movies", "Rakuten Action Movies", "Rakuten Spotlight"];
  const spanishSources = [
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fspi-filmstream-1-nl.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-comedymovies-2-es.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-actionmovies-2-es.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-spotlight-2-es.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415",

  ];
  
  const [tv, setTv] = useState<any>(<iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&duration=734.097415" style={{width: '80vw', height: '80vh'}} allow="autoplay; encrypted-media" allowFullScreen></iframe>);


  const displayTv = (source:string) => {
    setTv(
      <iframe src={source} style={{width: '80vw', height: '80vh'}} allow="autoplay; encrypted-media" allowFullScreen></iframe>)
  }

  const displayLogo = logos.map((el, i) => {
    return (<div style={{ cursor: 'pointer' }} onClick={() => displayTv(sources[i])}>
    <img src={el} width={100} height={100} />
    <p>{channelName[i]}</p>
  </div>)
  })
  
  return (
    <>
      <Head>
        <title>Bragi | Free streaming website</title>
        <meta name="description" content="Free streaming website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
        <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/8.0.4/video.min.js" defer></script>
      </Head>

      <Header />
      
      <main className={styles.main}>
        <div className={styles.description}>
          <div style={{display: 'flex', justifyContent:'space-around', alignItems:'center', overflowX: 'scroll', width:'80vw'}}>
            {displayLogo}
          </div>
          <div>
            {tv}
          </div>
        </div>
      </main>

      <Footer />
      
    </>
  )
}