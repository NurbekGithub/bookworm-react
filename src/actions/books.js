import { normalize } from 'normalizr';

import api from '../api';
import { BOOKS_FETCHED, BOOK_CREATED } from './actionTypes';
import { bookSchema } from '../schemas';

export const searchBook = query => {
  return api.book.searchBook(query);
}

// data.entities.books
export const booksFetched = data => ({
  type: BOOKS_FETCHED,
  data
})

export const bookCreated = data => ({
  type: BOOK_CREATED,
  data
})

export const fetchPages = id => 
  api.book.fetchPages(id);

export const fetchBooks = () => dispatch => 
  api.book.fetchBooks()
  .then(books => dispatch(booksFetched( normalize(books, [bookSchema]) )));

export const createBook = data => dispatch =>
  api.book.create(data)
  .then(book => dispatch(bookCreated(normalize(book, bookSchema))));