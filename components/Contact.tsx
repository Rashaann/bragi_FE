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
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

import useMediaQuery from '@mui/material/useMediaQuery';

export default function Contact() {

  const matches = useMediaQuery('(min-width:904px)');

  const [email, setEmail] = useState<string>('');
  const [object, setObject] = useState<string>('');
  const [request, setRequest] = useState<string>('');

  const REACT_APP_SERVICE_ID = "service_yikey59";
  const REACT_APP_TEMPLATE_ID = "template_nn60cjz";
  const REACT_APP_PUBLIC_KEY = "oZdqP3qstaX__w7k-";


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(email === '' || request === ''){
      Swal.fire({
        icon: 'error',
        title: 'An error occured. Please make sure to properly fill the email address and request inputs.',
      })
    } else {
      emailjs.sendForm(REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, e.target, REACT_APP_PUBLIC_KEY)
        .then((result) => {
          //console.log(result.text);
          Swal.fire({
            icon: 'success',
            title: 'Request sent successfully.'
          });
          setEmail('');
          setObject('');
          setRequest('');
        }, (error) => {
          //console.log(error.text);
          Swal.fire({
            icon: 'error',
            title: 'An error occured. Please make sure to properly fill the email address and request inputs.',
            text: error.text,
          })
        });
        e.target.reset();
    }
  }

  return (
    <>
        <Head>
            <title>Bragi | Contact page</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
            <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
        </Head>


        <Header />

        <main className={styles.main}>
          <div>
            <p className={styles.subTitle}>An issue? A bug? A request?</p>
            <p className={styles.subTitle}>Please fill this contact form to reach us! 💻</p>
          </div>
          
          {matches?
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <label className={styles.label}>Your email address:
              <input className={styles.inputs} type="text" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            </label>
            <label className={styles.label}>Object:
              <input className={styles.inputs} type="text" name='object' placeholder='Object' onChange={(e) => setObject(e.target.value)} value={object}/>
            </label>
            <label className={styles.label}>Mail:
              <textarea className={styles.mail} placeholder='Write down your request' name='request' onChange={(e) => setRequest(e.target.value)} value={request}></textarea>
            </label>
            <button className={styles.submitBtn} type="submit">Submit</button>  
          </form>:
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <label className={styles.label}>Your email address:
              <input className={styles.smInputs} type="text" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
            </label>
            <label className={styles.label}>Object:
              <input className={styles.smInputs} type="text" name='object' placeholder='Object' onChange={(e) => setObject(e.target.value)} value={object}/>
            </label>
            <label className={styles.label}>Mail:
              <textarea className={styles.smMail} placeholder='Write down your request' name='request' onChange={(e) => setRequest(e.target.value)} value={request}></textarea>
            </label>
            <button className={styles.smSubmitBtn} type="submit">Submit</button>  
          </form>}
          
        </main>

        <Footer />
    </>
  )
}