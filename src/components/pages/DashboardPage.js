import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

const DashboardPages = ({ isConfirmed }) => {

  return (
    <div>
      {!isConfirmed && <ConfirmEmailMessage />}
    </div>
  )
  
}

DashboardPages.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps, {})(DashboardPages);