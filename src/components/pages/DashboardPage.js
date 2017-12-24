import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import AddBookCtA from '../ctas/AddBookCtA';
import { allBooksSelector } from '../../reducers/books';

const DashboardPages = ({ isConfirmed, books }) => {

  return (
    <div>
      {!isConfirmed && <ConfirmEmailMessage />}
      { books.length === 0 && <AddBookCtA /> }
    </div>
  )
  
}

DashboardPages.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
}

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  }
}

export default connect(mapStateToProps, {})(DashboardPages);