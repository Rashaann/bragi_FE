import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { RootState } from '@/pages/_app';

import styles from '../styles/Search.module.css';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { dispMoviesResultsPerCat, dispTvShowsResultsPerCat } from '@/modules/dispResultsPerCat';
import { useMediaQuery } from '@mui/material';

export default function Search() {
    const matches = useMediaQuery('(min-width:904px)');
    
    
    const searchText = useSelector((state: RootState) => state.bragi.value.search);

    const [moviesList, setMoviesList] = useState<object[]>([]);
    const [tvShowsList, setTvShowsList] = useState<object[]>([]);

    useEffect(() => {
        fetch("https://bragi-be.vercel.app/movies/all")
        .then(response => response.json())
        .then(movies => {
          setMoviesList(movies.list);
        });

        fetch("https://bragi-be.vercel.app/series/all")
        .then(response => response.json())
        .then(tvShows => {
          setTvShowsList(tvShows.list);
        });
    },[]);

    let moviesResults = dispMoviesResultsPerCat(searchText, moviesList, matches);

    let seriesResults = dispTvShowsResultsPerCat(searchText, tvShowsList, matches);

    

  return (
    <>
        <Head>
            <title>Bragi | Results for {searchText}</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/icon.png" />
            <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
        </Head>

        <Header />

        <main className={styles.main}>
            <div className={styles.title}>Results for: {searchText}</div>
            <div className={styles.container}>
                <h1>Movies</h1>
                {moviesResults.length===0?
                <p style={{fontSize:25}}> ❌ No movies corresponding to the following search: "<span style={{fontWeight:'bolder'}}>{searchText}</span>" ❌</p>:
                <div style={{display: 'flex', overflowX: 'scroll', height: '500px',}}>
                    {moviesResults}
                </div>}
            </div>
            
            <div className={styles.container}>
                <h1>TV shows</h1>
                {seriesResults.length===0?
                <p style={{fontSize:25}}> ❌ No TV shows corresponding to the following search: "<span style={{fontWeight:'bolder'}}>{searchText}</span>" ❌</p>:
                <div style={{display: 'flex', overflowX: 'scroll', height: '500px',}}>
                    {seriesResults}
                </div>}
            </div>

            <div className={styles.container}>
                <h1>TV channels</h1>
            </div>
        </main>


        <Footer />
    </>
  )
}