import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

const FormField = Form.Field;

class LoginForm extends Component {

  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  }

  onChange = e => {
    this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
  }

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false}));
    }
  }

  validate = data => {
    let errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Invalid email"
    if(!data.password) errors.password = "Can't be empty"
    else if(data.password.length <= 3) errors.password = "Should be more than 3 character"
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <FormField error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input 
            type='email'
            id='email'
            name='email'
            placeholder='example@example.com'
            value={data.email}
            onChange={this.onChange}
            required
          />
          {errors.email && <InlineError text={errors.email}/>}
        </FormField>
        <FormField error={!!errors.password}>
          <label htmlFor='password'>Password</label>
          <input 
            type='password'
            id='password'
            name='password'
            placeholder='Should be more than 3 character'
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password}/>}
        </FormField>
        <Button primary>Login</Button>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default LoginForm;