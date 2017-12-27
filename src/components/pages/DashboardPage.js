import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import AddBookCtA from '../ctas/AddBookCtA';
import { allBooksSelector } from '../../reducers/books';
import { fetchBooks } from '../../actions/books';

class DashboardPages extends React.Component {
  
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { isConfirmed, books } = this.props;

    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        { books.length === 0 && <AddBookCtA /> }
      </div>
    )
  }
} 

DashboardPages.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { fetchBooks })(DashboardPages);