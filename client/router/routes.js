import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '#app/components/app';

import makeLoadAction from './makeLoadAction';

import UserManagement from '#app/components/user/UserManagement';

import Registration from '#app/features/Auth/SandContent/Registration';
import UserList from '#app/features/User/SandCms';

import UserPreview from '#app/components/user/UserPreview';
import Homepage from '#app/components/homepage';
import Usage from '#app/components/usage';
import NotFound from '#app/components/not-found';

/**
 * Returns configured routes for different
 * environments. `w` - wrapper that helps skip
 * data fetching with onEnter hook at first time.
 * @param {Object} - any data for static loaders and first-time-loading marker
 * @returns {Object} - configured routes
 */
export default ({store, first}) => {

  // Make a closure to skip first request
  function w(loader) {
    return (nextState, replaceState, callback) => {
      if (first.time) {
        first.time = false;
        return callback();
      }
      return loader ? loader({store, nextState, replaceState, callback}) : callback();
    };
  }

  return <Route path="/" component={App}>
    <IndexRoute component={Homepage} onEnter={w(Homepage.onEnter)}/>
    <Route path="/registration" component={Registration} />
    <Route path="/user-management" component={UserManagement} onEnter={w(UserManagement.onEnter)}/>
    <Route path="/user/list" component={UserList} onEnter={makeLoadAction(store.dispatch, 'USER.LIST/LOAD')}/>
    <Route path="/user-preview" component={UserPreview} onEnter={w(UserPreview.onEnter)}/>
    <Route path="*" component={NotFound} onEnter={w(NotFound.onEnter)}/>
  </Route>;
};
