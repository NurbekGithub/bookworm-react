import api from '../api';

export const searchBook = query => {
  return api.book.searchBook(query);
}