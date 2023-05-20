import React, { useEffect, useState } from 'react';

import Head from 'next/head';


import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

import styles from '../styles/Movie.module.css';

import Link from 'next/link';

import useMediaQuery from '@mui/material/useMediaQuery';
import ModalConnection from './ModalConnection';

export default function Serie() {
    const router = useRouter();
    const id = router.query.id;

    const matches = useMediaQuery('(min-width:904px)');

    const [isConnectionModal, setIsConnectionModal] = useState<boolean>(false);

    const [articlesList, setArticlesList]=useState<any>({});
    const [showIt, setShowIt] = useState<boolean>(false);


    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [serie, setSerie] = useState<any>();
    const [seasons, setSeasons] = useState<any>();
    const [episodes, setEpisodes] = useState<any>();
    

    useEffect(() => {
        fetch("https://bragi-be.vercel.app/series/all")
        .then(response => response.json())
        .then(data => {
            console.log('test => ', router.query);
          data.list.map((el:{id:string, links:any, frenchTitle:string}) => {
            if(el.id === router.query.series){
                setArticlesList(el);
                setSerie(el.links);
                setIsLoaded(true);
                // console.log('bjncrd => ', el.links[0]);

                setEpisodes(Object.keys(el.links[0][`S${String(1)}`]).map((e, j) => {
                    // console.log('episode => ', String(Number(j) + 1))
                    let episode = 'episode ' + String(Number(j) + 1);
                    return (<div key={j}>
                        {episode}
                    </div>)
                }));


                //Init of seasons variable to filter elements that are not seasons (i.e. __v, vf, vostfr & vo);
                let seasons = Object.keys(el.links[0]).filter(e => e[0] === 'S');

                setSeasons(seasons.map((e, i) => {
                    //let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
                    let season = 'season ' + String(Number(i)+1);
                    console.log(String(Number(i)+1));
                    // console.log('season => ', JSON.stringify(e[0])===JSON.stringify('S'));
                    if(JSON.stringify(e[0])===JSON.stringify('S')){
                        return (<Link key={i} href={{pathname:'/[series]/[seasons]/season', query: {id: el.id, season: String(Number(i)+1), seasonUrl: `season${String(Number(i)+1)}`}}} as={`/${el.id}/${String(Number(i)+1)}/season`}>
                            {matches?
                            <div className={styles.seasonContainer}>
                                <div className={styles.seasonContent}>
                                    {season}
                                </div>
                            </div>:
                            <div className={styles.smSeasonContainer}>
                                <div className={styles.smSeasonContent}>
                                    {season}
                                </div>
                            </div>}
                        </Link>)
                    }
                }));
            }
          });

        });
      },[router.query.series]);
    
    
  return (
    <>
        <Head>
            <title>{articlesList.frenchTitle}</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
        </Head>

        {isConnectionModal && <ModalConnection setIsConnectionModal={setIsConnectionModal} />}
        <Header isConnectionModal={isConnectionModal} setIsConnectionModal={setIsConnectionModal} />

            {isLoaded?
        <main className={styles.main}>
            {matches?
            <div className={styles.container}>
                <div className={styles.infos}>
                    <div className={styles.leftPart}>
                        <img src={articlesList.poster} width={250} />
                    </div>
                    <div className={styles.rightPart}>
                        {/* <p>book-id <em>{query['url']}</em></p> */}
                        <h1>{articlesList.frenchTitle}</h1>
                        <p>Overview: {articlesList.overview}</p>
                        <p>Ratings: {articlesList.note} ({articlesList.nbVoters})</p>
                        <p>Released on: {articlesList.releaseDate}</p>
                    </div>
                </div>
                <div className={styles.displaySeasons}>
                    {/* <div className={styles.icons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vf[0])} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vostfr[0])} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vo[0])} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.chooseLink}>Please choose the version to display</div>:
                    <div className={styles.backStream}>
                        <iframe src={link} style={{borderWidth: 0}} width={800} height={450} allowFullScreen></iframe>
                    </div>} */}
                    {seasons}
                </div>
            </div>:
            <div className={styles.smContainer}>
                <div className={styles.smInfos}>
                    <div className={styles.smLeftPart}>
                        <h1>{articlesList.frenchTitle}</h1>
                        <img src={articlesList.poster} width={250} />
                    </div>
                    <div className={styles.smRightPart}>
                        <p><span style={{fontWeight: 'bolder'}}>Overview:</span> {articlesList.overview}</p>
                        <p><span style={{fontWeight: 'bolder'}}>Ratings:</span> {articlesList.note} ({articlesList.nbVoters})</p>
                        <p><span style={{fontWeight: 'bolder'}}>Released on:</span> {articlesList.releaseDate}</p>
                    </div>
                </div>
                <div className={styles.smDisplaySeasons}>
                    {seasons}
                </div>
            </div>}
        </main>:
        <div className={styles.main}>Loading...</div>}

        <Footer />
    </>
  )
}