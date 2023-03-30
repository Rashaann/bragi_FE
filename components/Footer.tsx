import Link from 'next/link';
import React, { useState } from 'react';

import styles from '../styles/Footer.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Footer() {
  const matches = useMediaQuery('(min-width:600px)');

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  return (
    <div className={styles.body}>
      {matches?
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.subContent}>
            <h1>Movies</h1>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'recent'}}} as={'/movies/category/recent'}>
              <p>Recently added</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'comedy'}}} as={'/movies/category/comedy'}>
              <p>Comedy</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'horror'}}} as={'/movies/category/horror'}>
              <p>Horror</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'drama'}}} as={'/movies/category/drama'}>
              <p>Drama</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'action'}}} as={'/movies/category/action'}>
              <p>Action</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'scifi'}}} as={'/movies/category/scifi'}>
              <p>Scifi</p>
            </Link>
            <Link href={{pathname:`/movies/category/[category]`, query: {id: 'animation'}}} as={'/movies/category/animation'}>
              <p>Animation</p>
            </Link>
          </div>
          <div className={styles.subContent}>
            <h1>Series</h1>
            <p>Recently added</p>
            <p>Comedy</p>
            <p>Horror</p>
            <p>Drama</p>
            <p>Action</p>
          </div>
          <div className={styles.subContent}>
            <h1>TV</h1>
            <p>Maroc 2M</p>
            <p>Al Aoula</p>
            <p>Al Maghribia</p>
            <p>MBC</p>
            <p>MBC 4</p>
          </div>
        </div>
        <div className={styles.signature}>
          <img src='https://res.cloudinary.com/dldeqai4u/image/upload/v1678994822/bragi/bragi_black_htjdmx.png' width={70} />
          <p>Made with 💚 by Zak<span className={styles.hiddenName}>stein</span></p>
        </div>
      </div>:
      <div className={styles.smContainer}>
        <div className={styles.smContent}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{backgroundColor: 'black', color: 'red'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='error' />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontFamily: 'Barlow Condensed', fontSize: 25 }}>
                Movies
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link href={{pathname:`/movies/category/[category]`, query: {id: 'recent'}}} as={'/movies/category/recent'}>
                <p>Recently added</p>
              </Link>
              <Link href={{pathname:`/movies/category/[category]`, query: {id: 'comedy'}}} as={'/movies/category/comedy'}>
                <p>Comedy</p>
              </Link>
              <Link href={{pathname:`/movies/category/[category]`, query: {id: 'horror'}}} as={'/movies/category/horror'}>
                <p>Horror</p>
              </Link>
              <Link href={{pathname:`/movies/category/[category]`, query: {id: 'drama'}}} as={'/movies/category/drama'}>
                <p>Drama</p>
              </Link>
              <Link href={{pathname:`/movies/category/[category]`, query: {id: 'action'}}} as={'/movies/category/action'}>
                <p>Action</p>
              </Link>
              <Link href={{pathname:`/movies/category/[category]`, query: {id: 'scifi'}}} as={'/movies/category/scifi'}>
                <p>Scifi</p>
              </Link>
              <Link href={{pathname:`/movies/category/[category]`, query: {id: 'animation'}}} as={'/movies/category/animation'}>
                <p>Animation</p>
              </Link>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{backgroundColor: 'black', color: 'red'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='error' />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontFamily: 'Barlow Condensed', fontSize: 25 }}>Series</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Recently added</p>
              <p>Comedy</p>
              <p>Horror</p>
              <p>Drama</p>
              <p>Action</p>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{backgroundColor: 'black', color: 'red'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='error' />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontFamily: 'Barlow Condensed', fontSize: 25 }}>
                TV
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>Maroc 2M</p>
              <p>Al Aoula</p>
              <p>Al Maghribia</p>
              <p>MBC</p>
              <p>MBC 4</p>
            </AccordionDetails>
          </Accordion>
        </div>

        
        <div className={styles.signature}>
          <img src='https://res.cloudinary.com/dldeqai4u/image/upload/v1678994822/bragi/bragi_black_htjdmx.png' width={70} />
          <p>Made with 💚 by Zak<span className={styles.hiddenName}>stein</span></p>
        </div>
      </div>}
        
      </div>
  )
  }

