import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../../actions/users';

import SignupForm from '../forms/SignupForm';

class SignupPage extends Component {
  submit = data => {
    return this.props.signup(data).then(() => this.props.history.push('/dashboard'));
  }

  render() {
    return (
      <div>
        <SignupForm submit={this.submit} />
      </div>
    )
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
}

export default connect(null, { signup })(SignupPage);