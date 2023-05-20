import Link from 'next/link';
import React, { useState } from 'react';

import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addUserToStore } from '../reducers/bragi';

import Router from "next/router";


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import useMediaQuery from '@mui/material/useMediaQuery';


import styles from '../styles/ModalConnection.module.css';



const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid white',
    backgroundColor: 'black',
    boxShadow: 24,
    p: 4,

    borderRadius: 5,
  };


const smStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    height: '60vh',
    bgcolor: 'background.paper',
    border: '2px solid white',
    backgroundColor: 'black',
    boxShadow: 24,
    p: 4,

    borderRadius: 5,
  };



export default function ModalConnection(props: {
    isConnectionModal: boolean; setIsConnectionModal: (arg0: boolean) => void; 
}) {


    const matches = useMediaQuery('(min-width:904px)');
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
    <Modal
        open={props.isConnectionModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        {matches?
        <Box sx={style}>
            <div className={styles.logo}><img src='https://res.cloudinary.com/dldeqai4u/image/upload/v1678994822/bragi/bragi_red_puuuys.png' width={100} height={50} style={{cursor: 'pointer'}} onClick={() => Router.push('/')}/></div>
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
        </Box>:
        <Box sx={smStyle}>
            <div className={styles.logo}><img src='https://res.cloudinary.com/dldeqai4u/image/upload/v1678994822/bragi/bragi_red_puuuys.png' width={100} height={50} style={{cursor: 'pointer'}} onClick={() => Router.push('/')}/></div>
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
        </Box>}
    </Modal>
  )
}