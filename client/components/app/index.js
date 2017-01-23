import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class App extends Component {

  render() {
    return <div className="container-fluid">
      <Helmet title='Go isomorphic sandbox' />
      {this.props.children}
    </div>;
  }

}
