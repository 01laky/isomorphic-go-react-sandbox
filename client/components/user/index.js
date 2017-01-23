import React, {Component} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import { usage, todo } from './styles';
import { example, p, link } from '../homepage/styles';
import { setConfig } from '../../actions';

class User extends Component {

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
    fetch('/api/user/22').then((r) => {
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

  handleOnFirstPath = () => event => {
    event && event.preventDefault();
    fetch('/api/user/22', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'ladislav-edited',
        email: 'ladislav@email.com-edited',
      }),
    }).then((r) => {
      console.log('PATH BASE ER => ', r)
      return r.json();
    }).then((other) => console.log('AAAACH OTHER PATH ER => ', other));
  }

  render() {
    const {handleOnFirstClick, handleOnFirstPost, handleOnFirstPath} = this;
    const style = {
      'border': '1px solid black',
      'borderRadius': '6px'
    };
    return <div className={usage}>
      <Helmet title='Usage' />
      <button
        style={style}
        onClick={handleOnFirstClick()}
      >
        GET
      </button>
      <br /><br /><br /><br />
      <button
        style={style}
        onClick={handleOnFirstPost()}
      >
        POST
      </button>
      <br /><br /><br /><br />
      <button
        style={style}
        onClick={handleOnFirstPath()}
      >
        PATH
      </button>
    </div>;
  }

}

export default connect(store => ({ config: store.config }))(Usage);
