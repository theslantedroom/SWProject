import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { GlobalContextProvider } from '../imports/ui/GlobalContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home';
import Error from './Error';
import Signup from './Signup';


Meteor.startup(() => {
  render(
    <GlobalContextProvider>

        <Router>
            <Switch>

              <Route exact path='/'>
                <Home />
              </Route>

              <Route path="/landing">
                <Signup />
              </Route>
                
              <Route path='*'>
                <Error />
              </Route>
              
            </Switch>
        </Router>
    </GlobalContextProvider>,

  document.getElementById('react-root')
  );
});
