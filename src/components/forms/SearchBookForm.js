import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { searchBook } from '../../actions/books';

class SearchBookForm extends React.Component {

  state = {
    query: '',
    loading: false,
    options: [],
    books: {}
  }

  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({ query: data.searchQuery });
    this.timer = setTimeout(this.fetchOptions, 1000);
  }

  fetchOptions = () => {
    if(!this.state.query) return;
    this.setState({ loading: true });
    searchBook(this.state.query)
      .then(res => res.data.books)
      .then(books => {
        const options = [];
        const booksHash = {};
        books.forEach(book => {
          booksHash[book.goodreadsId] = book;
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title
          });
        });
        this.setState({ loading: false, options, books: booksHash });
      });
  }

  onChange = (e, data) => {
    this.setState({ query: data.value })
    this.props.onBookSelect(this.state.books[data.value]);
  }

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder='Search for a book by a title'
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange={this.onChange}
        />
      </Form>
    )
  }
}

SearchBookForm.propTypes = {
  onBookSelect: PropTypes.func.isRequired
}

export default SearchBookForm;