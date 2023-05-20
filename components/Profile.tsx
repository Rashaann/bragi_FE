import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMoviesToStore, addSeriesToStore, addChannelsToStore } from '@/reducers/bragi';

import useMediaQuery from '@mui/material/useMediaQuery';
import ModalConnection from './ModalConnection';

function Profile() {

  const [isConnectionModal, setIsConnectionModal] = useState<boolean>(false);

  const user = useSelector((state: any)=> state.bragi.value.user);

  return (
    <>
        <Head>
            <title>Bragi | {user.firstname}'s profile page</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
            <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
        </Head>

        {isConnectionModal && <ModalConnection setIsConnectionModal={setIsConnectionModal} isConnectionModal={isConnectionModal} />}
        <Header isConnectionModal={isConnectionModal} setIsConnectionModal={setIsConnectionModal} />
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome home, {user.firstname}!</h1>

          <h3 className={styles.subTitle}>Unfinished movies</h3>
          <p className={styles.text}>none</p>
          <h3 className={styles.subTitle}>Unfinished shows</h3>
          <p className={styles.text}>none</p>
        </main>

        <Footer />
    </>
  )
}

export default Profile