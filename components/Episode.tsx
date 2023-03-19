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

export default function Episode() {
    const router = useRouter();
    const id = router.query.id;


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
          data.list.map((el:{id:string}) => {
            if(el.id === router.query.id){
                setArticlesList(el);
                setSerie(el.links);
                setIsLoaded(true);
                //console.log('bjncrd => ', el.links['S1'])

                // setEpisodes(Object.keys(el.links[`S${String(1)}`]).map((e, j) => {
                //     //console.log('episode => ', String(Number(j) + 1))
                //     let episode = 'episode ' + String(Number(j) + 1);
                //     return (<div key={j}>
                //         {episode}
                //     </div>)
                // }));

                // const handleEpisodes = (season) => {
                //     // Object.keys(serie).map((el, i) => { 
                //     //     if(el !== "__v"){
                //     console.log('test2 => ', serie);
                //     setEpisodes(Object.keys(serie[season]).map((e, j) => {
                //         console.log('episode => ', String(Number(j) + 1))
                //         let episode = 'episode ' + String(Number(j) + 1);
                //         return (<div key={j}>
                //             {episode}
                //         </div>)
                //     }))
                //     //     }
                //     // });
                // }

                setEpisodes(router.query.episodeUrl);
                // setSeasons(Object.keys(el.links).map((e, i) => {
                //     let url = el.frenchTitle.replaceAll(' ','-').replaceAll(':','').toLowerCase() + '-' + el.id;
                //     let season = 'season ' + String(Number(i)+1);
                //     console.log(String(Number(i)+1));
                //     if(e !== "__v"){
                //         return (//<Link key={i} href={{pathname:'/[series]/[seasons]/[episodes]/[episode]', query: {id: el.id, season: router.query.season, episode: String(Number(i)+1)}}} as={`/${el.id}/${router.query.season}/${String(Number(i)+1)}/${String(Number(i)+1)}`}> 
                //             <div key={i}>
                //                 {season}
                //             </div>)
                //         //</Link>)
                //     }
                // })
                setSeasons(`S${router.query.season}`);

                console.log('zidndznkdz => ', articlesList)
            }
          });

        });
      },[router.query.id]);
    


    
    // const handleEpisodes = (season) => {
    //     // Object.keys(serie).map((el, i) => { 
    //     //     if(el !== "__v"){
    //     console.log('test2 => ', serie);
    //     setEpisodes(Object.keys(serie[season]).map((e, j) => {
    //         console.log('episode => ', String(Number(j) + 1))
    //         let episode = 'episode ' + String(Number(j) + 1);
    //         return (<div key={j}>
    //             {episode}
    //         </div>)
    //     }))
    //     //     }
    //     // });
    // }
    // console.log('dzbdbzjdzjdzjbd => ', router.query)
    // console.log('xrctvgbhgcf => ', articlesList.links[`S${router.query.season}`]);
    // console.log('savghbsaubjsa => ', router.query.episodeUrl);
    // console.log('fzudzbjdzjbd => ', articlesList.links[seasons][Number(episodes)]);
    // console.log('season => ', seasons);
    // console.log('episode => ', episodes);
  return (
    <>
        <Head>
            <title>{articlesList.frenchTitle} | Season {router.query.season} Episode {router.query.episode}</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icon.png" />
        </Head>

        <Header />

        <main className={styles.main}>
            {isLoaded?
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
                <div className={styles.stream}>
                    <div className={styles.icons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.languageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.languageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.languageIcon} onClick={() => setLink(articlesList.links[seasons][Number(episodes)].vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.chooseLink}>Please choose the version to display</div>:
                    <div className={styles.backStream}>
                        <iframe src={link} style={{borderWidth: 0}} width={800} height={450} allowFullScreen></iframe>
                    </div>}
                </div>
            </div>:
            <div className={styles.container}>Loading...</div>}

        </main>

        <Footer />
    </>
  )
}