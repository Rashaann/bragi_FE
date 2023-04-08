import React, { createRef, useEffect, useState } from 'react';

import Head from 'next/head';

// printed-books/:book-id
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

import styles from '../styles/Movie.module.css';

import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Link from 'next/link';


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

    const [matchedMovies, setMatchedMovies] = useState<any>([]);
    const [movieCategory, setMovieCategory] = useState<string>('');

    const [availablePlayers, setAvailablePlayers] = useState<string[]>([]);


    useEffect(() => {
        fetch("https://bragi-be.vercel.app/movies/all")
        .then(response => response.json())
        .then(data => {
            // console.log('test => ', router.query)
          data.list.map((el:{id:string, category:string, link:{vf:string, vostfr:string, vo:string}}) => {
            if(el.id === router.query.movie){
                setArticlesList(el);
                setMovieCategory(el.category);
                setIsDataLoaded(true);
                // console.log(el.link.vostfr);
                // console.log(JSON.stringify(el.link.vf) !== JSON.stringify([]));
                // console.log(JSON.stringify(el.link.vostfr) !== JSON.stringify([]));
                // console.log(JSON.stringify(el.link.vo) !== JSON.stringify([]));

                {JSON.stringify(el.link.vf) !== JSON.stringify([])?
                setAvailablePlayers([...availablePlayers, 'vf']):
                setAvailablePlayers(availablePlayers)}
                {JSON.stringify(el.link.vostfr) !== JSON.stringify([])?
                setAvailablePlayers([...availablePlayers,'vostfr']):
                setAvailablePlayers(availablePlayers)}
                {JSON.stringify(el.link.vo) !== JSON.stringify([])?
                setAvailablePlayers([...availablePlayers, 'vo']):
                setAvailablePlayers(availablePlayers)}
            }
        })
        })


        fetch("https://bragi-be.vercel.app/movies/all")
        .then(response => response.json())
        .then(data => {
          let matchingMovies:object[] = [];
          data.list.map((el:{id:string, category:string}) => {
            if(JSON.stringify(el.category) === JSON.stringify(movieCategory)){
                matchingMovies.push(el);
            }
            });
            setMatchedMovies(matchingMovies);
        });

        
    
    },[router.query.movie, movieCategory]);


    let otherMovies:any;
    {isDataLoaded?
    otherMovies = matchedMovies.sort(function(){return 0.5 - Math.random()}).map((el:any,i:React.Key) => {
        if(el.id !== router.query.movie && i<4){
            return(<Link key={i} href={{pathname:`/movies/[movie]`, query: {id: el.id}}} as={`/movies/${el.id}`} passHref>
            {matches?
            <div key={i} className={styles.movieCont}>
              <div className={styles.content}>
                  <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.backgroundImg}></div>       
              </div>
            </div>:
            <div key={i} className={styles.smMovieCont}>
              <div className={styles.smContent}>
                  <div style={{backgroundImage:"url(" + el.poster + ")"}} className={styles.smBackgroundImg}></div>       
              </div>
            </div>}
          </Link>)
        }
    }):
    otherMovies = <div></div>}
      
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

                        <p>Available languages players <span style={{fontWeight:'bolder'}}>{availablePlayers.join()}</span></p>
                    </div>
                </div>
                
                <div className={styles.stream}>
                    <div className={styles.icons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.chooseLink}>Please choose the version to display</div>:
                    <div className={styles.backStream}>
                        {/* <iframe id='test' src={vf} style={{borderWidth: 0}} className={styles.test} width={800} height={450} allowFullScreen ></iframe> */}
                        <video
                            id="my-video"
                            controls
                            preload="auto"
                            width="640"
                            height="264"
                            data-setup="{}"
                            className={styles.chooseLink}
                        >
                            <source src={link} type="video/mp4" />
                        </video>
                        {/* <script src="https://vjs.zencdn.net/8.0.4/video.min.js"></script> */}
                    </div>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p>Movies you may like</p>
                    <div style={{display: 'flex'}}>{otherMovies}</div>
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

                        <p>Available languages players <span style={{fontWeight:'bolder'}}>{availablePlayers.join()}</span></p>
                    </div>
                </div>
                
                <div className={styles.smStream}>
                    <div className={styles.smIcons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.link.vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.link.vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.link.vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.smChooseLink}>Please choose the version to display</div>:
                    <div className={styles.smBackStream}>
                        {/* <iframe id='test' src={link} style={{borderWidth: 0, width: '80vw', height: '50vh'}} className={styles.test} allowFullScreen></iframe> */}
                        <video
                            id="my-video"
                            controls
                            preload="auto"
                            width="640"
                            height="264"
                            data-setup="{}"
                            className={styles.smChooseLink}
                        >
                            <source src={link} type="video/mp4" />
                        </video>
                    </div>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', width:'95vw'}}>
                    <p>Movies you may like</p>
                    <div style={{display: 'flex', width:'95vw', overflowX: 'scroll'}}>{otherMovies}</div>
                </div>
            </div>}
        </main>:
        initialRendering}

        <Footer />
    </>
  )
}