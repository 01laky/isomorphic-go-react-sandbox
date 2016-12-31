import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { usage, todo } from './styles';
import { example, p, link } from '../homepage/styles';
import { setConfig } from '../../actions';

class Usage extends Component {

  /*eslint-disable */
  static onEnter({store, nextState, replaceState, callback}) {
    fetch('/api/v1/conf').then((r) => {
      return r.json();
    }).then((conf) => {
      store.dispatch(setConfig(conf));
      callback();
    });
  }
  /*eslint-enable */

  handleOnFirstClick = () => event => {
    event && event.preventDefault();
    fetch('/api/user/10').then((r) => {
      console.log('BASE EEER => ', r)
      return r.json();
    }).then((other) => console.log('AAAACH OTHER => ', other));
  }

  handleOnFirstPost = () => event => {
    event && event.preventDefault();
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'ladislav',
        email: 'ladislav@email.com',
      }),
    }).then((r) => {
      console.log('POST BASE ER => ', r)
      return r.json();
    }).then((other) => console.log('AAAACH OTHER POST ER => ', other));
  }

  render() {
    const {handleOnFirstClick, handleOnFirstPost} = this;
    return <div className={usage}>
      <Helmet title='Usage' />
      <button
        onClick={handleOnFirstClick()}
      >
        GET
      </button>
      <br />
      <button
        onClick={handleOnFirstPost()}
      >
        POST
      </button>
    </div>;
  }

}

export default connect(store => ({ config: store.config }))(Usage);
