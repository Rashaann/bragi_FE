import React, { useEffect, useState } from 'react';

import Head from 'next/head';

// printed-books/:book-id
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

import styles from '../styles/Movie.module.css';
import { useSelector } from 'react-redux';

import { RootState } from '@/pages/_app';
import Link from 'next/link';

import useMediaQuery from '@mui/material/useMediaQuery';

export default function Season() {
    const router = useRouter();
    const id = router.query.id;

    const matches = useMediaQuery('(min-width:904px)');

    const [articlesList, setArticlesList]=useState<any>({});
    const [showIt, setShowIt] = useState<boolean>(false);


    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [serie, setSerie] = useState<any>();
    const [episodes, setEpisodes] = useState<any>();
    

    useEffect(() => {
        fetch("https://bragi-be.vercel.app/series/all")
        .then(response => response.json())
        .then(data => {
          console.log('test => ', router.query)
          data.list.map((el:{id:string, links:any, frenchTitle:string}) => {
            if(el.id === router.query.series){
                setArticlesList(el);
                setSerie(el.links);
                setIsLoaded(true);
                // console.log('bjncrd => ', el.links[0]['S1'])

                setEpisodes(Object.keys(el.links[0][`S${String(router.query.seasons)}`]).map((e, j) => {
                    //console.log('episode => ', String(Number(j) + 1))
                    let episode = 'episode ' + String(Number(j) + 1);
                    let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
                    return (<Link key={j} href={{pathname:'/[series]/[seasons]/[episodes]/episode', query: {id: el.id, url: url, season: router.query.season, episode: String(Number(j)+1), episodeUrl: j}}} as={`/${el.id}/${router.query.seasons}/${String(Number(j)+1)}/episode`} >
                        {matches?
                        <div className={styles.episodeContainer}>
                            <div className={styles.episodeContent}>
                                {episode}
                            </div>
                        </div>:
                        <div className={styles.smEpisodeContainer}>
                            <div className={styles.smEpisodeContent}>
                                {episode}
                            </div>
                        </div>}
                    </Link>)
                }));
            }
          });

        });
      },[router.query.series]);
    

    
    
  return (
    <>
        <Head>
            <title>{articlesList.frenchTitle} | Season {router.query.seasons}</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
        </Head>

        <Header />

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
                        <h1>{articlesList.frenchTitle} Season {router.query.seasons}</h1>
                        <p><span style={{fontWeight: 'bolder'}}>Overview:</span> {articlesList.overview}</p>
                        <p><span style={{fontWeight: 'bolder'}}>Ratings:</span> {articlesList.note} ({articlesList.nbVoters})</p>
                        <p><span style={{fontWeight: 'bolder'}}>Released on:</span> {articlesList.releaseDate}</p>
                    </div>
                </div>
                <div className={styles.displayEpisodes}>
                    {episodes}
                </div>
            </div>:
            <div className={styles.smContainer}>
                <div className={styles.smInfos}>
                    <div className={styles.smLeftPart}>
                        <h1>{articlesList.frenchTitle} Season {router.query.seasons}</h1>
                        <img src={articlesList.poster} width={250} />
                    </div>
                    <div className={styles.smRightPart}>
                        <p><span style={{fontWeight: 'bolder'}}>Overview:</span> {articlesList.overview}</p>
                        <p><span style={{fontWeight: 'bolder'}}>Ratings:</span> {articlesList.note} ({articlesList.nbVoters})</p>
                        <p><span style={{fontWeight: 'bolder'}}>Released on:</span> {articlesList.releaseDate}</p>
                    </div>
                </div>
                <div className={styles.smDisplayEpisodes}>
                    {episodes}
                </div>
            </div>}

        </main>:
        <div className={styles.main}>Loading...</div>}

        <Footer />
    </>
  )
}