import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMoviesToStore, addSeriesToStore, addChannelsToStore } from '@/reducers/bragi';

import useMediaQuery from '@mui/material/useMediaQuery';
import ModalConnection from './ModalConnection';

import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(
    process.env.REACT_APP_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);


export default function SignUp() {
    console.log('process.env.REACT_APP_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY => ',process.env.REACT_APP_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

  const [isConnectionModal, setIsConnectionModal] = useState<boolean>(false);

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPassword, setConfPassword] = useState<string>('');


  const matches = useMediaQuery('(min-width:904px)');

  const dispatch = useDispatch();




  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    } else if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
    
}, []);


  const handleSignUp = (test: any) => {
    console.log('TEST.');
  }

  return (
    <>
        <Head>
            <title>Bragi | Sign Up page</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
            <link href="https://vjs.zencdn.net/8.0.4/video-js.css" rel="stylesheet" />
            <script src="https://vjs.zencdn.net/8.0.4/video.min.js" defer></script>
        </Head>

        {isConnectionModal && <ModalConnection setIsConnectionModal={setIsConnectionModal} isConnectionModal={isConnectionModal} />}
        <Header isConnectionModal={isConnectionModal} setIsConnectionModal={setIsConnectionModal} />

        <main className={styles.main}>
            <h1 className={styles.title}>1. Fill in the form:</h1>
            {matches?
            <form className={styles.form} action="/payment/monthly" method="POST" onSubmit={(e) => handleSignUp(e)}>
                <label className={styles.label}>Firstname:
                    <input className={styles.inputs} type="text" placeholder='Firstname' onChange={(e) => setFirstname(e.target.value)} value={firstname}/>
                </label>
                <label className={styles.label}>Lastname:
                    <input className={styles.inputs} type="text" placeholder='Lastname' onChange={(e) => setLastname(e.target.value)} value={lastname}/>
                </label>
                <label className={styles.label}>Email address:
                    <input className={styles.inputs} type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                </label>
                <label className={styles.label}>Password:
                    <input className={styles.inputs} type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                </label>
                <label className={styles.label}>Confirm your password:
                    <input className={styles.inputs} type="password" placeholder='Confirmation of password' onChange={(e) => setConfPassword(e.target.value)} value={confPassword} />
                </label>
                <button className={styles.submitBtn} type="submit">Sign up</button>
                <button
                    className={styles.payBtn}
                    type="submit"
                    role="link"
                >
                    Payer
                </button> 
            </form>:
            <form className={styles.form} action="/payment/monthly" method="POST" onSubmit={(e) => handleSignUp(e)}>
                <label className={styles.label}>Firstname:
                    <input className={styles.inputs} type="text" placeholder='Firstname' onChange={(e) => setFirstname(e.target.value)} value={firstname}/>
                </label>
                <label className={styles.label}>Lastname:
                    <input className={styles.smInputs} type="text" placeholder='Lastname' onChange={(e) => setLastname(e.target.value)} value={lastname}/>
                </label>
                <label className={styles.label}>Email address:
                    <input className={styles.smInputs} type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                </label>
                <label className={styles.label}>Password:
                    <input className={styles.smInputs} type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                </label>
                <label className={styles.label}>Confirm your password:
                    <input className={styles.smInputs} type="password" placeholder='Confirmation of password' onChange={(e) => setConfPassword(e.target.value)} value={confPassword} />
                </label>
                <button className={styles.smSubmitBtn} type="submit">Submit</button>
                <button
                    className={styles.payBtn}
                    type="submit"
                    role="link"
                >
                    Payer
                </button>
            </form>}
            <h1 className={styles.title}>2. Choose one of the plans:</h1>

            <form>
                
            </form>

            
        </main>

        <Footer />
    </>
  )
}