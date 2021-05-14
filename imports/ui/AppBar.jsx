import React, { Fragment  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import { Logo } from './Logo';
import Avatar from '@material-ui/core/Avatar';
import GetAppIcon from '@material-ui/icons/GetApp';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  createAccount: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  mobileIcon: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },

  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {

  //get authenticated user or null from Meteor.user(), wrap in useTracker hook for it to be reactive. 
  const user = useTracker(() => Meteor.user());
  // const logout = () => Meteor.logout();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleSignUp = () => {
    setAnchorEl(null);
    console.log('signup');
  };
  const handleLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    Meteor.logout();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDownloadApp = () => {
    window.location.href = "https://production.sessionwire.platform.meteorapp.com/download";
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Avatar className={classes.avatar} src="https://robohash.org/tre"  />Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}><AccountBoxIcon />My account</MenuItem>
      <MenuItem onClick={handleMenuClose}><EmojiObjectsIcon />Dark Mode</MenuItem>
      <MenuItem onClick={handleLogout}><ExitToAppIcon />Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      
    >
      <MenuItem onClick={handleProfileMenuOpen} >
        <IconButton 
        size="small" 
        aria-label="show 4 new mails" 
        color="inherit"
        className={classes.mobileIcon}
        >
          <Avatar 
            alt="Remy Sharp" 
            variant= 'square'
            src="https://robohash.org/tre" 
            className={classes.avatar} />
        </IconButton >
        <p>Profile</p>
      </MenuItem>

      <MenuItem >
        <IconButton 
        size="small" 
        aria-label="x" 
        color="inherit"
        className={classes.mobileIcon}
        >
          <Badge badgeContent={0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

          
      <MenuItem onClick={handleDownloadApp}>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className={classes.mobileIcon}
        >
          
          <GetAppIcon />
        </IconButton>
        <p>Download App</p>
      </MenuItem>

      <MenuItem >
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          className={classes.mobileIcon}
        >
          <LiveHelpIcon />
        </IconButton>
        <p>Help</p>
      </MenuItem>
    </Menu>
  );

  return (<div>
    

        {user ? (
            // logged in Sppbar
            <Fragment>
              <div className={classes.grow}>
                <AppBar position="static">
                  <Toolbar>
                  <Logo />
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                      <IconButton aria-label="Notificaion" >
                        <Badge badgeContent={0} color="secondary">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>

                        <IconButton aria-label="Get App" onClick={handleDownloadApp} >
                        <Badge badgeContent={0} color="secondary">
                          <GetAppIcon />
                        </Badge>
                      </IconButton>
                      
                      <IconButton aria-label="LiveHelp">
                        <Badge badgeContent={0} color="secondary">
                          <LiveHelpIcon />
                        </Badge>
                      </IconButton>
                      
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                      >
                      <Avatar className={classes.avatar} src="https://robohash.org/tre"  />
                      </IconButton>
                    </div>

                    {/* mobile menu */}
                    <div className={classes.sectionMobile}>
                      <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        // color="inherit"
                      >
                        <MoreIcon />
                      </IconButton>
                    </div>
                  </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
              </div>              
            </Fragment>
            ) : (
            // logged out AppBar
            <Fragment>
              <div className={classes.grow}>
                <AppBar position="static">
                  <Toolbar>
                  <Logo />
                    <div className={classes.grow} />
                      <Link to="/landing">
                        <Button onClick={handleSignUp}>Sign-Up</Button>
                      </Link>
                  </Toolbar>
                </AppBar>

              </div>   
            </Fragment>
        )} 



  </div>);
}
