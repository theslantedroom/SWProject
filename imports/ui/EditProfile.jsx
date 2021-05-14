import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { MemberDb } from '/imports/db/MemberDb';
import { useTracker } from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
 
export const EditProfile = () => {
  const user = useTracker(() => Meteor.user());
  const classes = useStyles();

  // grads globals published user proflie
  const profile = Meteor.user().profile;

  const [titleText, setTitleText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [companyText, setCompanyText] = useState("");
  const [websiteText, setWebsiteText] = useState("");

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
      // console.log('Handler not ready');
      return { ...noDataAvailable, isLoading: true };
    }
    const member = MemberDb.find({'userId' : user._id}).fetch();
    // const {title, location, company, website} = member[0];
    // setTitleText(title);
    return { member };
  });
  const handleChangeTitle = (event) => {
    setTitleText(event.target.value);
  };
  const handleSubmitTitle = e => {
    e.preventDefault();
    Meteor.call('memberDb.setTitle', titleText, user);
  };

  const handleChangeLocation = (event) => {
    setLocationText(event.target.value);
  };
  const handleSubmitLocation = e => {
    e.preventDefault();
    Meteor.call('memberDb.setLocation', locationText, user);
  };

  const handleChangeCompany = (event) => {
    setCompanyText(event.target.value);
  };
  const handleSubmitCompany = e => {
    e.preventDefault();
    Meteor.call('memberDb.setCompany', companyText, user);
  };

  const handleChangeWebsite = (event) => {
    setWebsiteText(event.target.value);
  };
  const handleSubmitWebsite = e => {
    e.preventDefault();
    Meteor.call('memberDb.setWebsite', websiteText, user);
  };

  if (!isLoading && profile) {

    if (member.length === 0){
      console.log('no membdata');
      member = [{title: '', location: '', company: '', website: ''}]
    }
    const {title, location, company, website} = member[0];
    // let title = '';

    return (<div>
            <hr></hr>
            
            <TextField
              id="filled-read-only-input"
              label="Display Name"
              defaultValue={profile.displayName}
              InputProps={{
                readOnly: true
              }}
            />    

            <form className={classes.root}>
              <FormControl>
                <TextField 
                  id="standard-multiline-flexible" 
                  label="Title" 
                  multiline
                  rowsMax={2}
                  defaultValue={title} 
                  onChange={handleChangeTitle} 
                />
                <Button size="small" className={classes.button} onClick={handleSubmitTitle}>
                  Update Title
                </Button>  
              </FormControl>

              <FormControl>
                <TextField
                  id="standard-multiline-flexible"
                  label="Location"
                  multiline
                  rowsMax={2}
                  defaultValue={location} 
                  onChange={handleChangeLocation}
                />     
                <Button size="small" className={classes.button} onClick={handleSubmitLocation}>
                  Update Location
                </Button>  
              </FormControl>    

              <FormControl>
                <TextField
                  id="standard-required"
                  label="Company"
                  multiline
                  rowsMax={2}
                  defaultValue={company} 
                  onChange={handleChangeCompany}
                />             
                <Button size="small" className={classes.button} onClick={handleSubmitCompany}>
                  Update Company
                </Button>  
              </FormControl> 

              <FormControl>
                <TextField
                  id="standard-required"
                  label="Website"
                  multiline
                  rowsMax={2}
                  defaultValue={website} 
                  onChange={handleChangeWebsite}
                />             
                <Button size="small" className={classes.button} onClick={handleSubmitWebsite}>
                  Update Website
                </Button>  
              </FormControl> 

              <div>
              {isLoading && <div className="loading">loading...</div>}
              </div>
          </form>
    </div>);    
  };

  return (<>
      loading
  </>)
};