import React, { useEffect, useState } from 'react';

import Head from 'next/head';

// printed-books/:book-id
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

import styles from '../styles/Movie.module.css';
import { useSelector } from 'react-redux';

import { RootState } from '@/pages/_app';

export default function Movie() {
    const { query } = useRouter();
    
    const [articlesList, setArticlesList]=useState<any>({});
    const [showIt, setShowIt] = useState<boolean>(false);
    
    const movies = useSelector((state: RootState) => state.bragi.value.movies);

    useEffect(() => {
        let movieTitle = String(query['movie']).replaceAll('-', ' ').slice(0, Number(String(query['movie']).length)-8);

        const regex = new RegExp(String(String(query['movie']).replaceAll('-', ' ').slice(0, Number(String(query['movie']).length)-8)), 'i');
        // console.log('movieTitle => ', String(query['movie']).replaceAll('-', ' ').slice(0, Number(String(query['movie']).length)-8))


        movies.map((el:{frenchTitle: string}) => {
            // console.log('regex => ', regex);
            // console.log('title => ',el.frenchTitle);
            // console.log('TEST 1 => ', regex.test(el.frenchTitle));
            if (regex.test(el.frenchTitle.replace(':', ''))){
                setArticlesList(el);
            }
        });
    },[]);

    // console.log('ARTICLESLIST => ',articlesList);

  return (
    <>
        <Head>
            <title>{articlesList.frenchTitle}</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icon.png" />
        </Head>

        <Header />

        <main className={styles.main}>
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
                    <button onClick={() => setShowIt(!showIt)}>Click Me</button>
                    {showIt && <iframe src={articlesList.link.vf[0]} width={640} height={360} allowFullScreen></iframe>}
                </div>
            </div>
        </main>

        <Footer />
    </>
  )
}