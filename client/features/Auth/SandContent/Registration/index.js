/*eslint-disable */
import React, { Component, PropTypes } from "react";
/*eslint-enable */
import { connect } from "react-redux";
import styles from "./styles";
import Helmet from "react-helmet";
import { IndexLink } from "react-router";
import actions from "./actions";
// import { bindActionCreators } from 'redux';
import classNames from "classnames/bind";
import RegistrationForm from "./components/RegistrationForm";

const cx = classNames.bind(styles);

// function mapDispatchToProps(dispatch) {
//   return { actions: bindActionCreators(actions, dispatch) };
// }
class Registration extends Component {
  static propTypes = {
    onRegister: PropTypes.func.isRequired,
  }

  handleRegister = registrationData => {
    console.log("REGISTRATION DATA => ", registrationData);
    return this.props.onRegister(registrationData);
  };

  render() {
    const {
      handleRegister
    } = this;
    return (
      <div>
        <Helmet title="Registration" />
        <div className="row">
          <div className="col-md-offset-4 col-md-4">
            <h1>Registration</h1>
          </div>
        </div>
        <br /><br /><br />
        <div className="row">
          <div className="col-md-offset-4 col-md-4">
            <RegistrationForm onSubmit={handleRegister} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleRegister: registrationData => {
      dispatch({
        types: ["POST_USERS_REQUEST", "POST_USERS_SUCCESS", "POST_USERS_FAILURE"],
        payload: {
          request: {
            url: "/register",
            body: registrationData
          }
        }
      });
    }
  };
};

const RegistrationIndex = connect(null, actions)(Registration);

export default RegistrationIndex;
