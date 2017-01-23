/*eslint-disable */
import React, {Component} from 'react';
/*eslint-enable */
import { connect } from 'react-redux';
import styles from './styles';
import Helmet from 'react-helmet';
import { IndexLink } from 'react-router';
import * as actions from './actions';
import classNames from 'classnames/bind';
import {getRandomString} from './helpers';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';

const cx = classNames.bind(styles);

class UserManagement extends Component {
  /*eslint-disable */
  static onEnter(args) {
    const {store, nextState, replaceState, callback} = args;
    console.log('ARGS => ', args)
    store.dispatch(actions.loadUsers());
    fetch('/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(users => {
      store.dispatch(actions.receiveUsers(JSON.parse(users)));
      callback();
    });
  }
  /*eslint-enable */

  static propTypes = {
    users: React.PropTypes.array,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      return nextProps.selected && this.props.reinitializeForm(nextProps.selected, false, nextProps.users);
    }
  }

  handleCreateUser = formData => {
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
      }),
    })
    .then(response => response.json())
    .then(nextUser => this.props.receiveUser(JSON.parse(nextUser)));
  }

  handleOnFirstPost = () => event => {
    event && event.preventDefault();
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${getRandomString()} ${getRandomString()}`,
        email: `${getRandomString()}@${getRandomString()}.com`,
      }),
    })
    .then(response => response.json())
    .then(nextUser => this.props.receiveUser(JSON.parse(nextUser)));
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
    const {
      props: {
        users,
        state,
        setEditable,
        selected,
        reinitializeForm,
      },
      handleOnFirstPost,
      handleOnFirstPath,
      handleCreateUser,
    } = this;
    console.log('RENDER PROPS => ', this.props);
    return <div>
      <Helmet title='User management' />
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          <h1>Users management</h1>
        </div>
      </div>
      <br /><br /><br />
      <div className="row">
          <UserTable
            users={users}
            cx={cx}
            setEditable={setEditable}
          />
          <div className="col-md-offset-1 col-md-5">
            <h1>{(selected) && 'Editation' || 'Create'}</h1>
            <UserForm
              onSubmit={handleCreateUser}
              reinitializeForm={reinitializeForm}
              setEditable={setEditable}
            />
          </div>
      </div>
    </div>;
  }

}

function mapStateToProps(state) {
  const {userManagement: {users, selected}} = state;
  return {
    users,
    state,
    selected,
  };
}

export default connect(mapStateToProps, {...actions})(UserManagement);
