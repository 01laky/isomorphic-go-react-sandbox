import React, {Component} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';

class UserPreview extends Component {
  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then((users) => {
      console.log('ON ENTER USERS => ', users);
      // store.dispatch(setConfig(conf));
      callback();
    });
  }
  /*eslint-enable */

  render() {
    const {
      props: {store},
    } = this;
    console.log('RENDER PREVIEW STORE => ', store);
    return <div>
      <Helmet title='User preview' />
      <h1>USER PREVIEW !!! </h1>
    </div>;
  }

}

export default connect(store => ({ store }))(UserPreview);
