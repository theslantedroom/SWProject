import React from 'react';
import { Meteor } from 'meteor/meteor';
import { MemberDb } from '/imports/db/MemberDb';
import { useTracker } from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Divider from '@material-ui/core/Divider';
import './ViewProfile.css';
import Typography from '@material-ui/core/Typography';


import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';








const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
 
export const ViewProfile = () => {
  const user = useTracker(() => Meteor.user());
  const classes = useStyles();

  // const [titleText, setTitleText] = useState("");
  // const [locationText, setLocationText] = useState("");
  // const [companyText, setCompanyText] = useState("");
  // const [websiteText, setWebsiteText] = useState("");

  // grads globals published user proflie
  const profile = Meteor.user().profile;

    //use a single useTracker to get data from users
  let { member, isLoading } = useTracker(() => {

    // if no user logged in return empty array and 0 pending
    const noDataAvailable = { };
    if (!Meteor.user()) {
      console.log('no user');
      return noDataAvailable;
    }
    // sub to tasks
    const handler = Meteor.subscribe('memberDb');
    // set loading if handler is not ready
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const member = MemberDb.find({'userId' : user._id}).fetch();
    return { member };
  });


  if (!isLoading && profile) {

    if (member.length === 0){
      console.log('no membdata');
      member = [{title: '', location: '', company: '', website: ''}]
    }

    //
    const {title, location, company, website} = member[0];

    // parse date obeject to string
    Date.prototype.yyyymmdd = function() {
      var mm = this.getMonth() + 1; // getMonth() is zero-based
      var dd = this.getDate();

      return [this.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
            ].join('-');
    };

    let joinedDate = (user.profile.joinedDate).yyyymmdd();

    return (<div>
            <hr></hr>
            <div id='profileViewPic'>
              <img src="https://robohash.org/tre?size=200x200" alt="profile pic" />
            </div>
            <div className='profileViewDisplayName'>
              {profile.displayName}
            </div>

            <div className="grid-container">
              <div className="info">
                <Typography variant="button" display="block" gutterBottom>
                  <PermIdentityIcon /> Info
                </Typography>

              </div>
              <div className="location">
                <Typography variant="button" display="block" gutterBottom>
                  Location
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  {location}
                </Typography>
              </div>


              <div className="company">
                <Typography variant="button" display="block" gutterBottom>
                  company
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  {company}
                </Typography>                
              </div>  

              <div className="joined">
                <Typography variant="button" display="block" gutterBottom>
                  joined
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  {joinedDate}
                </Typography>
              </div>

              <div className="website">
                <Typography variant="button" display="block" gutterBottom>
                  website
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  {website}
                </Typography>
              </div>
              
              <div className="intro">
                <Typography variant="button" display="block" gutterBottom>
                  intro
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  {'N/A'}
                </Typography>
              </div>

            </div>



              {isLoading && <div className="loading">loading...</div>}

    </div>);    
  };

  return (<>
      loading
  </>)
};