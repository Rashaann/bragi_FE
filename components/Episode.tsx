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

export default function Episode() {
    const router = useRouter();
    const id = router.query.id;

    const matches = useMediaQuery('(min-width:904px)');

    const [articlesList, setArticlesList]=useState<any>({});
    const [showIt, setShowIt] = useState<boolean>(false);
    const [link, setLink] = useState<string>('');


    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [serie, setSerie] = useState<any>();
    const [seasons, setSeasons] = useState<any>();
    const [episodes, setEpisodes] = useState<any>();
    

    useEffect(() => {
        fetch("https://bragi-be.vercel.app/series/all")
        .then(response => response.json())
        .then(data => {
            //console.log('test => ', router.query)
          data.list.map((el:{id:string, links:object, frenchTitle:string}) => {
            if(el.id === router.query.series){
                setArticlesList(el);
                setSerie(el.links);
                setIsLoaded(true);
                //console.log('bjncrd => ', el.links['S1'])

                setSeasons(`S${router.query.seasons}`);
                setEpisodes(router.query.episodes);

                //console.log('zidndznkdz => ', articlesList)
            }
          });

        });
    },[router.query.series]);
    

    // console.log('dzbdbzjdzjdzjbd => ', router.query)
    // console.log('xrctvgbhgcf => ', articlesList.links[`S${router.query.season}`]);
    // console.log('savghbsaubjsa => ', router.query.episodeUrl);
    //console.log('fzudzbjdzjbd => ', articlesList.links[seasons]);
    // console.log('season => ', seasons);[Number(episodes)]
    //console.log('episode => ', episodes);
  return (
    <>
        <Head>
            <title>{articlesList.frenchTitle} | Season {router.query.season} Episode {router.query.episode}</title>
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
                        <h1>{articlesList.frenchTitle}</h1>
                        <p>Overview: {articlesList.overview}</p>
                        <p>Ratings: {articlesList.note} ({articlesList.nbVoters})</p>
                        <p>Released on: {articlesList.releaseDate}</p>
                    </div>
                </div>
                <div className={styles.stream}>
                    <div className={styles.icons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.languageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.languageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.languageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.chooseLink}>Please choose the version to display</div>:
                    <div className={styles.backStream}>
                        <iframe src={link} style={{borderWidth: 0, width: '60vw', height: '80vh'}} allowFullScreen></iframe>
                    </div>}
                </div>
            </div>:
            <div className={styles.smContainer}>
                <div className={styles.smInfos}>
                    <div className={styles.smLeftPart}>
                        <h1>{articlesList.frenchTitle}</h1>
                        <img src={articlesList.poster} width={250} />
                    </div>
                    <div className={styles.smRightPart}>
                        <p>Overview: {articlesList.overview}</p>
                        <p>Ratings: {articlesList.note} ({articlesList.nbVoters})</p>
                        <p>Released on: {articlesList.releaseDate}</p>
                    </div>
                </div>
                <div className={styles.smStream}>
                    <div className={styles.smIcons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.smChooseLink}>Please choose the version to display</div>:
                    <div className={styles.smBackStream}>
                        <iframe src={link} style={{borderWidth: 0, width: '80vw', height: '50vh'}} allowFullScreen></iframe>
                    </div>}
                </div>
            </div>}
        </main>:
        <main className={styles.main}>Loading...</main>}

        <Footer />
    </>
  )
}