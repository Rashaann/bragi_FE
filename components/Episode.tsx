import React, { useEffect, useState } from 'react';

import Head from 'next/head';

// printed-books/:book-id
import { useRouter } from 'next/router';
import Router from 'next/router';
import Header from './Header';
import Footer from './Footer';

import styles from '../styles/Movie.module.css';
import { useSelector } from 'react-redux';

import { RootState } from '@/pages/_app';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



import useMediaQuery from '@mui/material/useMediaQuery';
import ModalConnection from './ModalConnection';


export default function Episode() {
    const router = useRouter();
    const id = router.query.id;

    const matches = useMediaQuery('(min-width:904px)');

    const [articlesList, setArticlesList]=useState<any>({});
    const [showIt, setShowIt] = useState<boolean>(false);
    const [link, setLink] = useState<string>('');
    

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [serie, setSerie] = useState<any>();
    const [seasons, setSeasons] = useState<any>();
    const [episodes, setEpisodes] = useState<any>();

    const [selectedSeason, setSelectedSeason] = useState<string>('');
    const [selectedEpisode, setSelectedEpisode] = useState<string>('');
    const [displaySeasons, setDisplaySeasons] = useState<any>(null);
    const [displayEpisodes, setDisplayEpisodes] = useState<any>(null);

    const [availablePlayers, setAvailablePlayers] = useState<string>('');

    const [isConnectionModal, setIsConnectionModal] = useState<boolean>(false);

    const user = useSelector((state: any)=> state.bragi.value.user);
    

    useEffect(() => {
        if(JSON.stringify(user) === '{}'){
            setIsConnectionModal(true);
        }
        
        fetch("https://bragi-be.vercel.app/series/all")
        .then(response => response.json())
        .then(data => {
          data.list.map((el:{id:string, links:any, frenchTitle:string}) => {
            if(el.id === router.query.series){
                setArticlesList(el);
                setSerie(el.links);
                setIsLoaded(true);
                //console.log('bjncrd => ', el.links['S1'])

                setSeasons(`S${router.query.seasons}`);
                setEpisodes(router.query.episodes);
                
                // console.log("selectedSeason => ", selectedSeason);
                const players = [];
                if(el.links[0][`S${router.query.seasons}`][Number(router.query.episodes)-1].vf !== ''){
                    players.push('vf');
                }
                if(el.links[0][`S${router.query.seasons}`][Number(router.query.episodes)-1].vostfr !== ''){
                    players.push('vostfr');
                }
                if(el.links[0][`S${router.query.seasons}`][Number(router.query.episodes)-1].vo !== ''){
                    players.push('vo');
                }
                setAvailablePlayers(players.join(', '));
            }
        });
    });

    },[router.query]);
    

    const [anchorElSeason, setAnchorElSeason] = React.useState<null | HTMLElement>(null);
    const openSeason = Boolean(anchorElSeason);

    const [anchorElEpisode, setAnchorElEpisode] = React.useState<null | HTMLElement>(null);
    const openEpisode = Boolean(anchorElEpisode);

    
    const handleClickSeason = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElSeason(event.currentTarget);
    };


    const handleCloseSeason = () => {
      setAnchorElSeason(null);
    };


    const handleClickEpisode = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElEpisode(event.currentTarget);
      };
  
  
      const handleCloseEpisode = () => {
        setAnchorElEpisode(null);
      };





    const selectSeason = (index:number) => {
        setSelectedSeason(`S${index+1}`);
        handleCloseSeason();
    }

    const selectEpisode = (index:number) => {
        setSelectedEpisode(`${index+1}`);
        handleCloseEpisode();
    }

    

    

    let dispSeasons:any= [];
    let dispEpisodes:any= [];
    // const [showBtn, setShowBtn] = useState<boolean>(false);
    if(JSON.stringify(articlesList) !== JSON.stringify({})){
        let seasonsList = Object.keys(articlesList.links[0]).filter(e => e[0] === 'S');
        seasonsList.map((e,i: React.Key) => {
            if(e!== '__v'){
                dispSeasons.push(<MenuItem key={i} onClick={() => selectSeason(Number(i))}>Season {Number(i)+1}</MenuItem>);
            }
        })
        
        if(JSON.stringify(displaySeasons) !== JSON.stringify([])){
            articlesList?.links[0][selectedSeason]?.map((e: any,i: React.Key) => {
                dispEpisodes.push(<MenuItem key={i} onClick={() => selectEpisode(Number(i))}>Episode {Number(i)+1}</MenuItem>);
            });
            // setShowBtn(true);
        }
        // console.log(selectedEpisode)
    }




    

    const handleChangeEpisode = (newEp:string) => {
        Router.push(newEp);
        setLink('');
    }
    




  return (
    <>
        <Head>
            <title>{articlesList.frenchTitle} | Season {router.query.seasons} Episode {router.query.episodes}</title>
            <meta name="description" content="Free streaming website" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="https://res.cloudinary.com/dldeqai4u/image/upload/v1679305932/bragi/icon_izqe4d.png" />
        </Head>

        {isConnectionModal && <ModalConnection setIsConnectionModal={setIsConnectionModal} isConnectionModal={isConnectionModal} />}
        <Header isConnectionModal={isConnectionModal} setIsConnectionModal={setIsConnectionModal} />

        {isLoaded?
        <main className={styles.main}>
            {matches?
            <div className={styles.container}>
                <div className={styles.infos}>
                    <div className={styles.leftPart}>
                        <img src={articlesList.poster} width={250} />
                    </div>
                    <div className={styles.rightPart}>
                        <h1>{articlesList.frenchTitle} Season {router.query.seasons} Episode {router.query.episodes}</h1>
                        <p>Overview: {articlesList.overview}</p>
                        <p>Ratings: {articlesList.note} ({articlesList.nbVoters})</p>
                        <p>Released on: {articlesList.releaseDate}</p>
                        
                        <p>Available language players : <span style={{fontWeight:'bolder'}}> {availablePlayers}</span></p>
                    </div>
                </div>
                <div className={styles.stream}>
                    <div className={styles.nearBtns}>
                        {Number(router.query.episodes)===1?
                        <button className={styles.notAllowedBtns} disabled={Number(router.query.episodes)===1}>Previous</button>:
                        // <Link href={{pathname:'/[series]/[seasons]/[episodes]/episode', query: {id: articlesList.id, season: router.query.seasons, episode: Number(router.query.episodes)-1}}} as={`/${articlesList.id}/${router.query.seasons}/${Number(router.query.episodes)-1}/episode`}>
                        //     <button className={styles.prevNextBtns} disabled={Number(router.query.episodes)-1===articlesList.links[0][`S${router.query.seasons}`].length}>Previous</button>
                        // </Link>
                        <button className={styles.prevNextBtns} onClick={() => handleChangeEpisode(`/${articlesList.id}/${router.query.seasons}/${Number(router.query.episodes)-1}/episode`)} disabled={Number(router.query.episodes)-1===articlesList.links[0][`S${router.query.seasons}`].length}>Previous</button>}

                        {Number(router.query.episodes)===articlesList.links[0][`S${router.query.seasons}`].length?
                        <button className={styles.notAllowedBtns} disabled={Number(router.query.episodes)===articlesList.links[0][`S${router.query.seasons}`].length}>Next</button>:
                        // <Link href={{pathname:'/[series]/[seasons]/[episodes]/episode', query: {id: articlesList.id, season: router.query.seasons, episode: Number(router.query.episodes)+1}}} as={`/${articlesList.id}/${router.query.seasons}/${Number(router.query.episodes)+1}/episode`}>
                        //     <button className={styles.prevNextBtns} disabled={Number(router.query.episodes)===articlesList.links[0][`S${router.query.seasons}`].length}>Next</button>
                        // </Link>
                        <button className={styles.prevNextBtns} onClick={() => handleChangeEpisode(`/${articlesList.id}/${router.query.seasons}/${Number(router.query.episodes)+1}/episode`)} disabled={Number(router.query.episodes)===articlesList.links[0][`S${router.query.seasons}`].length}>Next</button>}                        
                    </div>
                    <div className={styles.icons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.languageIcon} onClick={() => setLink(articlesList.links[0][seasons][Number(episodes)-1].vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.languageIcon} onClick={() => setLink(articlesList.links[0][seasons][Number(episodes)-1].vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.languageIcon} onClick={() => setLink(articlesList.links[0][seasons][Number(episodes)-1].vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.chooseLink}>Please choose the version to display</div>:
                    <div className={styles.backStream}>
                        {/* <iframe src={link} style={{borderWidth: 0, width: '60vw', height: '80vh'}} allowFullScreen></iframe> */}
                        {/* <iframe src="https://filedn.eu/lYGn2UnA3LOHQ5b3d2PfgxL/xmen_vostfr.mp4" style={{borderWidth: 0, width: '60vw', height: '80vh'}} allowFullScreen></iframe> */}
                        <video
                            id="my-video"
                            controls
                            preload="auto"
                            width="640"
                            height="264"
                            data-setup="{}"
                            className={styles.chooseLink}
                            onPlay={() => console.log('PLAYED!')}
                            onEnded={() => console.log('VIDEO FINISHED!')}
                        >
                            <source src={link} type="video/mp4" />
                        </video>
                    </div>}
                    <div className={styles.specificEpisode}>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={openSeason ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openSeason ? 'true' : undefined}
                                onClick={handleClickSeason}
                                style={{color: 'black'}}
                            >
                                Season
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElSeason}
                                open={openSeason}
                                onClose={handleCloseSeason}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                {dispSeasons}
                            </Menu>
                        </div>
                        <p>{selectedSeason[1]}</p>


                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={openEpisode ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openEpisode ? 'true' : undefined}
                                onClick={handleClickEpisode}
                                style={{color: 'black'}}
                            >
                                Episode
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElEpisode}
                                open={openEpisode}
                                onClose={handleCloseEpisode}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                {dispEpisodes}
                            </Menu>
                        </div>
                        <p>{selectedEpisode}</p>
                        <div>
                            {selectedEpisode != '' ?
                            <Link href={{pathname:'/[series]/[seasons]/[episodes]/episode', query: {id: articlesList.id, season: selectedSeason.slice(1), episode: selectedEpisode}}} as={`/${articlesList.id}/${selectedSeason.slice(1)}/${selectedEpisode}/episode`}>
                                <button className={styles.prevNextBtns}>Go</button>
                            </Link>:
                            <div></div>}
                        </div>
                    </div>
                </div>
            </div>:
            <div className={styles.smContainer}>
                <div className={styles.smInfos}>
                    <div className={styles.smLeftPart}>
                        <h1>{articlesList.frenchTitle} Season {router.query.seasons} Episode {router.query.episodes}</h1>
                        <img src={articlesList.poster} width={250} />
                    </div>
                    <div className={styles.smRightPart}>
                        <p>Overview: {articlesList.overview}</p>
                        <p>Ratings: {articlesList.note} ({articlesList.nbVoters})</p>
                        <p>Released on: {articlesList.releaseDate}</p>

                        <p>Available language players : <span style={{fontWeight:'bolder'}}> {availablePlayers}</span></p>
                    </div>
                </div>
                <div className={styles.smStream}>
                    <div className={styles.smNearBtns}>
                    {Number(router.query.episodes)===1?
                        <button className={styles.smNotAllowedBtns} disabled={Number(router.query.episodes)===1}>Previous</button>:
                        // <Link href={{pathname:'/[series]/[seasons]/[episodes]/episode', query: {id: articlesList.id, season: router.query.seasons, episode: Number(router.query.episodes)-1}}} as={`/${articlesList.id}/${router.query.seasons}/${Number(router.query.episodes)-1}/episode`}>
                        //     <button className={styles.smPrevNextBtns} disabled={Number(router.query.episodes)-1===articlesList.links[0][`S${router.query.seasons}`].length}>Previous</button>
                        // </Link>
                        <button className={styles.prevNextBtns} onClick={() => handleChangeEpisode(`/${articlesList.id}/${router.query.seasons}/${Number(router.query.episodes)-1}/episode`)} disabled={Number(router.query.episodes)-1===articlesList.links[0][`S${router.query.seasons}`].length}>Previous</button>}

                        {Number(router.query.episodes)===articlesList.links[0][`S${router.query.seasons}`].length?
                        <button className={styles.smNotAllowedBtns} disabled={Number(router.query.episodes)===articlesList.links[0][`S${router.query.seasons}`].length}>Next</button>:
                        // <Link href={{pathname:'/[series]/[seasons]/[episodes]/episode', query: {id: articlesList.id, season: router.query.seasons, episode: Number(router.query.episodes)+1}}} as={`/${articlesList.id}/${router.query.seasons}/${Number(router.query.episodes)+1}/episode`}>
                        //     <button className={styles.smPrevNextBtns} disabled={Number(router.query.episodes)===articlesList.links[0][`S${router.query.seasons}`].length}>Next</button>
                        // </Link>
                        <button className={styles.prevNextBtns} onClick={() => handleChangeEpisode(`/${articlesList.id}/${router.query.seasons}/${Number(router.query.episodes)+1}/episode`)} disabled={Number(router.query.episodes)===articlesList.links[0][`S${router.query.seasons}`].length}>Next</button>}
                    </div>
                    <div className={styles.smIcons}>
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/french_flag_xzuxke.png" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.links[0][seasons][Number(episodes)-1].vf)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/vostfr_tzzr4h.jpg" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.links[0][seasons][Number(episodes)-1].vostfr)} />
                        <img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1679006146/bragi/english_flag_mlp7wy.png" className={styles.smLanguageIcon} onClick={() => setLink(articlesList.links[0][seasons][Number(episodes)-1].vo)} />
                    </div>
                    {(link==='')||(link===undefined)?
                    <div className={styles.smChooseLink}>Please choose the version to display</div>:
                    <div className={styles.smBackStream}>
                        {/* <iframe src={link} style={{borderWidth: 0, width: '80vw', height: '50vh'}} allowFullScreen></iframe> */}
                        <video
                            id="my-video"
                            controls
                            preload="auto"
                            width="640"
                            height="264"
                            data-setup="{}"
                            className={styles.smChooseLink}
                        >
                            <source src={link} type="video/mp4" />
                        </video>
                    </div>}

                    <div className={styles.specificEpisode}>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={openSeason ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openSeason ? 'true' : undefined}
                                onClick={handleClickSeason}
                                style={{color: 'black'}}
                            >
                                Season
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElSeason}
                                open={openSeason}
                                onClose={handleCloseSeason}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                {dispSeasons}
                            </Menu>
                        </div>
                        <p>{selectedSeason[1]}</p>


                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={openEpisode ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openEpisode ? 'true' : undefined}
                                onClick={handleClickEpisode}
                                style={{color: 'black'}}
                            >
                                Episode
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElEpisode}
                                open={openEpisode}
                                onClose={handleCloseEpisode}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                {dispEpisodes}
                            </Menu>
                        </div>
                        <p>{selectedEpisode}</p>
                        <div>
                            {selectedEpisode != '' ?
                            <Link href={{pathname:'/[series]/[seasons]/[episodes]/episode', query: {id: articlesList.id, season: selectedSeason.slice(1), episode: selectedEpisode}}} as={`/${articlesList.id}/${selectedSeason.slice(1)}/${selectedEpisode}/episode`}>
                                <button className={styles.prevNextBtns}>Go</button>
                            </Link>:
                            <div></div>}
                        </div>
                    </div>
                </div>
            </div>}
        </main>:
        <main className={styles.main}>Loading...</main>}

        <Footer />
    </>
  )
}