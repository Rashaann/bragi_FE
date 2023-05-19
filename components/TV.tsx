import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/TV.module.css';
import Header from './Header';
import Footer from './Footer';

export default function TV() {
  const [tvChannels, setTvChannels] = useState<object[]>([]);
  const [tv, setTv] = useState<any>(<iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&duration=734.097415" style={{width: '80vw', height: '80vh'}} allow="autoplay; encrypted-media" allowFullScreen></iframe>);

  useEffect(() => {
    fetch('https://bragi-be.vercel.app/tv/all')
    .then(response => response.json())
    .then(data => {
      if(data.result){
        setTvChannels(data.list);
        console.log('TV CHANNELS FETCHED.');
      } else {
        console.log('AN ERROR OCCURED DURING THE FETCH.')
      }
    })
  },[tv]);
  


  
  const regex = /bradmax/i

  const displayTv = (source:string) => {
    {regex.test(source)?
    setTv(<iframe src={source} style={{width: '80vw', height: '80vh'}} allow="autoplay; encrypted-media" allowFullScreen></iframe>):
    setTv(<video
      id="my-video"
      //class="video-js"
      controls
      preload="auto"
      width="640"
      height="264"
      poster="MY_VIDEO_POSTER.jpg"
      data-setup="{}"
    >
      <source src={source} type="application/x-mpegURL" />
    </video>)
    }
  }

  const displayLogo = tvChannels.map((el:any, i:React.Key) => {
    return (
    <div key={i} style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', width: 350, height: 250 }} onClick={() => displayTv(el.link)}>
        <img src={el.image} width={100} height={100} />
        <p>{el.title}</p>
  </div>)
  })

  // arte -> "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fartesimulcast.akamaized.net%2Fhls%2Flive%2F2031003%2Fartelive_fr%2Findex.m3u8&title=Tears%20of%20steel&duration=734.097415"
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
          <h1>All channels</h1>
          <div style={{display: 'flex', overflowX: 'scroll', width: '80vw', height: 250}}>
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