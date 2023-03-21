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
  )

    
    

    useEffect(() => {
        fetch("https://bragi-be.vercel.app/movies/all")
        .then(response => response.json())
        .then(data => {
            // console.log('test => ', router.query)
          data.list.map((el:{id:string}) => {
              if(el.id === router.query.movie){
                setArticlesList(el);
                setIsDataLoaded(true);
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
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vf[0])} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vostfr[0])} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.languageIcon} onClick={() => setLink(articlesList.link.vo[0])} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.chooseLink}>Please choose the version to display</div>:
                    <div className={styles.backStream}>
                        <iframe id='test' src={link} style={{borderWidth: 0}} className={styles.test} width={800} height={450} allowFullScreen ></iframe>
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
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.link.vf[0])} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.link.vostfr[0])} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.link.vo[0])} />
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