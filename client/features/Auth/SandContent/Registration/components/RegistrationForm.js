import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class RegistrationForm extends Component {
  render() {
    const {
      props: { handleSubmit },
    } = this;
    return (
      <form className="form-group row" onSubmit={handleSubmit}>
        <div>
          <label className="col-2 col-form-label" htmlFor="name">Name</label>
          <Field
            className="form-control"
            name="name"
            component="input"
            type="text"
          />
        </div>
        <br /><br /><br />
        <div>
          <label className="col-2 col-form-label" htmlFor="email">Email</label>
          <Field
            className="form-control"
            name="email"
            component="input"
            type="email"
          />
        </div>
        <br /><br /><br />
        <div>
          <label className="col-2 col-form-label" htmlFor="email">Password</label>
          <Field
            className="form-control"
            name="password"
            component="input"
            type="password"
          />
        </div>
        <br /><br /><br />
        <button onClick={handleSubmit} className="form-control" type="submit">
          Register
        </button>
        <br />
        <button className="form-control">Cancel</button>
      </form>
    );
  }
}

RegistrationForm = reduxForm({
  form: "registration"
})(RegistrationForm);

export default RegistrationForm;
