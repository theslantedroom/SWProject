import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import  ButtonNav  from './ButtonNav.jsx';
import { TagListEdit } from './TagListEdit';
import { TagList } from './TagList';
import { EditProfile } from './EditProfile.jsx';
import { ViewProfile } from './ViewProfile.jsx';

import { useGlobalContext } from './GlobalContext';
import { useContext } from 'react';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 200,
    
  },
  profilePanel: {
    height: '80vh',
    backgroundColor: 'white',
  },
  swipeableViews: {
    width: '100vw',
    border: 0,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

export default function FloatingActionButtonZoom() {

  // grad state of profileEditView(bool) and toggleProfileEdit() from Global ctx
  const { profileEditView, toggleProfileEdit } = useGlobalContext();


  console.log(' swipe return ctx', profileEditView);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  // const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // when clicking back to proflie tab ensure that edit is selected
  const handleResetEditProfile = (index) => {
    toggleProfileEdit();
  };

  return (<div>

    <div className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} onClick={handleResetEditProfile}/>
          <Tab label="Connections" {...a11yProps(1)} />
          <Tab label="Discover" {...a11yProps(2)} />
        </Tabs>


      {/* <div className='mainView'> */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.swipeableViews}
      >
        <TabPanel 
        value={value} 
        index={0} 
        dir={theme.direction}
        className={classes.profilePanel}
        >

          <div className='buttonNavProfile'><ButtonNav/></div>
          {profileEditView ? (<div>
            <EditProfile/>
            <TagListEdit/>
          </div>) : (<div>
            <ViewProfile/>
            <TagList/>

          </div>)}
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction} className={classes.profilePanel}>
          Connections
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction} className={classes.profilePanel}>
          Discover
        </TabPanel>
        
      </SwipeableViews>
      {/* </div> */}
      
    </div>
  </div>);
}
