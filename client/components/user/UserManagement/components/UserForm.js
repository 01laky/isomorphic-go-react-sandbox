import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class UserForm extends Component {

  handleReinitializeForm = reinitializeForm => event => {
    event && event.preventDefault();
    this.props.setEditable(null)
    return reinitializeForm(null, true, null);
  }

  render() {
    const {
      props: {handleSubmit, reinitializeForm},
      handleReinitializeForm,
    } = this;
    return (
      <form className="form-group row" onSubmit={handleSubmit}>
        <div>
          <label className="col-2 col-form-label" htmlFor="name">Name</label>
          <Field className="form-control" name="name" component="input" type="text"/>
        </div>
        <br /><br /><br />
        <div>
          <label className="col-2 col-form-label" htmlFor="email">Email</label>
          <Field className="form-control" name="email" component="input" type="email"/>
        </div>
        <br /><br /><br />
        <button onClick={handleSubmit} className="form-control" type="submit">Submit</button><br />
        <button onClick={handleReinitializeForm(reinitializeForm)} className="form-control">Random</button><br />
        <button className="form-control">Cancel</button>
      </form>
    );
  }
}

// Decorate the form component
UserForm = reduxForm({
  form: 'user',
})(UserForm);

export default UserForm;
