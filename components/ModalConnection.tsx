import Link from 'next/link';
import React, { useState } from 'react';

import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addUserToStore } from '../reducers/bragi';

import Router from "next/router";

import styles from '../styles/ModalConnection.module.css';

export default function ModalConnection(props: { setIsConnectionModal: (arg0: boolean) => void; }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleConnection = () => {
        fetch('https://bragi-be.vercel.app/users/signin', {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
                email: email,
                password: password,
            }),
        }).then(response => response.json())
        .then(data => {
            if(data.result){
                setEmail('');
                setPassword('');
                dispatch(addUserToStore(data.user));
                // navigate('/home');
                
                props.setIsConnectionModal(false);
                Router.push("/profile");
                console.log('USER SUCCESSFULLY LOGGED IN.');
            } else {
                console.log('ERROR: ACCOUNT NOT FOUND.');
            }
        })
    }

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modalSubContainer}>
            <div className={styles.closePage} onClick={() => props.setIsConnectionModal(false)}><FaTimes/></div>
            <div className={styles.logo}><img src='https://res.cloudinary.com/dldeqai4u/image/upload/v1678994822/bragi/bragi_red_puuuys.png' width={100} height={50}/></div>
            <div className={styles.container}>
                <div>
                    <p className={styles.text}>EMAIL ADDRESS:</p>
                    <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} className={styles.input}/>
                </div>

                <div>
                    <p className={styles.text}>Password:</p>
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}  className={styles.input}/>
                </div>
            </div>

            <div className={styles.btnContainer}>
                <button
                    className={styles.btn}
                    onClick={() => handleConnection()}
                >
                    Sign in
                </button>
            </div>

            <div className={styles.footer}>
                <p style={{fontFamily:'Barlow Condensed', color:'gray', fontSize:20}}>Not yet registered?</p>
                <Link href='/signup' style={{textDecoration: 'none',}}><p style={{fontFamily:'Barlow Condensed', color:'white', fontSize:20, cursor:'pointer'}}>Sign up</p></Link>
            </div>
        </div>
      </div>
  )
}