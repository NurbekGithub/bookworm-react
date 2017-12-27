import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';
import { fetchPages, createBook } from '../../actions/books';

class NewBookPage extends Component {
  state = {
    book: null
  }

  onBookSelect = book => {
    this.setState({ book });
    fetchPages(book.goodreadsId)
      .then(res => res.data.pages)
      .then(pages => this.setState({ book: {...book, pages} }))
  }

  addBook = book => {
    return this.props.createBook(book)
    .then(() => this.props.history.push('/dashboard'));
  }

  render() {
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />

        { !!this.state.book && <BookForm submit={this.addBook} book={this.state.book}/>}
      </Segment>
    )
  }
}

NewBookPage.propTypes = {
  createBook: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default connect(null, { createBook })(NewBookPage);