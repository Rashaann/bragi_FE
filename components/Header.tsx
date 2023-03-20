import React from 'react';
import Link from 'next/link';

import styles from '../styles/Header.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import LiveTvIcon from '@mui/icons-material/LiveTv';

export default function Header() {
  const matches = useMediaQuery('(min-width:904px)');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.body}>
        <Link href="/"><img src="https://res.cloudinary.com/dldeqai4u/image/upload/v1678994822/bragi/bragi_red_puuuys.png" height={60} /></Link>

        {matches?
        <div className={styles.container}>
            <Link href="/movies" className={styles.link}>Movies</Link>
            <Link href="/series" className={styles.link}>Series</Link>
            <Link href="/tv" style={{textDecoration:'none'}}>TV</Link>
            <input className={styles.input} />
        </div>:
        <div className={styles.smContainer}>
          <Tooltip title="Menu">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MenuIcon sx={{ width: 32, height: 32, color: 'red', '&:hover': '5px -5px 5px rgb(181,37,27)' }} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(2px 2px 2px rgba(1,1,1,1))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            
            <Link href="/movies" className={styles.link}>
              <MenuItem>
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                Movies
              </MenuItem>
            </Link>


            <Link href="/series" className={styles.link}>
              <MenuItem>
                <ListItemIcon>
                  <SlideshowIcon />
                </ListItemIcon>
                Series
              </MenuItem>
            </Link>

            <Link href="/tv" style={{textDecoration:'none'}}>
              <MenuItem>
                <ListItemIcon>
                  <LiveTvIcon />
                </ListItemIcon>
                TV
              </MenuItem>
            </Link>

            <Divider />

            <MenuItem>
              <input placeholder='Search' className={styles.smInput} />
            </MenuItem>

          </Menu>
        </div>}
    </div>
  )
}

