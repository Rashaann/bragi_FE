import React, { createRef, useEffect, useState } from 'react';

import Head from 'next/head';

// printed-books/:book-id
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

import styles from '../styles/Movie.module.css';

import useMediaQuery from '@mui/material/useMediaQuery';


export default function Movie() {
    const router = useRouter();
    const id = router.query.id;

    const matches = useMediaQuery('(min-width:904px)');
    const [articlesList, setArticlesList]=useState<any>({});
    const [showIt, setShowIt] = useState<boolean>(false);

    const [link, setLink] = useState<string>('');

    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    const [initialRendering, setInitialRendering] = useState<any>(
        <main className={styles.main}>
            <div className={styles.container}>
                <p className={styles.loading}>Loading...</p>
            </div>
        </main>
    );


    // Initialisation of state variables for each "players"
    const [vf, setVf] = useState<string>('');
    const [vostfr, setVostfr] = useState<string>('');
    const [vo, setVo] = useState<string>('');

 


    useEffect(() => {
        fetch("https://bragi-be.vercel.app/movies/all")
        .then(response => response.json())
        .then(data => {
            // console.log('test => ', router.query)
          data.list.map((el:{id:string, pcloudIds:{vf: string, vostfr: string, vo: string}}) => {
              if(el.id === router.query.movie){
                setArticlesList(el);
                setIsDataLoaded(true);





            console.log('id => ', el.pcloudIds.vf)
            if(el.pcloudIds.vf){
                fetch(`https://bragi-be.vercel.app/movies/movieUrl/${el.pcloudIds.vf}`)
                .then(response => response.json())
                .then(movieVf => {
                    console.log(movieVf);
                    setVf(movieVf.url);
                })
            }

            if(el.pcloudIds.vostfr){
                fetch(`https://bragi-be.vercel.app/movies/movieUrl/${el.pcloudIds.vostfr}`)
                .then(response => response.json())
                .then(movieVostfr => {
                    setVf(movieVostfr.url);
                })
            }

            if(el.pcloudIds.vo){
                fetch(`https://bragi-be.vercel.app/movies/movieUrl/${el.pcloudIds.vo}`)
                .then(response => response.json())
                .then(movieVo => {
                    setVf(movieVo.url);
                })
            }

                // console.log(el.pcloudIds);
            }
          })
        });
        
      },[router.query.movie]);
      
  return (
    <>
        <Head>
            <title>{articlesList.frenchTitle}</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
            <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
            <script src="https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
        </Head>

        <Header />

        {isDataLoaded?
        <main className={styles.main}>
            {matches?
            <div className={styles.container}>
                <div className={styles.infos}>
                    <div className={styles.leftPart}>
                        <img src={articlesList.poster} width={250} />
                    </div>
                    <div className={styles.rightPart}>
                        <h1>{articlesList.frenchTitle}</h1>
                        <p>Overview: {articlesList.overview}</p>
                        <p>Ratings: {articlesList.note} ({articlesList.nbVoters})</p>
                        <p>Released on: {articlesList.releaseDate}</p>
                    </div>
                </div>
                
                <div className={styles.stream}>
                    <div className={styles.icons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.languageIcon} onClick={() => setLink(vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.languageIcon} onClick={() => setLink(vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.languageIcon} onClick={() => setLink(vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.chooseLink}>Please choose the version to display</div>:
                    <div className={styles.backStream}>
                        <iframe id='test' src={vf} style={{borderWidth: 0}} className={styles.test} width={800} height={450} allowFullScreen ></iframe>
                        {/* <video
                            id="my-video"
                            controls
                            preload="auto"
                            width="640"
                            height="264"
                            poster="MY_VIDEO_POSTER.jpg"
                            data-setup="{}"
                        >
                            <source src={vf} type="video/mp4" />
                        </video>
                        <script src="https://vjs.zencdn.net/8.0.4/video.min.js"></script> */}
                    </div>}
                </div>
            </div>:
            <div className={styles.smContainer}>
                <div className={styles.smInfos}>
                    <div className={styles.smLeftPart}>
                        <h1 className={styles.smTitle}>{articlesList.frenchTitle}</h1>
                        <img src={articlesList.poster} width={250} />
                    </div>
                    <div className={styles.smRightPart}>
                        <p><span style={{fontWeight: 'bolder'}}>Overview:</span> {articlesList.overview}</p>
                        <p><span style={{fontWeight: 'bolder'}}>Ratings:</span> {articlesList.note} ({articlesList.nbVoters})</p>
                        <p><span style={{fontWeight: 'bolder'}}>Released on:</span> {articlesList.releaseDate}</p>
                    </div>
                </div>
                
                <div className={styles.smStream}>
                    <div className={styles.smIcons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.smLanguageIcon} onClick={() => setLink(vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.smLanguageIcon} onClick={() => setLink(vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.smLanguageIcon} onClick={() => setLink(vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.smChooseLink}>Please choose the version to display</div>:
                    <div className={styles.smBackStream}>
                        <iframe id='test' src={link} style={{borderWidth: 0, width: '80vw', height: '50vh'}} className={styles.test} allowFullScreen></iframe>
                    </div>}
                </div>
            </div>}
        </main>:
        initialRendering}

        <Footer />
    </>
  )
}