import React, {Component} from 'react';

export default class UserTable extends Component {

  static propTypes = {
    users: React.PropTypes.array,
    cx: React.PropTypes.func.isRequired,
    setEditable: React.PropTypes.func.isRequired,
  }

  handleSetEditable = userId => event => {
    event && event.preventDefault();
    return this.props.setEditable(userId);
  }

  render() {
    const {
      props: {users, cx},
      handleSetEditable
    } = this;
    return (users && users.length > 0) && (
      <div className="col-md-offset-1 col-md-5">
        <div className={cx('table-content')}>
          <table className="table">
            <thead>
              <tr className={cx('header-bar')}>
                <td><span className={cx('header')}>Id</span></td>
                <td><span className={cx('header')}>Name</span></td>
                <td><span className={cx('header')}>Email</span></td>
              </tr>
            </thead>
            <tbody>
            {users.map(user => (
              <tr
                className={cx('table-row')}
                key={`user-id-${user.ID}`}
                onClick={handleSetEditable(user.ID)}
              >
                <td><span className={cx('table-field')}>{user.ID}</span></td>
                <td><span className={cx('table-field')}>{user.Name}</span></td>
                <td><span className={cx('table-field')}>{user.Email}</span></td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>) || null;
  }
}
