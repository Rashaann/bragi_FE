import React, { useEffect, useState } from 'react'

import Head from 'next/head';

// printed-books/:book-id
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

import styles from '../styles/Movie.module.css';

export default function Movie() {
    const { query } = useRouter();
    let movieTitle = String(query['url']).replaceAll('-', ' ').slice(0, Number(String(query['url']).length)-8);

    console.log('movieTitle => ', movieTitle)
    const regex = new RegExp(String(String(query['url']).replaceAll('-', ' ').slice(0, Number(String(query['url']).length)-8)));
    const [articlesList, setArticlesList]=useState<any>({});
    
    useEffect(() => {
        fetch("http://192.168.0.35:3000/movies/all")
        .then(response => response.json())
        .then(data => {
            data.list.map((el:{frenchTitle: string}) => {
                if(regex.test(el.frenchTitle)){
                    //LOCAL STORAGE REPLACING USEEFFECT FOR AWAIT REMOVAL
                    setArticlesList(el);
                }
            })
    });
    },[]);

    console.log(articlesList.link.vf[0]);

  return (
    <>
        <Head>
            <title>Bragi | Free streaming website</title>
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
                    <iframe src={articlesList.link.vf[0]} width={640} height={360} allowFullScreen></iframe>
                </div>
            </div>
        </main>

        <Footer />
    </>
  )
}