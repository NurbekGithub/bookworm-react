import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

const FormField = Form.Field;

class ResetPasswordForm extends Component {

  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: ''
    },
    loading: false,
    errors: {}
  }

  onChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if(Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data);
    } else {
      this.setState({ errors });
    }
  }

  validate = data => {
    const errors = {};
    if(!data.password) errors.password = "Can't be blank";
    if(data.password !== data.passwordConfirmation) errors.password = 'Passwords must match';
    return errors;
  }

  render() {
    const { loading, data, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <FormField error={!!errors.password}>
          <label htmlFor='password'>New Password</label>
          <input 
            type='password'
            id='password'
            name='password'
            placeholder='Make it secure'
            value={data.password}
            onChange={this.onChange}
          />
          { !!errors.password && <InlineError text={errors.password} />}
        </FormField>
        <FormField>
          <label htmlFor='passwordConfirmation'>Confirm your Password</label>
          <input 
            type='password'
            id='passwordConfirmation'
            name='passwordConfirmation'
            placeholder='Make it secure'
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
        </FormField>
        <Button primary>Reset</Button>
      </Form>
    )
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
}

export default ResetPasswordForm;