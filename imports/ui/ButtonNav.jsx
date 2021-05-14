import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EditIcon from '@material-ui/icons/Edit';
import PageviewIcon from '@material-ui/icons/Pageview';

import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
  editProfileToggle: {
    display: 'inline',
    
  },
});



export default function SimpleBottomNavigation() {

  const globalContext = useContext(GlobalContext)

  const setEditProfile = () => {
    globalContext.toggleProfileEdit(true);
  }
  const setViewProfile = () => {
    globalContext.toggleProfileView(false);
  }
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (<div>
    <div className='editProfileToggle'>
      <BottomNavigation
        classes={{
          root: classes.editProfileToggle, // class name, e.g. `classes-nesting-root-x`
        }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Edit Profile" icon={<EditIcon />} onClick={setEditProfile} />
        <BottomNavigationAction label="View Profile" icon={<PageviewIcon />} onClick={setViewProfile} />
      </BottomNavigation>

    </div>


  </div>);
}
