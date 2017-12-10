import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';

import InlineError from '../messages/InlineError';

const FormField = Form.Field;

class SignupForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    errors: {},
    loading: false
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  }

  validate = data => {
    const errors = {}

    if(!isEmail(data.email)) errors.email = 'Invalid email';
    if(!data.password) errors.password = "Can't be blank";

    return errors;
  }

  onChange = e => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    const { data, errors, loading } = this.state;
    
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <FormField error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input 
            type='email'
            id='email'
            name='email'
            placeholder='email@email.com'
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </FormField>
        <FormField error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input 
            type='password'
            id='password'
            name='password'
            placeholder='Make it secure'
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </FormField>
        <Button primary>Sign Up</Button>
      </Form>
    )
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default SignupForm;