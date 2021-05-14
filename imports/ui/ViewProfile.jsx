import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { MemberDb } from '/imports/db/MemberDb';
import { useTracker } from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';





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
    // let title = '';

    return (<div>
            <hr></hr>
            
            <TextField
              label="Display Name"
              defaultValue={profile.displayName}
              InputProps={{
                readOnly: true
              }}
            />    


            <form className={classes.root}>
        
              <FormControl>
                <TextField 
                  label="Title" 
                  multiline
                  rowsMax={2}
                  defaultValue={title} 
                  InputProps={{
                    readOnly: true
              }}
                />
              </FormControl>

              <FormControl>
                <TextField
                  label="Location"
                  multiline
                  rowsMax={2}
                  defaultValue={location} 
                  InputProps={{
                    readOnly: true
              }}
                />     
              </FormControl>    

              <FormControl>
                <TextField
                  label="Company"
                  multiline
                  rowsMax={2}
                  defaultValue={company} 
                  InputProps={{
                    readOnly: true
              }}
                />             
              </FormControl> 

              <FormControl>
                <TextField
                  label="Website"
                  multiline
                  rowsMax={2}
                  defaultValue={website} 
                  InputProps={{
                    readOnly: true
              }}
                />             
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