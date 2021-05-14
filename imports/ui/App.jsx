import { Meteor } from 'meteor/meteor';
import React, { Fragment  } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import  SwipeBar  from './SwipeBar.jsx';



// get data from global context
// import { useGlobalContext } from './GlobalContext';
// import { GlobalContextProvider } from './GlobalContext';


export const App = () => {
  //get authenticated user or null from Meteor.user(), wrap in useTracker hook for it to be reactive. 
  const user = useTracker(() => Meteor.user());
  // const { user } = useGlobalContext();

  return ( <div className="app">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <div className="main">
              {user ? (
                <Fragment>
                  <SwipeBar></SwipeBar>
                </Fragment>
                ) : (
                  <LoginForm />
              )}
            </div>            
          </div>
  );
};