import React from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMoviesToStore, addSeriesToStore, addChannelsToStore } from '@/reducers/bragi';

import useMediaQuery from '@mui/material/useMediaQuery';
import ModalConnection from './ModalConnection';

export default function DMCA() {

    const [isConnectionModal, setIsConnectionModal] = useState<boolean>(false);


  return (
    <>
        <Head>
            <title>Bragi | DIGITAL MILLENNIUM COPYRIGHT ACT (DMCA) NOTICE</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
            <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
        </Head>


        {isConnectionModal && <ModalConnection setIsConnectionModal={setIsConnectionModal} isConnectionModal={isConnectionModal} />}
        <Header isConnectionModal={isConnectionModal} setIsConnectionModal={setIsConnectionModal} />

        <main className={styles.main}>
            <h1 className={styles.title}>Informations DMCA</h1>

            <h2 className={styles.subTitle}>DIGITAL MILLENNIUM COPYRIGHT ACT (DMCA) NOTICE</h2>
            
            <p className={styles.text}>We are in compliance with 17 U.S.C. $ 512 and the Digital Millennium Copyright Act ("DMCA"). It is our policy to respond to any infringement notices and take appropriate actions under the Digital Millennium Copyright Act("DMCA") and other applicable intellectual property laws.</p>


            <p className={styles.text}>If your copyrighted material has been posted on our website or if hyperlinks to your copyrighted material are returned through our search engine and you want this material removed, you must provide a written communication that details the information listed in the following section. Please be aware that you will be liable for damages (including costs and attorneys' fees) if you misrepresent information listed on our site that is infringing on your copyrights. We suggest that you first contact an attorney for legal assistance on this matter.</p>

            <p className={styles.text}>The following elements must be included in your copyright infringement claim:
                <ul>
                    <li>Provide evidence of the authorized person to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                    <li>Provide sufficient contact information so that we may contact you. You must also include a valid email address.</li>
                    <li>You must identify in sufficient detail the copyrighted work claimed to have been infringed and including at least one search term under which the material appears in our search results.</li>
                    <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                </ul>
            </p>


            <p className={styles.text}>Must be signed by the authorized person to act on behalf of the owner of an exclusive right that is allegedly being infringed.</p>

            <p className={styles.text}>Send the infringement notice via the contact form with "DMCA Complaint" as your subject line otherwise we won't be able to process your complaint.</p>


            <p className={styles.text}>Please allow up to a week for an email response. Note that emailing your complaint to other parties such as our Internet Service Provider will not expedite your request and may result in a delayed response due to the complaint not being filed properly.</p>
        </main>

        <Footer />
    </>
  )
}