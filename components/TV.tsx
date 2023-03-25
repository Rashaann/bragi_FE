import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/TV.module.css';
import Header from './Header';
import Footer from './Footer';

export default function TV() {



  const logos:string[] = ["2m-logo.png", "almaghribia.png", "alaoula.jpg", "mbc_logo.png", "mbc4.png", "natgeo_ad.jpg", "abu_dhabi_sports.jpg", "https://i.imgur.com/Gp5mNea.png", "https://i.imgur.com/mrwFI2L.png", "https://i.imgur.com/un6qTGO.png", "https://i.imgur.com/Dj16oKL.png", "https://i.imgur.com/MosTwQW.png"];
  const channelName:string[] = ["Maroc 2M", "Al Maghribia", "Al Aoula", "MBC", "MBC 4", "National Geographic Abu Dhabi", "Abu Dhabi Sports 1", "Alaraby 2 TV", "Arrabiaa", "Assadissa", "Dubai One", "Medi 1 TV Maghreb"];
  const sources:string[] = [
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2Fal_maghribia_snrt%2Fhls_snrt%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2Fal_aoula_inter%2Fhls_snrt%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fd3o3cim6uzorb4.cloudfront.net%2Fout%2Fv1%2F0965e4d7deae49179172426cbfb3bc5e%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fshls-masr-ak.akamaized.net%2Fout%2Fv1%2Fc08681f81775496ab4afa2bac7ae7638%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fadmdn2.cdn.mangomolo.com%2Fnagtv%2Fsmil%3Anagtv.stream.smil%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fadmdn1.cdn.mangomolo.com%2Fadsports1%2Fsmil%3Aadsports1.stream.smil%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Falaraby.cdn.octivid.com%2Falaraby2n%2Fsmil%3Aalaraby2n.stream.smil%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2Farrabiaa%2Fhls_snrt%2Farrabiaa.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2Fassadissa%2Fhls_snrt%2Fassadissa.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fdminnvll.cdn.mangomolo.com%2Fdubaione%2Fsmil%3Adubaione.stream.smil%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fstreaming1.medi1tv.com%2Flive%2Fsmil%3Amedi1tv.smil%2Fplaylist.m3u8&duration=734.097415"
  ];


  const logosSpain:string[] = ["filmstream.png", "rak_comedy_tv.jpg", "rak_action_tv.jpg", "rak_spotlight.jpg"];
  const spanishName:string[] = ["Filmstream", "Rakuten Comedy Movies", "Rakuten Action Movies", "Rakuten Spotlight"];
  const spanishSources:string[] = [
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fspi-filmstream-1-nl.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-comedymovies-2-es.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-actionmovies-2-es.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-spotlight-2-es.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415",

  ];


  const logosItaly:string[] = ["rak_action_tv.jpg", "rak_comedy_tv.jpg", "rak_spotlight.jpg", "https://i.imgur.com/zDByOwo.png"];
  const italianName:string[] = ["Rakuten TV Action Movies Italy", "Rakuten TV Comedy Movies Italy", "Rakuten TV Spotlight Italy", "Super!"];
  const italianSources:string[] = [
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-actionmovies-6-eu.rakuten.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-comedymovies-6-eu.rakuten.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-spotlight-6-eu.rakuten.wurl.tv%2Fplaylist.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fvimnitaly.akamaized.net%2Fhls%2Flive%2F2094034%2Fsuper%2Fmaster.m3u8&duration=734.097415",
  ];

  const logosJapan:string[] = ["nhk_bs1.jpg", "nhk_bsp.jpg", "nhk_e.jpg", "nhk_g.jpg", "nhk_world_japan.jpg", "tbs.jpg", "tv_tokyo.jpg"];
  const japaneseName:string[] = ["NHK BS1", "NHK BSP", "NHK Educational TV", "NHK General", "NHK World Japan", "TV Asahi", "TBS", "TV Tokyo"];
  const japaneseSources:string[] = [
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fredlabmcdn.s.llnwi.net%2Fnv02%2Fbs01hd%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fredlabmcdn.s.llnwi.net%2Fnv02%2Fbs02hd%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fredlabmcdn.s.llnwi.net%2Fnv02%2Fryowa1hd%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fredlabmcdn.s.llnwi.net%2Fnv02%2Fryowa2hd%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fnhkwlive-ojp.akamaized.net%2Fhls%2Flive%2F2003459%2Fnhkwlive-ojp-en%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fredlabmcdn.s.llnwi.net%2Fnv02%2Fryowa4hd%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fredlabmcdn.s.llnwi.net%2Fnv02%2Fryowa5hd%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fredlabmcdn.s.llnwi.net%2Fnv02%2Fryowa6hd%2Findex.m3u8&duration=734.097415",
  ];


  const logosFrance:string[] = ["nrj12.jpg", "tf1.jpg", "cherie25.jpg"];
  const frenchName:string[] = ["NRJ12", "TF1", "Cherie 25"];
  const frenchSources:string[] = [
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fnrj12.nrjaudio.fm%2Fhls%2Flive%2F2038374%2Fnrj_12%2Fmaster.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Flive-tf1-hls-dai.cdn-1.diff.tf1.fr%2Fout%2Fv1%2Fc2e382be3aa2486e8753747e7bb6157e%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcherie25.nrjaudio.fm%2Fhls%2Flive%2F2038375%2Fc25%2FFHD.m3u8&duration=734.097415",
  ];
  


  const [tv, setTv] = useState<any>(<iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&duration=734.097415" style={{width: '80vw', height: '80vh'}} allow="autoplay; encrypted-media" allowFullScreen></iframe>);


  const displayTv = (source:string) => {
    setTv(
      <iframe src={source} style={{width: '80vw', height: '80vh'}} allow="autoplay; encrypted-media" allowFullScreen></iframe>)
  }

  const displayLogo = logos.map((el, i) => {
    return (<div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', width: 350, height: 250 }} onClick={() => displayTv(sources[i])}>
        <img src={el} width={100} height={100} />
        <p>{channelName[i]}</p>
  </div>)
  })


  const [tvSpain, setTvSpain] = useState<any>(<iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fspi-filmstream-1-nl.samsung.wurl.tv%2Fplaylist.m3u8&duration=734.097415" style={{width: '80vw', height: '80vh'}} allow="encrypted-media" allowFullScreen></iframe>);


  const displayTvSpain = (source:string) => {
    setTvSpain(
      <iframe src={source} style={{width: '80vw', height: '80vh'}} allow="encrypted-media" allowFullScreen></iframe>)
  }

  const displayLogoSpain = logosItaly.map((el, i) => {
    return (<div style={{ cursor: 'pointer', width: 150, height: 150 }} onClick={() => displayTvSpain(spanishSources[i])}>
    <img src={el} width={100} height={100} />
    <p>{spanishName[i]}</p>
  </div>)
  })



  const [tvItaly, setTvItaly] = useState<any>(<iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Frakuten-actionmovies-6-eu.rakuten.wurl.tv%2Fplaylist.m3u8&duration=734.097415" style={{width: '80vw', height: '80vh'}} allow="encrypted-media" allowFullScreen></iframe>);


  const displayTvItaly = (source:string) => {
    setTvItaly(
      <iframe src={source} style={{width: '80vw', height: '80vh'}} allow="encrypted-media" allowFullScreen></iframe>)
  }

  const displayLogoItaly = logosSpain.map((el, i) => {
    return (<div style={{ cursor: 'pointer', width: 150, height: 150 }} onClick={() => displayTvItaly(italianSources[i])}>
    <img src={el} width={100} height={100} />
    <p>{italianName[i]}</p>
  </div>)
  });



  const [tvJapan, setTvJapan] = useState<any>(<iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fredlabmcdn.s.llnwi.net%2Fnv02%2Fbs01hd%2Findex.m3u8&duration=734.097415" style={{width: '80vw', height: '80vh'}} allow="encrypted-media" allowFullScreen></iframe>);


  const displayTvJapan = (source:string) => {
    setTvJapan(
      <iframe src={source} style={{width: '80vw', height: '80vh'}} allow="encrypted-media" allowFullScreen></iframe>)
  }

  const displayLogoJapan = logosJapan.map((el, i) => {
    return (<div style={{ cursor: 'pointer', width: 150, height: 150 }} onClick={() => displayTvJapan(japaneseSources[i])}>
    <img src={el} width={100} height={100} />
    <p>{japaneseName[i]}</p>
  </div>)
  })



  const [tvFrance, setTvFrance] = useState<any>(<iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fnrj12.nrjaudio.fm%2Fhls%2Flive%2F2038374%2Fnrj_12%2Fmaster.m3u8&duration=734.097415" style={{width: '80vw', height: '80vh'}} allow="encrypted-media" allowFullScreen></iframe>);


  const displayTvFrance = (source:string) => {
    setTvFrance(
      <iframe src={source} style={{width: '80vw', height: '80vh'}} allow="encrypted-media" allowFullScreen></iframe>)
  }

  const displayLogoFrance = logosFrance.map((el, i) => {
    return (<div style={{ cursor: 'pointer', width: 150, height: 150 }} onClick={() => displayTvFrance(frenchSources[i])}>
    <img src={el} width={100} height={100} />
    <p>{frenchName[i]}</p>
  </div>)
  })
  
  return (
    <>
      <Head>
        <title>Bragi | Free streaming website</title>
        <meta name="description" content="Free streaming website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
        <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
        <script src="https://vjs.zencdn.net/8.0.4/video.min.js" defer></script>
      </Head>

      <Header />
      
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Arabic channels</h1>
          <div style={{display: 'flex', overflowX: 'scroll', width: '80vw', height: 250}}>
            {displayLogo}
          </div>
          <div>
            {tv}
          </div>
        </div>
        <div className={styles.description}>
          <h1>Spanish channels</h1>
          <div style={{display: 'flex', overflowX: 'scroll', width: '80vw', height: 200}}>
            {displayLogoSpain}
          </div>
          <div>
            {tvSpain}
          </div>
        </div>


        <div className={styles.description}>
          <h1>Italian channels</h1>
          <div style={{display: 'flex', overflowX: 'scroll', width: '80vw', height: 200}}>
            {displayLogoItaly}
          </div>
          <div>
            {tvItaly}
          </div>
        </div>

        <div className={styles.description}>
          <h1>Japanese channels</h1>
          <div style={{display: 'flex', overflowX: 'scroll', width: '80vw', height: 200}}>
            {displayLogoJapan}
          </div>
          <div>
            {tvJapan}
          </div>
        </div>


        <div className={styles.description}>
          <h1>French channels</h1>
          <div style={{display: 'flex', overflowX: 'scroll', width: '80vw', height: 200}}>
            {displayLogoFrance}
          </div>
          <div>
            {tvFrance}
          </div>
        </div>

        <div className={styles.description}>
          <h1>M6</h1>
          <video
        id="my-video"
        controls
        preload="auto"
        width="640"
        height="264"
        data-setup="{}"
      >
        <source src="https://shls-m6-france-prod-dub.shahid.net/out/v1/c8a9f6e000cd4ebaa4d2fc7d18c15988/index.m3u8"/>

      </video>
        </div>
      </main>

      <Footer />
      
    </>
  )
}