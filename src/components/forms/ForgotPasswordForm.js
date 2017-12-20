import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: ''
      },
      loading: false,
      errors: {}
    };
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
      this.props.submit(this.state.data)
        .catch(err => { console.log(err);
          this.setState({ errors: err.response.data.errors, loading: false })}
        );
    } else {
      this.setState({ errors });
    }
  }

  validate = data => {
    let errors = {}
    if(!isEmail(data.email)) errors.email = 'Invalid email address';
    return errors;
  }

  render() {
    const { loading, errors, data } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Form.Field error={!!errors.email}>
          <label htmlFor='email'>Email</label>
          <input 
            id='email'
            name='email'
            type='email'
            placeholder='example@example.com'
            value={data.email}
            onChange={this.onChange}
          />
          { errors.email && <InlineError text={errors.email} /> }
        </Form.Field>
        <Button primary>Send</Button>
      </Form>
    )
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;