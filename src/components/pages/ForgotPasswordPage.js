import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

import { resetPasswordRequest } from '../../actions/auth';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

class ForgotPasswordPage extends React.Component {
  state = {
    success: false
  };

  submit = data => 
    this.props.resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));
 

  render() {
    const { success } = this.state;
    return (
      <div>
        { success ? (
          <Message>Email has been sent.</Message>
        ) : (
          <ForgotPasswordForm submit={this.submit}>

          </ForgotPasswordForm>
        )}
      </div>
    )
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);