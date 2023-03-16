import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/TV.module.css';
import Header from './Header';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] })

export default function TV() {
  const [show2M, setShow2M] = useState<boolean>(false);
  const [show2M2, setShow2M2] = useState<boolean>(false);
  const [showAlAoula, setShowAlAoula] = useState<boolean>(false);

  const logos = ["2m-logo.png", "almaghribia.png", "alaoula.jpg"];
  const sources = [
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2Fal_maghribia_snrt%2Fhls_snrt%2Findex.m3u8&duration=734.097415",
    "https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2Fal_aoula_inter%2Fhls_snrt%2Findex.m3u8&duration=734.097415"
  ]
  const [srcs, setSrcs] = useState<string>("https://cdnamd-hls-globecast.akamaized.net/live/ramdisk/2m_monde/hls_video_ts_tuhawxpiemz257adfc/2m_monde.m3u8")
  
  const [tv, setTv] = useState<any>(<iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&duration=734.097415" style={{width: '80vw', height: '80vh'}} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>);


  console.log(srcs);
  const displayTv = (source:string) => {
    setSrcs(source);
    setTv(
      <iframe src={srcs} width="600" height="400" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>)
  }

  const displayLogo = logos.map((el, i) => {
    return (<div style={{ cursor: 'pointer' }} onClick={() => displayTv(sources[i])}>
    <img src={el} width={100} />
    <p>Maroc 2M</p>

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
          TV
          <div>
            <p>einse</p>
            {displayLogo}
            <p>enjszknzs</p>
            {tv}
          </div>
          <div onClick={() => setShow2M(!show2M)}>
            <img src="2m-logo.png" width={100} />
            <p>Maroc 2M</p>
            {/* <video
          id="my-video"
          class="video-js"
          controls
          preload="auto"
          width="1000"
          height="500"
          autoplay
          data-setup="{}"
        >
          <source src="https://cdnamd-hls-globecast.akamaized.net/live/ramdisk/2m_monde/hls_video_ts_tuhawxpiemz257adfc/2m_monde.m3u8" type="application/x-mpegURL" />
        </video> */}
          </div>
          <div onClick={() => setShow2M2(!show2M2)}>
            <img src="almaghribia.png" width={100} />
            <p>Al Maghribia</p>
            {/* <video
          id="my-video"
          class="video-js"
          controls
          preload="auto"
          width="1000"
          height="500"
          autoplay
          data-setup="{}"
        >
          <source src="http://cdnamd-hls-globecast.akamaized.net/live/ramdisk/al_maghribia_snrt/hls_snrt/index.m3u8" type="application/x-mpegURL" />
        </video> */}
          </div>
          <div onClick={() => setShowAlAoula(!showAlAoula)}>
            <img src="alaoula.jpg" width={100} />
            <p>Al Aoula MA</p>
            <video
            id="my-video"
            class="video-js"
            controls
            preload="auto"
            width="1000"
            height="500"
            autoplay
            data-setup="{}"
          >
            <source src="https://cdnamd-hls-globecast.akamaized.net/live/ramdisk/al_aoula_inter/hls_snrt/index.m3u8" type="application/x-mpegURL" />
          </video>
          </div>
          <div>
            <p>Test</p>
            {/* <video
          id="my-video"
          class="video-js"
          controls
          preload="auto"
          width="1000"
          height="500"
          autoplay
          data-setup="{}"
        >
          <source src="https://vs-hls-pushb-uk-live.akamaized.net/x=3/i=urn:bbc:pips:service:bbc_one_yorks/mobile_wifi_main_sd_abr_v2_akamai_hls_live_http.m3u8" type="application/x-mpegURL" />
        </video> */}
        </div>
        <button onClick={() => setShow2M2(!show2M2)}>Click Me</button>
        </div>
        {show2M && <iframe src="https://bradmax.com/client/embed-player/8c177fc01428643cb4513fd31fedc4183e14bdd1_13452?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&duration=734.097415" width="600" height="400" frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>}
        {show2M2 && <iframe src="https://bradmax.com/client/embed-player/89fefaaa1552ee25a176490f6b915420ce7bb8db_13453?mediaUrl=https%3A%2F%2Fcdnamd-hls-globecast.akamaized.net%2Flive%2Framdisk%2F2m_monde%2Fhls_video_ts_tuhawxpiemz257adfc%2F2m_monde.m3u8&title=food%20network%20test1&duration=100000000000&splashImgUrl=https%3A%2F%2Fbradmax.com%2Fstatic%2Fimages%2Fstartsplash.jpg" width="600" height="400" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>}
        {showAlAoula && <video
            id="my-video"
            class="video-js"
            controls
            preload="auto"
            width="1000"
            height="500"
            data-setup="{}"
          >
            <source src="http://cdnamd-hls-globecast.akamaized.net/live/ramdisk/al_aoula_inter/hls_snrt/index.m3u8" type="application/x-mpegURL" />
          </video>}
      </main>

      <Footer />
      
    </>
  )
}